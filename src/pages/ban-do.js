import React, {useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {useHistory} from '@docusaurus/router';
import graph from '@site/src/data/concept-graph.json';
import styles from './ban-do.module.css';

function GraphInner() {
  const wrapRef = useRef(null);
  const fgRef = useRef(null);
  const hoverRef = useRef({id: null, nbrs: new Set()});
  const history = useHistory();
  const [hoverLabel, setHoverLabel] = useState(null);

  useEffect(() => {
    let fg;
    let ro;
    let cancelled = false;

    // Bản đồ hàng xóm để highlight khi hover
    const nbrMap = {};
    graph.nodes.forEach((n) => (nbrMap[n.id] = new Set()));
    graph.links.forEach((l) => {
      const s = typeof l.source === 'object' ? l.source.id : l.source;
      const t = typeof l.target === 'object' ? l.target.id : l.target;
      nbrMap[s] && nbrMap[s].add(t);
      nbrMap[t] && nbrMap[t].add(s);
    });
    const catColor = (c) => (graph.categories[c] && graph.categories[c].color) || '#8aa';

    import('force-graph').then(({default: ForceGraph}) => {
      if (cancelled || !wrapRef.current) return;
      const el = wrapRef.current;
      const data = {
        nodes: graph.nodes.map((n) => ({...n})),
        links: graph.links.map((l) => ({...l})),
      };

      fg = new ForceGraph(el)
        .backgroundColor('#0a0e17')
        .graphData(data)
        .nodeId('id')
        .nodeRelSize(4)
        .nodeVal('val')
        .cooldownTicks(120)
        .d3AlphaDecay(0.03)
        .d3VelocityDecay(0.28)
        .linkColor((l) => {
          const h = hoverRef.current;
          if (h.id) {
            const s = l.source.id || l.source, t = l.target.id || l.target;
            if (s === h.id || t === h.id) return 'rgba(120,200,230,0.7)';
            return 'rgba(140,160,190,0.05)';
          }
          return l.co ? 'rgba(140,160,190,0.16)' : 'rgba(140,160,190,0.28)';
        })
        .linkWidth((l) => {
          const h = hoverRef.current;
          if (h.id) {
            const s = l.source.id || l.source, t = l.target.id || l.target;
            return s === h.id || t === h.id ? 2 : 0.5;
          }
          return 1;
        })
        .linkLineDash((l) => (l.co ? [3, 3] : null))
        .nodeCanvasObject((node, ctx, scale) => {
          const h = hoverRef.current;
          const active = !h.id || h.id === node.id || h.nbrs.has(node.id);
          const r = 3 + Math.sqrt(node.val) * 1.7;
          const color = node.hasLesson ? catColor(node.cat) : '#46566b';
          ctx.globalAlpha = active ? 1 : 0.12;
          ctx.shadowColor = color;
          ctx.shadowBlur = active && node.hasLesson ? 16 : 0;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
          if (!node.hasLesson) {
            ctx.shadowBlur = 0;
            ctx.lineWidth = 0.6;
            ctx.strokeStyle = 'rgba(255,255,255,0.25)';
            ctx.stroke();
          }
          ctx.shadowBlur = 0;
          const showLabel = scale > 1.15 || h.id === node.id || h.nbrs.has(node.id);
          if (showLabel) {
            const fs = Math.max(10 / scale, 2.5);
            ctx.font = `600 ${fs}px Inter, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillStyle = active ? '#e6ecf5' : 'rgba(230,236,245,0.35)';
            ctx.fillText(node.label, node.x, node.y + r + 1.5);
          }
          ctx.globalAlpha = 1;
        })
        .nodePointerAreaPaint((node, color, ctx) => {
          const r = 3 + Math.sqrt(node.val) * 1.7 + 2;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
          ctx.fill();
        })
        .onNodeHover((node) => {
          hoverRef.current = {
            id: node ? node.id : null,
            nbrs: node ? nbrMap[node.id] || new Set() : new Set(),
          };
          el.style.cursor = node && node.hasLesson ? 'pointer' : node ? 'default' : 'grab';
          setHoverLabel(node ? {label: node.label, has: node.hasLesson} : null);
        })
        .onNodeClick((node) => {
          if (node.url) history.push(node.url);
        });

      fg.d3Force('charge').strength(-140);
      fg.d3Force('link').distance(38);

      const size = () => {
        if (!wrapRef.current) return;
        fg.width(wrapRef.current.clientWidth).height(wrapRef.current.clientHeight);
      };
      size();
      ro = new ResizeObserver(size);
      ro.observe(el);
      fgRef.current = fg;
      setTimeout(() => fg && fg.zoomToFit(600, 40), 400);
    });

    return () => {
      cancelled = true;
      if (ro) ro.disconnect();
      if (fg && fg._destructor) fg._destructor();
    };
  }, [history]);

  return (
    <div className={styles.stage}>
      <div ref={wrapRef} className={styles.canvas} />
      <div className={styles.legend}>
        <div className={styles.legendTitle}>Nhóm khái niệm</div>
        {Object.entries(graph.categories).map(([k, v]) => (
          <div key={k} className={styles.legendRow}>
            <span className={styles.dot} style={{background: v.color, boxShadow: `0 0 8px ${v.color}`}} />
            {v.label}
          </div>
        ))}
        <div className={styles.legendRow} style={{marginTop: 6}}>
          <span className={styles.dot} style={{background: '#46566b', boxShadow: 'none', border: '1px solid rgba(255,255,255,.3)'}} />
          Chưa có bài (sẽ tự sáng khi bổ sung)
        </div>
      </div>
      <div className={styles.hint}>
        {hoverLabel ? (
          <span><b>{hoverLabel.label}</b>{hoverLabel.has ? ' — bấm để mở bài' : ' — chưa có bài học'}</span>
        ) : (
          <span>Kéo để xoay · lăn chuột để zoom · rê vào node để xem liên kết · bấm node để mở bài</span>
        )}
      </div>
    </div>
  );
}

export default function BanDo() {
  return (
    <Layout title="Bản đồ khái niệm" description="Bản đồ liên kết các khái niệm DWDM — kiểu graph view, tự hoàn thiện khi thêm bài.">
      <div className={styles.header}>
        <h1>Bản đồ khái niệm</h1>
        <p>
          Mỗi node là một khái niệm DWDM; cạnh là liên kết giữa chúng; node càng nhiều liên kết càng lớn.
          Bản đồ <b>tự hoàn thiện</b>: thêm bài mới (và gắn <code>concepts:</code> ở front-matter) là node tự sáng và nối thêm cạnh.
        </p>
      </div>
      <BrowserOnly>{() => <GraphInner />}</BrowserOnly>
    </Layout>
  );
}
