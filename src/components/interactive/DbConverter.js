import React, {useState} from 'react';
import styles from './interactive.module.css';

/**
 * DbConverter — chuyển đổi dBm ↔ mW ↔ W và minh hoạ "luật 3 dB / 10 dB".
 * Công thức: P(dBm) = 10·log10( P(mW) ),  P(mW) = 10^( P(dBm)/10 ).
 */
export default function DbConverter() {
  const [dbm, setDbm] = useState(0); // 0 dBm = 1 mW

  const mw = Math.pow(10, dbm / 10);
  const w = mw / 1000;

  const fmt = (x) => {
    if (x === 0) return '0';
    const abs = Math.abs(x);
    if (abs >= 1000 || abs < 0.001) return x.toExponential(3);
    if (abs >= 1) return x.toFixed(3);
    return x.toPrecision(3);
  };

  const setFromMw = (val) => {
    const v = parseFloat(val);
    if (!isFinite(v) || v <= 0) return;
    setDbm(10 * Math.log10(v));
  };

  return (
    <div className={styles.widget}>
      <div className={styles.widgetTitle}>Bộ chuyển đổi dBm ↔ mW</div>

      <div className={styles.row}>
        <label className={styles.label}>Công suất (dBm)</label>
        <input
          type="range"
          min={-40}
          max={30}
          step={0.5}
          value={dbm}
          onChange={(e) => setDbm(parseFloat(e.target.value))}
          className={styles.slider}
        />
        <input
          type="number"
          value={Number(dbm.toFixed(2))}
          step={0.5}
          onChange={(e) => setDbm(parseFloat(e.target.value) || 0)}
          className={styles.numInput}
        />
      </div>

      <div className={styles.readouts}>
        <div className={styles.readout}>
          <span className={styles.readoutVal}>{fmt(dbm)}</span>
          <span className={styles.readoutUnit}>dBm</span>
        </div>
        <div className={styles.readout}>
          <span className={styles.readoutVal}>{fmt(mw)}</span>
          <span className={styles.readoutUnit}>mW</span>
          <input
            type="number"
            value={Number(mw.toPrecision(4))}
            onChange={(e) => setFromMw(e.target.value)}
            className={styles.numInputSmall}
          />
        </div>
        <div className={styles.readout}>
          <span className={styles.readoutVal}>{fmt(w)}</span>
          <span className={styles.readoutUnit}>W</span>
        </div>
      </div>

      <div className={styles.ruleBox}>
        <div><strong>Luật nhớ nhanh:</strong></div>
        <div>+3 dB ≈ ×2 công suất &nbsp;|&nbsp; −3 dB ≈ ÷2</div>
        <div>+10 dB = ×10 &nbsp;|&nbsp; −10 dB = ÷10</div>
        <div>0 dBm = 1 mW (mốc tham chiếu)</div>
      </div>

      <p className={styles.note}>
        Thử: kéo lên +3 dBm → ~2 mW. Lên +10 dBm → 10 mW. Đây là lý do kỹ sư quang
        cộng/trừ dB thay vì nhân/chia mW.
      </p>
    </div>
  );
}
