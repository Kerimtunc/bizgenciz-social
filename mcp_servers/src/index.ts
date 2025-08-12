import http from 'http'
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

async function runHealthCheck() {
  return new Promise((resolve) => {
    const proc = spawn(process.execPath, ['scripts/health-check.mjs'], { stdio: 'inherit' })
    proc.on('close', (code) => resolve(code))
    proc.on('error', () => resolve(1))
  })
}

function readLatestHealthReport() {
  try {
    const dir = path.join(process.cwd(), 'logs', 'health')
    if (!fs.existsSync(dir)) return null
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort()
    if (files.length === 0) return null
    const latest = files[files.length - 1]
    const content = fs.readFileSync(path.join(dir, latest), 'utf8')
    return JSON.parse(content)
  } catch (e) {
    return null
  }
}

async function main() {
  console.log('BizGenciz MCP mock server starting (enhanced)...')
  const server = http.createServer(async (req, res) => {
    if (req.url === '/.well-known/mcp/health') {
      // Run health-check to produce a fresh report; if it fails it's okay we'll still try to read last report
      await runHealthCheck()
      const report = readLatestHealthReport()
      const payload = {
        service: 'bizgenciz',
        timestamp: new Date().toISOString(),
        report,
      }
    if (req.url === '/.well-known/mcp' || req.url === '/.well-known/mcp/') {
      const toolsList = [
        {
          name: 'health-check',
          description: 'Run project health check script',
          method: 'GET',
          endpoint: '/.well-known/mcp/health',
        },
      ];
      const promptsList = [
        {
          id: 'run-health-check',
          description: 'Request the MCP server to run a health-check and return the latest report',
          example: { method: 'GET', url: '/.well-known/mcp/health' },
        },
      ];

      const manifest = {
        name: 'bizgenciz-mcp',
        version: '0.1.0',
        description: 'Simple MCP mock server for BizGenciz',
        endpoints: {
          health: '/.well-known/mcp/health',
          health_raw: '/.well-known/mcp/health/raw',
          tools: '/.well-known/mcp/tools',
          prompts: '/.well-known/mcp/prompts',
        },
        tools: toolsList,
        prompts: promptsList,
      };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(manifest));
      return;
    }

    if (req.url === '/.well-known/mcp/tools') {
      // advertise available tools so MCP client doesn't report "no tools"
      const tools = [
        {
          name: 'health-check',
          description: 'Run project health check script',
          method: 'GET',
          endpoint: '/.well-known/mcp/health',
        },
      ];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ tools }));
      return;
    }

    if (req.url === '/.well-known/mcp/prompts') {
      // offer a minimal set of prompts so MCP client sees something
      const prompts = [
        {
          id: 'run-health-check',
          description: 'Request the MCP server to run a health-check and return the latest report',
          example: { method: 'GET', url: '/.well-known/mcp/health' },
        },
      ];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ prompts }));
      return;
    }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(payload))
      return
    }
    if (req.url === '/.well-known/mcp/health/raw') {
      const report = readLatestHealthReport()
      if (!report) {
        res.writeHead(404)
        res.end('no report')
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(report))
      return
    }
    res.writeHead(404)
    res.end('not found')
  })
  server.listen(5050, () => console.log('MCP mock listening on 5050'))
}

main().catch(e=>{ console.error(e); process.exit(1) })


