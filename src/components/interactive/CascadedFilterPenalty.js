import React, {useState, useMemo} from 'react';
import styles from './interactive.module.css';

/**
 * CascadedFilterPenalty — minh hoạ hẹp phổ khi tín hiệu đi qua nhiều ROADM/WSS xếp tầng.
 *
 * Băng thông hiệu dụng của chuỗi N bộ lọc (xấp xỉ Gaussian):  BW_eff = BW_wss / sqrt(N).
 * Băng thông tín hiệu:  BW_sig ≈ baud × (1 + roll-off).
 * Khi BW_sig tiến sát BW_eff → phạt lọc (filtering penalty) tăng nhanh.
 * Con số phạt ở đây là MINH HOẠ; thiết kế thật lấy từ mô phỏng/vendor.
 */
const SLOTS = [50, 75, 100, 150];

export default function CascadedFilterPenalty() {
  const [baud, setBaud] = useState(64);
  const [slot, setSlot] = useState(75);
  const [N, setN] = useState(6);
  const rolloff = 0.1;

  const r = useMemo(() => {
    const bwWss = slot - 12.5; // 3dB passband điển hình ~ slot − 12.5 GHz
    const bwEff = bwWss / Math.sqrt(N);
    const bwSig = baud * (1 + rolloff);
    const ratio = bwSig / bwEff;
    const penalty = Math.min(8, Math.max(0, 2.5 * Math.pow(Math.max(0, ratio - 0.6) / 0.4, 2.2)));
    return {bwWss, bwEff, bwSig, ratio, penalty};
  }, [baud, slot, N]);

  const status = r.ratio < 0.75 ? {t: 'Thoải mái', c: '#3fb950'} : r.ratio < 0.92 ? {t: 'Sát ngưỡng', c: '#d29922'} : {t: 'Nghẽn phổ', c: '#f85149'};

  // Visual: passband (BW_eff) vs signal (BW_sig)
  const W = 480, H = 96, mid = W / 2, scale = 2.0;
  const half = (bw) => (bw * scale) / 2;

  return (
    <div className={styles.widget}>
      <div className={styles.widgetTitle}>Filtering penalty qua ROADM xếp tầng</div>

      <div className={styles.controlGrid}>
        <div className={styles.control}>
          <label className={styles.label}>Baud rate: <strong>{baud}</strong> GBd</label>
          <input type="range" min={30} max={140} step={1} value={baud} onChange={(e) => setBaud(parseInt(e.target.value, 10))} className={styles.slider} />
        </div>
        <div className={styles.control}>
          <label className={styles.label}>Slot / spacing</label>
          <div className={styles.btnGroup}>
            {SLOTS.map((s) => (
              <button key={s} type="button" className={slot === s ? styles.btnActive : styles.btn} onClick={() => setSlot(s)}>{s} GHz</button>
            ))}
          </div>
        </div>
        <div className={styles.control}>
          <label className={styles.label}>Số ROADM xếp tầng N: <strong>{N}</strong></label>
          <input type="range" min={1} max={20} step={1} value={N} onChange={(e) => setN(parseInt(e.target.value, 10))} className={styles.slider} />
        </div>
      </div>

      <div className={styles.chartWrap}>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.chart} role="img" aria-label="So sánh băng thông tín hiệu và passband hiệu dụng">
          <rect x={mid - half(r.bwEff)} y={20} width={half(r.bwEff) * 2} height={26} rx={4} fill="rgba(88,166,255,0.25)" stroke="#58a6ff" />
          <text x={mid} y={16} className={styles.chartTick} textAnchor="middle">passband hiệu dụng {r.bwEff.toFixed(1)} GHz</text>
          <rect x={mid - half(r.bwSig)} y={54} width={half(r.bwSig) * 2} height={22} rx={4} fill="rgba(63,185,80,0.35)" stroke="#3fb950" />
          <text x={mid} y={90} className={styles.chartTick} textAnchor="middle">tín hiệu {r.bwSig.toFixed(1)} GHz</text>
        </svg>
      </div>

      <div className={styles.readouts}>
        <div className={styles.readout}><span className={styles.readoutVal}>{r.bwEff.toFixed(1)}</span><span className={styles.readoutUnit}>BW hiệu dụng (GHz)</span></div>
        <div className={styles.readout}><span className={styles.readoutVal}>{r.bwSig.toFixed(1)}</span><span className={styles.readoutUnit}>BW tín hiệu (GHz)</span></div>
        <div className={styles.readout}><span className={styles.readoutVal} style={{color: status.c}}>~{r.penalty.toFixed(1)}</span><span className={styles.readoutUnit}>phạt lọc (dB)</span></div>
      </div>

      <div className={styles.verdict} style={{borderColor: status.c, color: status.c}}>
        {status.t}: tín hiệu chiếm {(r.ratio * 100).toFixed(0)}% passband hiệu dụng sau {N} ROADM
      </div>

      <div className={styles.formula}>
        BW<sub>eff</sub> = BW<sub>WSS</sub> / √N = {r.bwWss.toFixed(1)} / √{N} = <strong>{r.bwEff.toFixed(1)} GHz</strong>
      </div>

      <p className={styles.note}>
        Mỗi ROADM/WSS cắt bớt hai mép phổ; xếp tầng N bộ lọc thì passband hẹp lại theo ~1/√N. Baud càng cao,
        slot càng nhỏ, càng nhiều ROADM → tín hiệu càng "chạm mép" và phạt lọc tăng vọt. Đây là lý do thiết kế
        mesh phải đếm số ROADM trên đường đi và chọn slot đủ rộng (flexgrid).
      </p>
    </div>
  );
}
