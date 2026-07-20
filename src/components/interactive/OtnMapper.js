import React, {useState} from 'react';
import styles from './interactive.module.css';

/**
 * OtnMapper — chọn client, xem nó được ánh xạ vào container OTN (ITU-T G.709) nào và line rate.
 * Số liệu là các giá trị chuẩn G.709 (điển hình). Beyond-100G dùng OTUCn/FlexO.
 */
const CLIENTS = [
  {c: '1GbE', opu: 'OPU0', odu: 'ODU0', otu: 'ghép lên ODU cao hơn', rate: '1.244 Gb/s', note: 'ODU0 (~1.25G) hiếm khi đi riêng — thường multiplex lên ODU2/ODU4.'},
  {c: '10GbE', opu: 'OPU2 / OPU2e', odu: 'ODU2 / ODU2e', otu: 'OTU2 / OTU2e', rate: '10.709 / 11.09 Gb/s', note: 'ODU2e overclock để mang trọn 10GbE LAN (10.3125G).'},
  {c: '40GbE', opu: 'OPU3', odu: 'ODU3', otu: 'OTU3', rate: '43.018 Gb/s', note: '40G — ngày nay ít dùng, thường gộp 4×10G hoặc lên 100G.'},
  {c: '100GbE', opu: 'OPU4', odu: 'ODU4', otu: 'OTU4', rate: '111.81 Gb/s', note: 'OTU4 ~111.8G gồm ~7% FEC (RS 255/239). Container 100G phổ biến nhất.'},
  {c: '200G', opu: 'OPUC2', odu: 'ODUC2', otu: 'OTUC2 + FlexO', rate: '~2×100G', note: 'Beyond-100G: OTUCn (n×~100G) + FlexO ghép sang giao diện quang.'},
  {c: '400G', opu: 'OPUC4', odu: 'ODUC4', otu: 'OTUC4 + FlexO', rate: '~4×100G', note: 'ODUC4/OTUC4; FlexO-4 chia sang các lane quang.'},
];

export default function OtnMapper() {
  const [i, setI] = useState(3);
  const s = CLIENTS[i];

  return (
    <div className={styles.widget}>
      <div className={styles.widgetTitle}>OTN mapper — client → container (G.709)</div>

      <div className={styles.control}>
        <label className={styles.label}>Chọn client</label>
        <div className={styles.btnGroup}>
          {CLIENTS.map((c, idx) => (
            <button key={c.c} type="button" className={i === idx ? styles.btnActive : styles.btn} onClick={() => setI(idx)}>{c.c}</button>
          ))}
        </div>
      </div>

      <div className={styles.otnStack}>
        <div className={styles.otnOtu}>
          <span className={styles.otnTag}>{s.otu} · +FEC</span>
          <div className={styles.otnOdu}>
            <span className={styles.otnTag}>{s.odu} · overhead (OAM, TCM)</span>
            <div className={styles.otnOpu}>
              <span className={styles.otnTag}>{s.opu}</span>
              <div className={styles.otnClient}>{s.c}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.readouts}>
        <div className={styles.readout}><span className={styles.readoutVal} style={{fontSize: '1.05rem'}}>{s.odu}</span><span className={styles.readoutUnit}>container ODU</span></div>
        <div className={styles.readout}><span className={styles.readoutVal} style={{fontSize: '1.05rem'}}>{s.otu}</span><span className={styles.readoutUnit}>tín hiệu OTU</span></div>
        <div className={styles.readout}><span className={styles.readoutVal} style={{fontSize: '1.05rem', color: '#58a6ff'}}>{s.rate}</span><span className={styles.readoutUnit}>line rate</span></div>
      </div>

      <p className={styles.note}>
        Nguyên tắc OTN: client được bọc vào <strong>OPU</strong> (payload) → thêm overhead thành <strong>ODU</strong>
        (đơn vị chuyển mạch/OAM/TCM) → thêm <strong>FEC</strong> thành <strong>OTU</strong> (tín hiệu lên sợi). {s.note}
      </p>
    </div>
  );
}
