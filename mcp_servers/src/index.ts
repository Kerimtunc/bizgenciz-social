import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

// Global init guard to avoid duplicate tool registration under dev loaders
const GLOBAL_INIT_KEY = "__bizgenciz_mcp_initialized__" as const;

// Find project root by climbing up for a package.json
function findProjectRoot(startDir: string): string {
  let dir = startDir;
  for (let i = 0; i < 4; i++) {
    const pkg = path.join(dir, "package.json");
    if (fs.existsSync(pkg)) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return startDir;
}

async function runCommand(command: string, args: string[], cwd: string): Promise<{ exitCode: number; stdout: string; stderr: string; durationMs: number }>{
  return new Promise((resolve) => {
    const start = Date.now();
    const child = spawn(command, args, {
      cwd,
      env: { ...process.env, CI: "1", FORCE_COLOR: "1" },
      shell: false
    });
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (d) => { stdout += d.toString(); });
    child.stderr?.on("data", (d) => { stderr += d.toString(); });
    child.on("close", (code) => {
      resolve({ exitCode: code ?? 1, stdout, stderr, durationMs: Date.now() - start });
    });
    child.on("error", () => {
      resolve({ exitCode: 1, stdout, stderr: `failed to spawn ${command}`, durationMs: Date.now() - start });
    });
  });
}

function summarize(name: string, res: { exitCode: number; durationMs: number }) {
  return `${name}: ${res.exitCode === 0 ? "OK" : "FAIL"} (${res.durationMs}ms)`;
}

async function runChecks(projectRoot: string) {
  const results: Record<string, any> = {};
  const steps: Array<[string, string, string[]]> = [
    ["type-check", "npx", ["tsc", "--noEmit"]],
    ["lint", "npx", ["next", "lint"]],
    ["jest", "npx", ["jest", "--passWithNoTests"]],
    ["playwright", "npx", ["playwright", "test", "--reporter=list"]],
    ["prisma-validate", "npx", ["prisma", "validate"]]
  ];

  for (const [name, cmd, args] of steps) {
    const res = await runCommand(cmd, args, projectRoot);
    results[name] = res;
  }

  const summary = Object.entries(results)
    .map(([k, v]) => summarize(k, v as any))
    .join(" | ");

  return { summary, results };
}

async function startServer() {
  const projectRoot = findProjectRoot(path.resolve(process.cwd(), ".."));

  const server = new McpServer({ name: "bizgenciz-mcp", version: "0.1.0" });

  server.tool(
    "run",
    {
      description: "Proje kökünde bir komutu çalıştırır (varsayılan: npx).",
      inputSchema: {
        type: "object",
        properties: {
          command: { type: "string", description: "Çalıştırılacak komut (örn: npx, npm, node)" },
          args: { type: "array", items: { type: "string" }, description: "Komut argümanları" },
          cwd: { type: "string", description: "İsteğe bağlı çalışma dizini" }
        },
        required: ["command"],
        additionalProperties: false
      }
    },
    async (args: any) => {
      const { command, args: cmdArgs = [], cwd } = args ?? {};
      const root = cwd && fs.existsSync(cwd) ? cwd : projectRoot;
      const res = await runCommand(command, cmdArgs as string[], root);
      return {
        content: [
          { type: "text", text: `cwd: ${root}` },
          { type: "text", text: `exitCode: ${res.exitCode}, durationMs: ${res.durationMs}` },
          { type: "text", text: res.stdout || "(no stdout)" },
          { type: "text", text: res.stderr || "(no stderr)" }
        ]
      };
    }
  );

  server.tool(
    "check:all",
    {
      description: "Tip kontrolü, lint, jest, playwright ve prisma doğrulamasını sırasıyla çalıştırır.",
      inputSchema: { type: "object", properties: {} }
    },
    async () => {
      const report = await runChecks(projectRoot);
      const text = JSON.stringify(report, null, 2);
      return { content: [{ type: "text", text }] };
    }
  );

  server.tool(
    "check:jest",
    {
      description: "Jest testlerini çalıştırır.",
      inputSchema: { type: "object", properties: { args: { type: "array", items: { type: "string" } } } }
    },
    async (args: any) => {
      const extraArgs = (args?.args as string[]) ?? [];
      const res = await runCommand("npx", ["jest", "--passWithNoTests", ...extraArgs], projectRoot);
      return { content: [{ type: "text", text: res.stdout || res.stderr || `exit ${res.exitCode}` }] };
    }
  );

  server.tool(
    "check:lint",
    { description: "ESLint/Next lint çalıştırır.", inputSchema: { type: "object", properties: {} } },
    async () => {
      const res = await runCommand("npx", ["next", "lint"], projectRoot);
      return { content: [{ type: "text", text: res.stdout || res.stderr || `exit ${res.exitCode}` }] };
    }
  );

  server.tool(
    "check:type",
    { description: "TypeScript tip kontrolü (noEmit).", inputSchema: { type: "object", properties: {} } },
    async () => {
      const res = await runCommand("npx", ["tsc", "--noEmit"], projectRoot);
      return { content: [{ type: "text", text: res.stdout || res.stderr || `exit ${res.exitCode}` }] };
    }
  );

  server.tool(
    "check:e2e",
    { description: "Playwright e2e testlerini çalıştırır.", inputSchema: { type: "object", properties: { args: { type: "array", items: { type: "string" } } } } },
    async (args: any) => {
      const extraArgs = (args?.args as string[]) ?? [];
      const res = await runCommand("npx", ["playwright", "test", "--reporter=list", ...extraArgs], projectRoot);
      return { content: [{ type: "text", text: res.stdout || res.stderr || `exit ${res.exitCode}` }] };
    }
  );

  server.tool(
    "check:prisma",
    { description: "Prisma şema doğrulaması.", inputSchema: { type: "object", properties: {} } },
    async () => {
      const res = await runCommand("npx", ["prisma", "validate"], projectRoot);
      return { content: [{ type: "text", text: res.stdout || res.stderr || `exit ${res.exitCode}` }] };
    }
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

async function main() {
  const projectRoot = findProjectRoot(path.resolve(process.cwd(), ".."));

  if (process.argv.includes("--selftest")) {
    const { summary } = await runChecks(projectRoot);
    console.log(summary);
    process.exit(0);
  }

  if ((globalThis as any)[GLOBAL_INIT_KEY]) {
    // Already initialized (likely due to dev loader); do nothing
    return;
  }
  (globalThis as any)[GLOBAL_INIT_KEY] = true;
  await startServer();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});