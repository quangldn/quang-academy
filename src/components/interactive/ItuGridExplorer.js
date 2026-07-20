import React, {useState, useMemo} from 'react';
import styles from './interactive.module.css';

/**
 * ItuGridExplorer — minh hoạ ITU-T G.694.1 fixed grid.
 * Anchor: 193.1 THz. f_n = 193.1 + n·Δf (THz). λ = c / f, c = 299792.458 nm·THz.
 * C-band tham chiếu ~191.6–196.1 THz.
 */
const C = 299792.458; // nm·THz (tốc độ ánh sáng để λ(nm) = C / f(THz))

export default function ItuGridExplorer() {
  const [spacing, setSpacing] = useState(50); // GHz
  const [n, setN] = useState(0);

  const df = spacing / 1000; // THz
  const freq = 193.1 + n * df;
  const lambda = C / freq;

  // Bảng kênh quanh vị trí đang chọn
  const rows = useMemo(() => {
    const out = [];
    for (let k = n - 4; k <= n + 4; k++) {
      const f = 193.1 + k * df;
      out.push({k, f, lam: C / f});
    }
    return out;
  }, [n, df]);

  const inCband = freq >= 191.6 && freq <= 196.1;

  return (
    <div className={styles.widget}>
      <div className={styles.widgetTitle}>ITU-T G.694.1 — DWDM Grid Explorer</div>

      <div className={styles.controlGrid}>
        <div className={styles.control}>
          <label className={styles.label}>Khoảng cách kênh (Δf)</label>
          <div className={styles.btnGroup}>
            {[100, 50, 25, 12.5].map((s) => (
              <button
                key={s}
                type="button"
                className={spacing === s ? styles.btnActive : styles.btn}
                onClick={() => setSpacing(s)}
              >
                {s} GHz
              </button>
            ))}
          </div>
        </div>
        <div className={styles.control}>
          <label className={styles.label}>Chỉ số kênh n = {n}</label>
          <input
            type="range"
            min={-30}
            max={30}
            step={1}
            value={n}
            onChange={(e) => setN(parseInt(e.target.value, 10))}
            className={styles.slider}
          />
        </div>
      </div>

      <div className={styles.readouts}>
        <div className={styles.readout}>
          <span className={styles.readoutVal}>{freq.toFixed(5)}</span>
          <span className={styles.readoutUnit}>THz</span>
        </div>
        <div className={styles.readout}>
          <span className={styles.readoutVal}>{lambda.toFixed(3)}</span>
          <span className={styles.readoutUnit}>nm</span>
        </div>
        <div className={styles.readout}>
          <span className={styles.readoutVal} style={{color: inCband ? '#3fb950' : '#f0883e'}}>
            {inCband ? 'C-band' : 'ngoài C'}
          </span>
          <span className={styles.readoutUnit}>vùng</span>
        </div>
      </div>

      <div className={styles.formula}>
        f<sub>n</sub> = 193.1 + n × Δf = 193.1 + ({n}) × {df.toFixed(4)} = <strong>{freq.toFixed(5)} THz</strong>
        &nbsp;→&nbsp; λ = c / f = <strong>{lambda.toFixed(3)} nm</strong>
      </div>

      <table className={styles.gridTable}>
        <thead>
          <tr>
            <th>n</th>
            <th>Tần số (THz)</th>
            <th>Bước sóng (nm)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.k} className={r.k === n ? styles.gridRowActive : undefined}>
              <td>{r.k}</td>
              <td>{r.f.toFixed(5)}</td>
              <td>{r.lam.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className={styles.note}>
        Anchor 193.1 THz ≈ 1552.52 nm. Chú ý: tần số tăng thì bước sóng giảm (nghịch đảo).
        Fixed grid dùng Δf cố định; flexible grid (G.694.1) cho phép slot rộng m×12.5 GHz,
        tâm đặt theo bước 6.25 GHz — cần cho tín hiệu coherent baud cao.
      </p>
    </div>
  );
}
