import fs from 'fs';
import path from 'path';

const DOCS = path.resolve('docs');

// Danh sách bài học. done=true là bài đã viết đầy đủ (không tạo stub).
const lessons = {
  'level-1-fresher': [
    ['1-1-1-anh-sang', 1, '1.1.1 — Ánh sáng trong viễn thông', null, true],
    ['1-1-2-soi-quang', 2, '1.1.2 — Sợi quang: cấu tạo & chuẩn ITU-T', 'Phân biệt SMF/MMF; hiểu core/cladding; biết khi nào dùng G.652 / G.654 / G.655 và vì sao.'],
    ['1-1-3-ba-ke-thu', 3, '1.1.3 — Ba "kẻ thù": suy hao, tán sắc, phi tuyến', 'Tổng quan ba cơ chế làm hỏng tín hiệu và mỗi cái sẽ được giải quyết ở đâu trong khoá học.'],
    ['1-1-4-db-dbm', 4, '1.1.4 — dB, dBm và toán kỹ thuật quang', null, true],
    ['1-2-1-wdm-la-gi', 5, '1.2.1 — WDM & DWDM là gì', 'Từ 1 sợi–1 bước sóng đến ghép kênh; CWDM vs DWDM; vì sao "dense".'],
    ['1-2-2-itu-grid', 6, '1.2.2 — ITU-T G.694.1 DWDM Grid', null, true],
    ['1-2-3-kien-truc-diem-diem', 7, '1.2.3 — Kiến trúc tuyến DWDM điểm–điểm', 'Đọc được sơ đồ Tx → mux → booster → span → preamp → demux → Rx và vai trò từng khối.'],
    ['1-2-4-khoi-chuc-nang', 8, '1.2.4 — Các khối chức năng cốt lõi', 'Transponder/Muxponder, OADM, Optical Amplifier, OSC, VOA, tap — mỗi khối làm gì.'],
    ['1-3-1-mux-demux-filter', 9, '1.3.1 — Mux/Demux & bộ lọc', 'AWG, thin-film filter, interleaver: cách ghép/tách các bước sóng.'],
    ['1-3-2-edfa', 10, '1.3.2 — Khuếch đại EDFA', 'Nguyên lý bơm Er³⁺, gain, noise figure, gain flattening — vì sao EDFA làm nên C-band.'],
    ['1-3-3-raman', 11, '1.3.3 — Khuếch đại Raman (giới thiệu)', 'Distributed gain trong chính sợi truyền và vì sao nó cải thiện OSNR.'],
    ['1-3-4-osc-voa-tap', 12, '1.3.4 — OSC, VOA và tap', 'Kênh giám sát quang, bộ suy hao biến thiên, và cách mạng "tự nhìn thấy chính nó".'],
    ['1-4-1-do-cong-suat', 13, '1.4.1 — Đo công suất & đọc phổ', 'Power meter và OSA: đo mức và đọc phổ DWDM trong thực tế.'],
    ['1-4-2-osnr-khai-niem', 14, '1.4.2 — OSNR: khái niệm nền tảng', 'Định nghĩa OSNR, dải tham chiếu 0.1 nm, và vì sao nó quyết định mọi thứ.'],
    ['1-4-3-ber-qfactor', 15, '1.4.3 — BER, Q-factor, pre/post-FEC', 'Chất lượng tín hiệu đo bằng gì; vì sao pre-FEC BER là chỉ số vận hành quan trọng.'],
    ['1-4-4-link-budget', 16, '1.4.4 — Link budget & OSNR', null, true],
    ['capstone-cap-1', 17, '★ Capstone Cấp 1 — Tuyến điểm–điểm', 'Thiết kế tuyến DWDM 4 bước sóng, 2 span: tính công suất và OSNR đến máy thu, kiểm tra margin.'],
  ],
  'level-2-junior': [
    ['2-1-link-osnr-budget', 1, '2.1 — Link budget & OSNR budget chi tiết', 'Loss connector/splice/filter/span; ASE tích luỹ qua chuỗi EDFA; margin & aging.'],
    ['2-2-tan-sac', 2, '2.2 — Tán sắc chi tiết (CD & PMD)', 'ps/nm/km, dispersion map, bù DCF vs bù số coherent; PMD và giới hạn tốc độ.'],
    ['2-3-khuech-dai-nang-cao', 3, '2.3 — Khuếch đại nâng cao', 'EDFA gain tilt/transient, Raman/hybrid, khuếch đại C+L, điều khiển AGC/APC.'],
    ['2-4-roadm', 4, '2.4 — ROADM', 'WSS, degree, add/drop; kiến trúc CDC (Colorless/Directionless/Contentionless); express.'],
    ['2-5-transceiver', 5, '2.5 — Bộ thu phát & giao diện', 'Grey vs colored optics; transponder vs pluggable; DWDM tunable; alien wavelength.'],
    ['2-6-van-hanh-tuyen', 6, '2.6 — Vận hành tuyến', 'Commissioning/turn-up, power balancing, đọc alarm, troubleshoot OSNR/suy hao.'],
    ['capstone-cap-2', 7, '★ Capstone Cấp 2 — Tuyến metro ROADM', 'Thiết kế tuyến metro 3 site ROADM có add/drop; kiểm tra OSNR & filtering penalty.'],
  ],
  'level-3-senior': [
    ['3-1-coherent', 1, '3.1 — Coherent optics & điều chế', null, true],
    ['3-2-fec-spectral-efficiency', 2, '3.2 — FEC & spectral efficiency', 'Hard vs soft-decision FEC, coding gain, giới hạn Shannon, baud vs bits/symbol, PCS.'],
    ['3-3-phi-tuyen', 3, '3.3 — Hiệu ứng phi tuyến', 'SPM, XPM, FWM, SBS, SRS; mô hình GN/EGN; ngưỡng công suất tối ưu.'],
    ['3-4-osnr-gsnr', 4, '3.4 — OSNR/GSNR engineering', 'Penalty (filtering, phi tuyến, PMD); Generalized SNR; required OSNR & margin design.'],
    ['3-5-thiet-ke-mesh-pho', 5, '3.5 — Thiết kế mạng mesh & phổ', 'Flexible grid, spectrum assignment, RWA/RSA, filtering penalty qua ROADM xếp tầng.'],
    ['3-6-bang-tan-mo-rong', 6, '3.6 — Băng tần mở rộng C+L', 'C+L band, Super-C; mở rộng phổ vs thêm sợi; kinh tế của L-band.'],
    ['capstone-cap-3', 7, '★ Capstone Cấp 3 — Mạng long-haul coherent', 'Thiết kế mạng đa span: chọn modulation/baud, tính GSNR & margin, tối ưu launch power.'],
  ],
  'level-4-veteran': [
    ['4-1-kien-truc-hien-dai', 1, '4.1 — Kiến trúc mạng hiện đại', 'IPoDWDM; 400ZR/OpenZR+/800ZR (OIF, QSFP-DD/OSFP); disaggregation & Open Line System.'],
    ['4-2-dieu-khien-tu-dong', 2, '4.2 — Điều khiển & tự động hoá', 'SDN quang; NETCONF/YANG, OpenConfig; GMPLS/PCE; streaming telemetry; AI-assisted ops.'],
    ['4-3-otn', 3, '4.3 — Lớp OTN (G.709)', 'OTU/ODU/OPU, mapping & multiplexing, FEC OTN, FlexO, OTN switching — đủ để SE tư vấn.'],
    ['4-4-bao-ve-khoi-phuc', 4, '4.4 — Bảo vệ & khả dụng', 'OMS/OCh protection, restoration, ASON, SRLG, mục tiêu 50 ms, availability.'],
    ['4-5-toi-uu-van-hanh', 5, '4.5 — Tối ưu & vận hành nâng cao', 'Margin harvesting & real-time SNR, nâng dung lượng liền mạch, fiber characterization, digital twin.'],
    ['4-6-kinh-te-mang', 6, '4.6 — Kinh tế mạng & tư duy SE', '$/bit, W/bit, TCO & sustainability thật; đọc RFP; xây BoM chuẩn kỹ thuật; chọn giải pháp theo ràng buộc.'],
    ['4-7-xu-huong', 7, '4.7 — Xu hướng & tương lai', 'Hollow-core fiber, 1.6T+/λ, photonic integration & co-packaged optics, AI-driven networks, quantum-safe.'],
    ['capstone-cap-4', 8, '★ Capstone Cấp 4 — Backbone quốc gia', 'Đề xuất kiến trúc backbone: OLS + IPoDWDM + bảo vệ + tự động hoá, kèm lập luận kinh tế.'],
  ],
};

const STUB = (title, objective) => `---
title: ${JSON.stringify(title)}
draft: false
---

import LessonStub from '@site/src/components/LessonStub';

# ${title}

<LessonStub objective={${JSON.stringify(objective || '')}} />
`;

let created = 0;
for (const [dir, items] of Object.entries(lessons)) {
  for (const [slug, pos, title, objective, done] of items) {
    const file = path.join(DOCS, dir, `${slug}.mdx`);
    if (done) continue;
    if (fs.existsSync(file)) continue;
    const fm = `---
sidebar_position: ${pos}
title: ${JSON.stringify(title)}
---

import LessonStub from '@site/src/components/LessonStub';

# ${title}

<LessonStub objective={${JSON.stringify(objective || '')}} />
`;
    fs.writeFileSync(file, fm);
    created++;
  }
}
console.log('Stubs created:', created);
