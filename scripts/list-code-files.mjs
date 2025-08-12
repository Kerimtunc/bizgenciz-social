#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();

const IGNORE_DIR_NAMES = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "out",
  ".cache",
  "coverage",
  ".turbo",
  ".vercel",
  "playwright-report",
  "test-results",
  "tmp"
]);

const EXCLUDE_FILE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".ico",
  ".svg",
  ".bmp",
  ".webp",
  ".mp4",
  ".mov",
  ".avi",
  ".mkv",
  ".mp3",
  ".wav",
  ".ogg",
  ".flac",
  ".log",
  ".zip",
  ".tar",
  ".gz",
  ".bz2",
  ".7z",
  ".rar",
  ".pdf",
  ".psd",
  ".ai",
  ".sketch",
  ".ttf",
  ".otf",
  ".woff",
  ".woff2",
  ".eot",
  ".db",
  ".sqlite",
  ".db3",
  ".sqlite3"
]);

function isIgnoredDir(dirName) {
  return IGNORE_DIR_NAMES.has(dirName);
}

function isBinaryOrLargeFile(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  return EXCLUDE_FILE_EXTENSIONS.has(ext);
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (isIgnoredDir(entry.name)) continue;
      yield* walk(fullPath);
    } else if (entry.isFile()) {
      if (isBinaryOrLargeFile(entry.name)) continue;
      yield fullPath;
    }
  }
}

function toPosixRelative(fullPath) {
  const rel = path.relative(rootDir, fullPath);
  return rel.split(path.sep).join("/");
}

async function main() {
  const startedAt = new Date();

  const outputDirRel = "logs/code-inventory";
  const outputDir = path.join(rootDir, outputDirRel);
  await fs.mkdir(outputDir, { recursive: true });

  const ts =
    startedAt
      .toISOString()
      .replace(/[-:]/g, "")
      .replace("T", "-")
      .slice(0, 15) + "00"; // yyyymmdd-hhmmss approx

  const outputFile = path.join(outputDir, `kontrol_listesi-${ts}.txt`);

  const files = [];
  for await (const filePath of walk(rootDir)) {
    // Kök dizin dışına çıkmayı engelle, güvenlik için
    if (!filePath.startsWith(rootDir)) continue;
    const relPosix = toPosixRelative(filePath);
    // Bu scriptin kendisini ve oluşturduğu klasörü veya .archive içeren dosyaları listeye ekleme
    if (
      relPosix.startsWith("logs/") ||
      relPosix === "scripts/list-code-files.mjs" ||
      relPosix.includes(".archive")
    ) {
      continue;
    }
    files.push(relPosix);
  }

  files.sort((a, b) => a.localeCompare(b));

  // Ayrıştır: .mdc dosyaları ayrı, diğerleri ayrı. .mdc'ler her zaman en üstte olacak.
  const mdcFiles = files.filter((f) => f.endsWith(".mdc"));
  const restFiles = files.filter((f) => !f.endsWith(".mdc"));

  // Başlık: uyarı ve meta bilgi
  const MAX_INLINE_BYTES = 200 * 1024; // 200 KB - daha büyük dosyalar inline edilmeyecek (istisnalar var)
  const FRONDBACK_PREFIXES = [
    "app/",
    "src/",
    "server/",
    "lib/",
    "prisma/",
    "components/",
    "app/api/",
    "app/panel/",
    "server/api/",
  ];

  const headerLines = [
    "=== KONTROL LISTESI (Kaynak Dosyalar VE ICERIKLER) ===",
    `Olusturulma: ${startedAt.toISOString()}`,
    `Kok Dizin: ${toPosixRelative(rootDir) || "."}`,
    `Toplam Dosya (liste): ${files.length}`,
    "",
    "Not: Çok büyük projelerde readdir yerine streaming veya worker threads kullanmak taramayi hizlandirir.",
    "",
    "İncelerken .mdc dosyalarının içerikleri hesaba katılmalıdır",
    "(Aşağıda .mdc dosyaları öncelikli olarak listelenmiştir ve içerikleri her koşulda inline edilir.)",
    "",
  ];

  await fs.writeFile(outputFile, headerLines.join("\n") + "\n", "utf8");

  let includedCount = 0;

  // 1) .mdc dosyalarını yaz (her zaman inline et)
  for (const rel of mdcFiles) {
    const full = path.join(rootDir, rel.split("/").join(path.sep));
    const sectionHeader = `--- MDC FILE: ${rel} ---`;
    await fs.appendFile(outputFile, sectionHeader + "\n", "utf8");
    try {
      const data = await fs.readFile(full, "utf8");
      await fs.appendFile(outputFile, data + "\n\n", "utf8");
      includedCount++;
    } catch (err) {
      await fs.appendFile(outputFile, `ERROR: ${String(err)}\n\n`, "utf8");
    }
  }

  // 2) Diğer dosyaları sırayla işle
  for (const rel of restFiles) {
    const full = path.join(rootDir, rel.split('/').join(path.sep));
    const sectionHeader = `--- FILE: ${rel} ---`;
    await fs.appendFile(outputFile, sectionHeader + "\n", "utf8");
    try {
      const stat = await fs.stat(full);

      // Eğer frontend veya backend'e aitse 200KB kısıtlamasını uygulama
      const isFrontBack = FRONDBACK_PREFIXES.some((p) => rel.startsWith(p));
      if (stat.size > MAX_INLINE_BYTES && !isFrontBack) {
        await fs.appendFile(
          outputFile,
          `SKIPPED (dosya buyuklugu ${stat.size} bayt > ${MAX_INLINE_BYTES} bayt)\n\n`,
          "utf8"
        );
        continue;
      }

      // Kısa binary kontrolü: dosyanın ilk chunk'ında null byte var mı?
      const fd = await fs.open(full, "r");
      const { size } = stat;
      const toRead = Math.min(4096, size);
      const buffer = Buffer.alloc(toRead);
      await fd.read(buffer, 0, toRead, 0);
      await fd.close();
      const hasNull = buffer.includes(0);
      if (hasNull) {
        await fs.appendFile(outputFile, `SKIPPED (binary dosya tespit edildi)\n\n`, "utf8");
        continue;
      }

      const data = await fs.readFile(full, "utf8");
      await fs.appendFile(outputFile, data + "\n\n", "utf8");
      includedCount++;
    } catch (err) {
      await fs.appendFile(outputFile, `ERROR: ${String(err)}\n\n`, "utf8");
    }
  }

  const footer = [``, `Toplam dosya listelendi: ${files.length}`, `Toplam icerik inline edilen dosya: ${includedCount}`].join("\n");
  await fs.appendFile(outputFile, footer + "\n", "utf8");

  console.log(`\nKontrol listesi olusturuldu: ${toPosixRelative(outputFile)}\nToplam dosya: ${files.length}\nInline edilen dosya: ${includedCount}`);
}

main().catch((err) => {
  console.error("Hata:", err);
  process.exit(1);
});


