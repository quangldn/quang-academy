import React, {useState, useMemo} from 'react';
import styles from './interactive.module.css';

/**
 * LinkBudgetCalculator — tính link budget và OSNR cho một chuỗi N span giống nhau,
 * mỗi span được một EDFA khôi phục đúng bằng suy hao span (giả định thiết kế phổ biến).
 *
 * Công thức OSNR chuẩn ngành (tham chiếu 0.1 nm ≈ 12.5 GHz):
 *   OSNR[dB] ≈ 58 + P_launch[dBm] − L_span[dB] − NF[dB] − 10·log10(N)
 * Hằng số 58 đến từ −10·log10(h·ν·Δν_ref) với ν=193.1 THz, Δν_ref=12.5 GHz.
 *
 * Giá trị "required OSNR" theo modulation là số THAM KHẢO (order-of-magnitude,
 * đã tính FEC hiện đại). Giá trị thật luôn lấy từ datasheet của bộ transponder.
 */
const MODS = [
  {name: 'DP-QPSK (~100–200G)', reqOSNR: 12.5},
  {name: 'DP-8QAM (~300G)', reqOSNR: 16.5},
  {name: 'DP-16QAM (~400G)', reqOSNR: 20.0},
  {name: 'DP-64QAM (~800G, ngắn)', reqOSNR: 27.0},
];

export default function LinkBudgetCalculator() {
  const [launch, setLaunch] = useState(1); // dBm/kênh
  const [spanKm, setSpanKm] = useState(80);
  const [atten, setAtten] = useState(0.22); // dB/km (G.652 ~0.2, cộng lề)
  const [extraLoss, setExtraLoss] = useState(2); // connector/splice/margin per span
  const [nSpans, setNSpans] = useState(6);
  const [nf, setNf] = useState(5); // EDFA NF dB
  const [modIdx, setModIdx] = useState(2);

  const r = useMemo(() => {
    const lSpan = spanKm * atten + extraLoss;
    const osnr = 58 + launch - lSpan - nf - 10 * Math.log10(Math.max(nSpans, 1));
    const totalLoss = lSpan * nSpans;
    const totalKm = spanKm * nSpans;
    const req = MODS[modIdx].reqOSNR;
    const margin = osnr - req;
    return {lSpan, osnr, totalLoss, totalKm, req, margin};
  }, [launch, spanKm, atten, extraLoss, nSpans, nf, modIdx]);

  const marginColor = r.margin >= 3 ? '#3fb950' : r.margin >= 0 ? '#d29922' : '#f85149';
  const marginLabel =
    r.margin >= 3 ? 'An toàn' : r.margin >= 0 ? 'Sát ngưỡng' : 'KHÔNG đạt';

  const Field = ({label, value, set, min, max, step, unit}) => (
    <div className={styles.control}>
      <label className={styles.label}>
        {label}: <strong>{value}</strong> {unit}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(parseFloat(e.target.value))}
        className={styles.slider}
      />
    </div>
  );

  return (
    <div className={styles.widget}>
      <div className={styles.widgetTitle}>Link Budget & OSNR Calculator</div>

      <div className={styles.controlGrid}>
        <Field label="Launch power/kênh" value={launch} set={setLaunch} min={-6} max={6} step={0.5} unit="dBm" />
        <Field label="Chiều dài span" value={spanKm} set={setSpanKm} min={20} max={120} step={1} unit="km" />
        <Field label="Suy hao sợi" value={atten} set={setAtten} min={0.18} max={0.35} step={0.01} unit="dB/km" />
        <Field label="Loss thêm/span" value={extraLoss} set={setExtraLoss} min={0} max={6} step={0.5} unit="dB" />
        <Field label="Số span N" value={nSpans} set={setNSpans} min={1} max={40} step={1} unit="span" />
        <Field label="EDFA noise figure" value={nf} set={setNf} min={4} max={7} step={0.1} unit="dB" />
      </div>

      <div className={styles.control}>
        <label className={styles.label}>Modulation (required OSNR tham khảo)</label>
        <div className={styles.btnGroup}>
          {MODS.map((m, i) => (
            <button
              key={m.name}
              type="button"
              className={modIdx === i ? styles.btnActive : styles.btn}
              onClick={() => setModIdx(i)}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.readouts}>
        <div className={styles.readout}>
          <span className={styles.readoutVal}>{r.lSpan.toFixed(1)}</span>
          <span className={styles.readoutUnit}>dB / span</span>
        </div>
        <div className={styles.readout}>
          <span className={styles.readoutVal}>{r.totalKm.toFixed(0)}</span>
          <span className={styles.readoutUnit}>km tổng</span>
        </div>
        <div className={styles.readout}>
          <span className={styles.readoutVal} style={{color: '#58a6ff'}}>{r.osnr.toFixed(1)}</span>
          <span className={styles.readoutUnit}>OSNR (dB)</span>
        </div>
        <div className={styles.readout}>
          <span className={styles.readoutVal} style={{color: marginColor}}>
            {r.margin >= 0 ? '+' : ''}{r.margin.toFixed(1)}
          </span>
          <span className={styles.readoutUnit}>margin (dB)</span>
        </div>
      </div>

      <div className={styles.verdict} style={{borderColor: marginColor, color: marginColor}}>
        {marginLabel}: OSNR {r.osnr.toFixed(1)} dB vs yêu cầu {r.req.toFixed(1)} dB
        &nbsp;→&nbsp; margin {r.margin >= 0 ? '+' : ''}{r.margin.toFixed(1)} dB
      </div>

      <div className={styles.formula}>
        OSNR = 58 + P<sub>launch</sub> − L<sub>span</sub> − NF − 10·log₁₀(N)
        = 58 + {launch} − {r.lSpan.toFixed(1)} − {nf} − {(10 * Math.log10(Math.max(nSpans,1))).toFixed(1)}
        = <strong>{r.osnr.toFixed(1)} dB</strong>
      </div>

      <p className={styles.note}>
        Thí nghiệm nhanh: tăng số span N → OSNR giảm ~ theo 10·log₁₀(N) (gấp đôi span ≈ −3 dB).
        Tăng launch power giúp OSNR nhưng đời thực bị chặn bởi hiệu ứng phi tuyến (Cấp 3).
        Required OSNR ở đây là số tham khảo — thiết kế thật lấy từ datasheet transponder.
      </p>
    </div>
  );
}
