import React, {useState, useMemo} from 'react';
import styles from './interactive.module.css';

/**
 * ConstellationExplorer — vẽ constellation cho các format điều chế và tính
 * bit-rate/kênh: R = baud × bits/symbol × 2 (phân cực kép DP).
 * Giá trị required-OSNR là tham khảo bậc độ lớn để so sánh tương đối.
 */
const FORMATS = {
  BPSK: {bits: 1, reqOSNR: 9, pts: gen(2, 1)},
  QPSK: {bits: 2, reqOSNR: 12.5, pts: gen(2, 2)},
  '8QAM': {bits: 3, reqOSNR: 16.5, pts: gen8()},
  '16QAM': {bits: 4, reqOSNR: 20, pts: gen(4, 4)},
  '32QAM': {bits: 5, reqOSNR: 23.5, pts: gen32()},
  '64QAM': {bits: 6, reqOSNR: 27, pts: gen(8, 8)},
};

// Lưới vuông cols×rows đối xứng quanh gốc
function gen(cols, rows) {
  const pts = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      pts.push([i - (cols - 1) / 2, j - (rows - 1) / 2]);
    }
  }
  return norm(pts);
}
function gen8() {
  // 8QAM dạng (4+4) hai vòng — biểu diễn giản lược phổ biến
  const pts = [];
  const inner = 1, outer = 1 + Math.SQRT2;
  for (let k = 0; k < 4; k++) {
    const a = (Math.PI / 4) + (k * Math.PI) / 2;
    pts.push([inner * Math.cos(a), inner * Math.sin(a)]);
    pts.push([outer * Math.cos(a), outer * Math.sin(a)]);
  }
  return norm(pts);
}
function gen32() {
  // 32QAM = lưới 6×6 bỏ 4 góc (cross constellation)
  const pts = [];
  for (let i = 0; i < 6; i++)
    for (let j = 0; j < 6; j++) {
      const corner =
        (i === 0 || i === 5) && (j === 0 || j === 5);
      if (!corner) pts.push([i - 2.5, j - 2.5]);
    }
  return norm(pts);
}
function norm(pts) {
  const max = Math.max(...pts.map((p) => Math.hypot(p[0], p[1])));
  return pts.map((p) => [p[0] / max, p[1] / max]);
}

export default function ConstellationExplorer() {
  const [fmt, setFmt] = useState('16QAM');
  const [baud, setBaud] = useState(96); // GBd
  const [noise, setNoise] = useState(0.06); // độ "mờ" mô phỏng nhiễu

  const f = FORMATS[fmt];
  const bitrate = useMemo(() => baud * f.bits * 2, [baud, f]); // Gb/s, DP
  const size = 260;
  const c = size / 2;
  const scale = size * 0.4;

  // Sinh vài "mẫu" quanh mỗi điểm để minh hoạ nhiễu (tất định, không random)
  const cloud = useMemo(() => {
    const out = [];
    f.pts.forEach(([x, y], idx) => {
      out.push({x, y, center: true, key: `c${idx}`});
      for (let s = 0; s < 6; s++) {
        const a = (s / 6) * 2 * Math.PI + idx;
        const rr = noise * (0.6 + 0.4 * ((idx + s) % 3));
        out.push({
          x: x + rr * Math.cos(a),
          y: y + rr * Math.sin(a),
          center: false,
          key: `p${idx}_${s}`,
        });
      }
    });
    return out;
  }, [f, noise]);

  return (
    <div className={styles.widget}>
      <div className={styles.widgetTitle}>Constellation & Modulation Explorer</div>

      <div className={styles.control}>
        <label className={styles.label}>Định dạng điều chế</label>
        <div className={styles.btnGroup}>
          {Object.keys(FORMATS).map((k) => (
            <button
              key={k}
              type="button"
              className={fmt === k ? styles.btnActive : styles.btn}
              onClick={() => setFmt(k)}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.constWrap}>
        <svg width={size} height={size} className={styles.constSvg}>
          <line x1={c} y1={8} x2={c} y2={size - 8} className={styles.axis} />
          <line x1={8} y1={c} x2={size - 8} y2={c} className={styles.axis} />
          <text x={size - 14} y={c - 6} className={styles.axisLabel}>I</text>
          <text x={c + 6} y={16} className={styles.axisLabel}>Q</text>
          {cloud.map((p) => (
            <circle
              key={p.key}
              cx={c + p.x * scale}
              cy={c - p.y * scale}
              r={p.center ? 3.5 : 1.6}
              className={p.center ? styles.constCenter : styles.constNoise}
            />
          ))}
        </svg>
        <div className={styles.constStats}>
          <div className={styles.readout}>
            <span className={styles.readoutVal}>{f.bits}</span>
            <span className={styles.readoutUnit}>bits/symbol</span>
          </div>
          <div className={styles.readout}>
            <span className={styles.readoutVal}>{f.pts.length}</span>
            <span className={styles.readoutUnit}>điểm</span>
          </div>
          <div className={styles.readout}>
            <span className={styles.readoutVal} style={{color: '#58a6ff'}}>
              {(bitrate / 1000).toFixed(2)}
            </span>
            <span className={styles.readoutUnit}>Tb/s (DP)</span>
          </div>
          <div className={styles.readout}>
            <span className={styles.readoutVal} style={{color: '#f0883e'}}>~{f.reqOSNR}</span>
            <span className={styles.readoutUnit}>OSNR yêu cầu (dB)</span>
          </div>
        </div>
      </div>

      <div className={styles.controlGrid}>
        <div className={styles.control}>
          <label className={styles.label}>Baud rate: <strong>{baud}</strong> GBd</label>
          <input type="range" min={30} max={160} step={1} value={baud}
            onChange={(e) => setBaud(parseInt(e.target.value, 10))} className={styles.slider} />
        </div>
        <div className={styles.control}>
          <label className={styles.label}>Nhiễu mô phỏng (kéo để thấy điểm "nhoè")</label>
          <input type="range" min={0.01} max={0.18} step={0.005} value={noise}
            onChange={(e) => setNoise(parseFloat(e.target.value))} className={styles.slider} />
        </div>
      </div>

      <div className={styles.formula}>
        Bit-rate/kênh = baud × bits/symbol × 2 (DP) = {baud} × {f.bits} × 2 =
        <strong> {bitrate} Gb/s ≈ {(bitrate / 1000).toFixed(2)} Tb/s</strong>
      </div>

      <p className={styles.note}>
        Càng nhiều điểm (64QAM) → càng nhiều bit/symbol → dung lượng cao hơn, nhưng các
        điểm sát nhau nên cần OSNR cao hơn (nhạy nhiễu). Đây chính là đánh đổi trung tâm
        của thiết kế coherent: <em>dung lượng ↔ khoảng cách</em>. Tăng "nhiễu mô phỏng" để
        thấy vì sao 64QAM "vỡ" trước QPSK.
      </p>
    </div>
  );
}
