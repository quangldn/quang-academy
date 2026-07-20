// Sinh dữ liệu "Bản đồ khái niệm" (Obsidian-style) — CHẠY TỰ ĐỘNG mỗi prebuild/prestart.
// Nguồn: src/data/concept-seed.json (khái niệm + quan hệ do người biên soạn)
//        + quét docs/**/*.mdx để TỰ HOÀN THIỆN:
//          - front-matter `concepts: [id, ...]` gắn bài học vào node khái niệm (đặt url)
//          - hai khái niệm cùng xuất hiện trong một bài -> tự thêm cạnh (co-occurrence)
//          - khái niệm chưa có trong seed -> tự tạo node mới
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DOCS = path.join(ROOT, 'docs');
const SEED = path.join(ROOT, 'src/data/concept-seed.json');
const OUT = path.join(ROOT, 'src/data/concept-graph.json');
const ROUTE = 'hoc';

const seed = JSON.parse(fs.readFileSync(SEED, 'utf8'));
const nodes = new Map(seed.nodes.map((n) => [n.id, { ...n, lessons: [] }]));
const edgeSet = new Set();
const links = [];
const addEdge = (a, b, co = false) => {
  if (a === b) return;
  const key = [a, b].sort().join('|');
  if (edgeSet.has(key)) return;
  edgeSet.add(key);
  links.push({ source: a, target: b, co });
};
for (const [a, b] of seed.edges) addEdge(a, b, false);

// --- Quét docs ---
function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.mdx') || e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

function frontmatter(txt) {
  const m = txt.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  const body = m[1];
  const slug = body.match(/^slug:\s*(.+)$/m);
  if (slug) fm.slug = slug[1].trim().replace(/^["']|["']$/g, '');
  const title = body.match(/^title:\s*(.+)$/m);
  if (title) fm.title = title[1].trim().replace(/^["']|["']$/g, '');
  // concepts: inline [a, b] hoặc block list
  const inline = body.match(/^concepts:\s*\[(.*?)\]/m);
  if (inline) {
    fm.concepts = inline[1].split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
  } else {
    const block = body.match(/^concepts:\s*\n((?:\s*-\s*.+\n?)+)/m);
    if (block) {
      fm.concepts = block[1].split('\n').map((l) => l.replace(/^\s*-\s*/, '').trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    }
  }
  return fm;
}

function urlFor(file, fm) {
  const rel = path.relative(DOCS, file).replace(/\\/g, '/').replace(/\.mdx?$/, '');
  if (fm.slug) return '/' + ROUTE + (fm.slug.startsWith('/') ? fm.slug : '/' + fm.slug);
  return '/' + ROUTE + '/' + rel;
}

let taggedLessons = 0;
for (const file of walk(DOCS)) {
  const txt = fs.readFileSync(file, 'utf8');
  const fm = frontmatter(txt);
  if (!fm.concepts || !fm.concepts.length) continue;
  taggedLessons++;
  const url = urlFor(file, fm);
  const present = [];
  for (const cid of fm.concepts) {
    if (!nodes.has(cid)) {
      nodes.set(cid, { id: cid, label: cid, cat: 'foundation', url, lessons: [], auto: true });
    }
    const node = nodes.get(cid);
    if (!node.url) node.url = url;
    if (fm.title && !node.lessons.includes(fm.title)) node.lessons.push(fm.title);
    present.push(cid);
  }
  // co-occurrence: liên kết mọi cặp khái niệm cùng bài (cạnh "mềm")
  for (let i = 0; i < present.length; i++)
    for (let j = i + 1; j < present.length; j++) addEdge(present[i], present[j], true);
}

// --- Bậc (degree) để tính kích thước node ---
const degree = {};
for (const l of links) {
  degree[l.source] = (degree[l.source] || 0) + 1;
  degree[l.target] = (degree[l.target] || 0) + 1;
}

const outNodes = [...nodes.values()].map((n) => ({
  id: n.id,
  label: n.label,
  cat: n.cat,
  url: n.url || null,
  hasLesson: !!n.url,
  val: Math.max(1, degree[n.id] || 1),
}));

// Chỉ giữ cạnh có 2 đầu tồn tại
const ids = new Set(outNodes.map((n) => n.id));
const outLinks = links.filter((l) => ids.has(l.source) && ids.has(l.target));

const graph = {
  categories: seed.categories,
  nodes: outNodes,
  links: outLinks,
  meta: { generated: true, taggedLessons, nodeCount: outNodes.length, edgeCount: outLinks.length },
};
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(graph, null, 2));
console.log(`[gen-graph] ${outNodes.length} nodes, ${outLinks.length} edges (bài gắn concepts: ${taggedLessons}) -> ${path.relative(ROOT, OUT)}`);
