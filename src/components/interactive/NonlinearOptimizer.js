import React, {useState, useMemo} from 'react';
import styles from './interactive.module.css';

/**
 * NonlinearOptimizer — minh hoạ đánh đổi launch power ↔ hiệu ứng phi tuyến (mô hình GN giản lược).
 *
 * OSNR (giới hạn ASE) tăng 1 dB / 1 dB launch:   OSNR(P) = 58 + P − L − NF − 10log10(N)
 * SNR phi tuyến giảm 2 dB / 1 dB launch:          SNR_nl(P) = C − 10log10(N) − 2·P
 * GSNR gộp tuyến tính:  1/GSNR = 1/OSNR + 1/SNR_nl  → có ĐỈNH tại launch tối ưu.
 *
 * Đây là mô hình MINH HOẠ để luyện trực giác; thiết kế thật dùng GN/EGN đầy đủ + datasheet.
 */
const MODS = [
  {name: 'DP-QPSK', req: 12.5},
  {name: 'DP-8QAM', req: 16.5},
  {name: 'DP-16QAM', req: 20.0},
  {name: 'DP-64QAM', req: 27.0},
];
const C_NL = 33; // hằng số phi tuyến (illustrative)

function gsnrAt(P, L, NF, N) {
  const osnr = 58 + P - L - NF - 10 * Math.log10(N);
  const nl = C_NL - 10 * Math.log10(N) - 2 * P;
  const inv = Math.pow(10, -osnr / 10) + Math.pow(10, -nl / 10);
  return {osnr, nl, gsnr: -10 * Math.log10(inv)};
}

export default function NonlinearOptimizer() {
  const [L, setL] = useState(18);
  const [NF, setNF] = useState(5);
  const [N, setN] = useState(10);

  const {curve, opt} = useMemo(() => {
    const pts = [];
    let best = null;
    for (let P = -8; P <= 6.001; P += 0.25) {
      const r = gsnrAt(P, L, NF, N);
      pts.push({P, ...r});
      if (!best || r.gsnr > best.gsnr) best = {P, ...r};
    }
    return {curve: pts, opt: best};
  }, [L, NF, N]);

  // Chart geometry
  const W = 520, H = 240, padL = 40, padR = 14, padT = 14, padB = 28;
  const xMin = -8, xMax = 6;
  const yMin = 5, yMax = 35;
  const xs = (P) => padL + ((P - xMin) / (xMax - xMin)) * (W - padL - padR);
  const ys = (v) => padT + (1 - (v - yMin) / (yMax - yMin)) * (H - padT - padB);
  const poly = (key) => curve.map((c) => `${xs(c.P).toFixed(1)},${ys(c[key]).toFixed(1)}`).join(' ');

  return (
    <div className={styles.widget}>
      <div className={styles.widgetTitle}>Tối ưu launch power ↔ phi tuyến (GSNR)</div>

      <div className={styles.controlGrid}>
        <div className={styles.control}>
          <label className={styles.label}>Suy hao span L: <strong>{L}</strong> dB</label>
          <input type="range" min={12} max={30} step={0.5} value={L} onChange={(e) => setL(parseFloat(e.target.value))} className={styles.slider} />
        </div>
        <div className={styles.control}>
          <label className={styles.label}>EDFA NF: <strong>{NF}</strong> dB</label>
          <input type="range" min={4} max={7} step={0.1} value={NF} onChange={(e) => setNF(parseFloat(e.target.value))} className={styles.slider} />
        </div>
        <div className={styles.control}>
          <label className={styles.label}>Số span N: <strong>{N}</strong></label>
          <input type="range" min={1} max={40} step={1} value={N} onChange={(e) => setN(parseInt(e.target.value, 10))} className={styles.slider} />
        </div>
      </div>

      <div className={styles.chartWrap}>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.chart} role="img" aria-label="Đồ thị GSNR theo launch power">
          <line x1={padL} y1={ys(yMin)} x2={W - padR} y2={ys(yMin)} className={styles.chartAxis} />
          <line x1={padL} y1={padT} x2={padL} y2={ys(yMin)} className={styles.chartAxis} />
          {[10, 15, 20, 25, 30].map((v) => (
            <g key={v}>
              <line x1={padL} y1={ys(v)} x2={W - padR} y2={ys(v)} className={styles.chartGrid} />
              <text x={padL - 5} y={ys(v) + 3} className={styles.chartTick} textAnchor="end">{v}</text>
            </g>
          ))}
          {[-8, -4, 0, 4].map((p) => (
            <text key={p} x={xs(p)} y={H - 8} className={styles.chartTick} textAnchor="middle">{p}</text>
          ))}
          <text x={(W) / 2} y={H - 0.5} className={styles.chartAxisLabel} textAnchor="middle">Launch power/kênh (dBm)</text>

          <polyline points={poly('osnr')} fill="none" stroke="#58a6ff" strokeWidth="2" />
          <polyline points={poly('nl')} fill="none" stroke="#f0883e" strokeWidth="2" strokeDasharray="4 3" />
          <polyline points={poly('gsnr')} fill="none" stroke="#3fb950" strokeWidth="2.6" />

          <line x1={xs(opt.P)} y1={padT} x2={xs(opt.P)} y2={ys(yMin)} stroke="#3fb950" strokeDasharray="3 3" strokeWidth="1" opacity="0.7" />
          <circle cx={xs(opt.P)} cy={ys(opt.gsnr)} r="4" fill="#3fb950" />
        </svg>
        <div className={styles.chartLegend}>
          <span><i style={{background: '#58a6ff'}} />OSNR (ASE)</span>
          <span><i style={{background: '#f0883e'}} />SNR phi tuyến</span>
          <span><i style={{background: '#3fb950'}} />GSNR (tổng)</span>
        </div>
      </div>

      <div className={styles.readouts}>
        <div className={styles.readout}>
          <span className={styles.readoutVal} style={{color: '#3fb950'}}>{opt.P.toFixed(1)}</span>
          <span className={styles.readoutUnit}>launch tối ưu (dBm)</span>
        </div>
        <div className={styles.readout}>
          <span className={styles.readoutVal} style={{color: '#3fb950'}}>{opt.gsnr.toFixed(1)}</span>
          <span className={styles.readoutUnit}>GSNR đỉnh (dB)</span>
        </div>
      </div>

      <table className={styles.gridTable}>
        <thead><tr><th>Modulation</th><th>Required OSNR</th><th>Margin @GSNR đỉnh</th></tr></thead>
        <tbody>
          {MODS.map((m) => {
            const mg = opt.gsnr - m.req;
            const col = mg >= 3 ? '#3fb950' : mg >= 0 ? '#d29922' : '#f85149';
            return (
              <tr key={m.name}>
                <td style={{textAlign: 'left'}}>{m.name}</td>
                <td>{m.req.toFixed(1)} dB</td>
                <td style={{color: col, fontWeight: 700}}>{mg >= 0 ? '+' : ''}{mg.toFixed(1)} dB</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className={styles.note}>
        Tăng launch → OSNR (xanh dương) tăng, nhưng SNR phi tuyến (cam) tụt nhanh gấp đôi → GSNR (xanh lá)
        có một <strong>đỉnh</strong>: đó là "nonlinear threshold". Tăng số span N kéo cả đường GSNR xuống →
        modulation dày (64QAM) rụng margin trước. Mô hình GN giản lược, chỉ để luyện trực giác.
      </p>
    </div>
  );
}
