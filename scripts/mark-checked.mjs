#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const inventoryDir = path.join(rootDir, 'logs', 'code-inventory');

function toPosix(p) {
  return p.split(path.sep).join('/');
}

async function findLatestInventory() {
  try {
    const entries = await fs.readdir(inventoryDir, { withFileTypes: true });
    const candidates = [];
    for (const e of entries) {
      if (!e.isFile()) continue;
      if (!e.name.startsWith('kontrol_listesi-')) continue;
      const full = path.join(inventoryDir, e.name);
      const stat = await fs.stat(full);
      candidates.push({ name: e.name, path: full, mtime: stat.mtimeMs });
    }
    if (candidates.length === 0) return null;
    candidates.sort((a, b) => b.mtime - a.mtime);
    return candidates[0].path;
  } catch (err) {
    return null;
  }
}

async function main() {
  const latest = await findLatestInventory();
  if (!latest) {
    console.error('En son kontrol listesi bulunamadi: logs/code-inventory icinde kontrol_listesi-*.txt arayin.');
    process.exit(2);
  }

  const content = await fs.readFile(latest, 'utf8');
  const lines = content.split(/\r?\n/);

  const fileHeaderRegex = /^---\s+(?:MDC FILE|FILE):\s+(.+)\s+---$/;
  const files = [];
  for (const l of lines) {
    const m = l.match(fileHeaderRegex);
    if (m) files.push(toPosix(m[1].trim()));
  }

  const uniqueFiles = Array.from(new Set(files));

  // Varsayılan olarak tekrar kontrol edilmesi gereken dosya isimleri/patternleri
  const recheckPatterns = [ /(^|\/)page\.tsx$/i ];

  const toRecheck = [];
  const toMarkChecked = [];
  for (const f of uniqueFiles) {
    const needs = recheckPatterns.some((r) => r.test(f));
    if (needs) toRecheck.push(f);
    else toMarkChecked.push(f);
  }

  const ts = new Date().toISOString().replace(/[:\-]/g, '').replace('T', '-').slice(0,15) + '00';
  const outPath = path.join(inventoryDir, `kontrol_checked-${ts}.txt`);

  const header = [
    '=== KONTROL GUNCELLEME RAPORU ===',
    `Olusturulma: ${new Date().toISOString()}`,
    `Kaynak kontrol dosyasi: ${path.relative(rootDir, latest)}`,
    '',
  ].join('\n');

  let body = '';
  body += '--- CHECKED FILES ---\n';
  for (const f of toMarkChecked) body += `${f}\n`;
  body += '\n';
  body += '--- TO RECHECK (EXCLUDED) ---\n';
  for (const f of toRecheck) body += `${f}\n`;
  body += '\n';
  body += `Total files: ${uniqueFiles.length}\nChecked: ${toMarkChecked.length}\nTo recheck: ${toRecheck.length}\n`;

  await fs.writeFile(outPath, header + '\n' + body, 'utf8');
  console.log(`Kontrol guncel raporu olusturuldu: ${path.relative(rootDir, outPath)}`);
}

main().catch((err) => {
  console.error('Hata:', err);
  process.exit(1);
});


