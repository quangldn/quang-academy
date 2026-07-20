import fs from 'fs';
import path from 'path';

const files = [
  'docs/intro.mdx',
  'docs/level-1-fresher/1-1-1-anh-sang.mdx',
  'docs/level-1-fresher/1-1-4-db-dbm.mdx',
  'docs/level-1-fresher/1-2-2-itu-grid.mdx',
  'docs/level-1-fresher/1-4-4-link-budget.mdx',
  'docs/level-3-senior/3-1-coherent.mdx',
  'docs/reference/glossary.mdx',
  'docs/reference/vendor-index.mdx',
];

const TYPES = 'info|goal|tip|note|caution|warning|danger';
const openRe = new RegExp('^:::(?:(' + TYPES + ')\\b)?(?:\\[([^\\]]*)\\])?\\s*(.*)$');

const mapType = (t) => {
  if (!t) return 'info';
  if (t === 'warning' || t === 'danger') return 'caution';
  return t;
};

let totalBlocks = 0;

for (const rel of files) {
  const fp = path.resolve(rel);
  if (!fs.existsSync(fp)) continue;
  const lines = fs.readFileSync(fp, 'utf8').split('\n');
  const out = [];
  let i = 0;
  let blocks = 0;
  while (i < lines.length) {
    const line = lines[i];
    // opening admonition: starts with ::: and is NOT a lone closing here
    if (/^:::/.test(line)) {
      const m = line.match(openRe);
      const type = mapType(m && m[1]);
      const title = m && m[2] ? m[2] : null;
      const inlineRest = m && m[3] ? m[3] : '';
      const body = [];
      if (inlineRest.trim()) body.push(inlineRest);
      i++;
      // collect until lone closing :::
      while (i < lines.length && !/^:::\s*$/.test(lines[i])) {
        body.push(lines[i]);
        i++;
      }
      // skip closing :::
      if (i < lines.length) i++;
      const attrs = `type="${type}"` + (title ? ` title=${JSON.stringify(title)}` : '');
      out.push(`<Callout ${attrs}>`);
      out.push('');
      // trim leading/trailing empty
      while (body.length && !body[0].trim()) body.shift();
      while (body.length && !body[body.length - 1].trim()) body.pop();
      out.push(...body);
      out.push('');
      out.push('</Callout>');
      blocks++;
    } else {
      out.push(line);
      i++;
    }
  }
  fs.writeFileSync(fp, out.join('\n'));
  totalBlocks += blocks;
  console.log(`${rel}: ${blocks} callouts`);
}
console.log('Total callouts:', totalBlocks);
