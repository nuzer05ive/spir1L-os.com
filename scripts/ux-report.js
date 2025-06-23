const fs = require('fs'), path = require('path');
const [dir, maxStr, flag] = process.argv.slice(2);
if (!dir || !maxStr) { console.error('usage: ux-report <dir> <maxBytes> [--md]'); process.exit(1); }
const max = Number(maxStr);
const rows = fs.readdirSync(dir).filter(f=>f.endsWith('.riic'))
  .map(f=>({f, s: fs.statSync(path.join(dir,f)).size}));
if (flag==='--md'){
  console.log('| Script | Bytes |'); console.log('|--------|------:|');
  rows.forEach(r=>console.log(`| ${r.f} | ${r.s} |`));
}else{ console.table(rows); }
if (rows.some(r=>r.s>max)){ console.error('size gate failed'); process.exit(1); }
