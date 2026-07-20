import fs from 'fs';
const edits = {
  'docs/level-1-fresher/1-1-1-anh-sang.mdx': {9:['goal',null], 103:['note','Nguồn & chuẩn tham khảo']},
  'docs/level-1-fresher/1-1-4-db-dbm.mdx': {9:['goal',null], 37:['tip','Quy tắc vàng'], 87:['note',null]},
  'docs/level-1-fresher/1-2-2-itu-grid.mdx': {9:['goal',null], 51:['tip','Trực giác'], 82:['note','Nguồn & chuẩn tham khảo']},
  'docs/level-1-fresher/1-4-4-link-budget.mdx': {9:['goal',null], 86:['note','Nguồn & chuẩn tham khảo']},
  'docs/level-3-senior/3-1-coherent.mdx': {9:['goal',null], 82:['note','Nguồn & chuẩn tham khảo']},
  'docs/intro.mdx': {36:['tip','Bắt đầu ngay']},
  'docs/reference/glossary.mdx': {62:['note','Đóng góp']},
  'docs/reference/vendor-index.mdx': {45:['caution','Về tính cập nhật']},
};
for (const [f, map] of Object.entries(edits)) {
  const lines = fs.readFileSync(f,'utf8').split('\n');
  for (const [ln,[type,title]] of Object.entries(map)) {
    const idx = parseInt(ln,10)-1;
    if (!/^<Callout/.test(lines[idx])) { console.error('MISS',f,ln,lines[idx]); continue; }
    lines[idx] = `<Callout type="${type}"` + (title?` title=${JSON.stringify(title)}`:'') + '>';
  }
  fs.writeFileSync(f, lines.join('\n'));
  console.log('updated', f);
}
