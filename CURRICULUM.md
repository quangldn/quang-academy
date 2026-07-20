# DWDM Academy — Giáo trình tổng thể (Từ Fresher đến Veteran)

> Phiên bản 0.1 — bản nháp để review. Trung lập về hãng (vendor-neutral): gốc là chuẩn ITU-T và nguyên lý ngành; ví dụ thực tế trích từ tài liệu public của Nokia, Ciena, Infinera, Huawei, Cisco.
>
> Triết lý: **kỹ sư thật, không marketing**. Mỗi khái niệm gắn với triển khai thực tế (OSNR, sợi, vận hành), không phải "spec-sheet engineering".

## Cấu trúc 4 cấp độ

| Cấp | Tên | Mục tiêu người học đạt được |
|---|---|---|
| **1. Fresher** | Nền tảng quang & WDM | Hiểu ánh sáng, sợi, WDM/DWDM, các khối chức năng, đơn vị kỹ thuật, OSNR/link budget cơ bản. Đọc được sơ đồ tuyến điểm–điểm. |
| **2. Junior** | Vận hành & thiết kế tuyến | Tự tính link budget & OSNR budget, hiểu tán sắc/khuếch đại chi tiết, ROADM cơ bản, turn-up & troubleshoot tuyến. |
| **3. Senior** | Coherent & thiết kế hệ thống | Nắm coherent/DSP/FEC, hiệu ứng phi tuyến, GSNR engineering, thiết kế mạng mesh flexible-grid, băng tần C+L. |
| **4. Veteran** | Kiến trúc, tối ưu, vận hành mạng | IPoDWDM/ZR+, open line system, SDN/telemetry, OTN, bảo vệ/khôi phục, margin harvesting, kinh tế mạng & tư duy RFP/BoM. |

Mỗi cấp có: nhiều **Module** → mỗi module gồm 3–6 **bài học** → mỗi module kết bằng **Quiz** → mỗi cấp kết bằng **Capstone** (bài thực hành thiết kế).

---

## CẤP 1 — FRESHER: Nền tảng quang & WDM

### Module 1.1 — Ánh sáng & sợi quang
- **1.1.1** Ánh sáng trong viễn thông: bước sóng ↔ tần số, phổ quang, các cửa sổ O/E/S/C/L/U-band, vì sao C-band thống trị.
- **1.1.2** Sợi quang: cấu tạo (core/cladding), SMF vs MMF, các chuẩn ITU-T G.652/G.654/G.655 và khi nào dùng loại nào.
- **1.1.3** Ba "kẻ thù" của tín hiệu: Suy hao (Attenuation), Tán sắc (Dispersion — CD & PMD), Phi tuyến (Nonlinearity) — tổng quan.
- **1.1.4** ★ Toán kỹ thuật quang: dB, dBm, mW, quy đổi tuyến tính ↔ logarit. *(Interactive: bộ chuyển đổi dB/dBm/mW)*

### Module 1.2 — WDM & DWDM là gì
- **1.2.1** Từ 1 sợi–1 bước sóng đến ghép kênh: CWDM vs DWDM, vì sao "dense".
- **1.2.2** ★ ITU-T G.694.1 Grid: anchor 193.1 THz, fixed grid (100/50 GHz), flexible grid (6.25 GHz granularity, slot m×12.5 GHz), cách tính tần số ↔ bước sóng. *(Interactive: ITU Grid Explorer)*
- **1.2.3** Kiến trúc tuyến DWDM điểm–điểm: transponder → mux → (booster → span → preamp)×N → demux → transponder.
- **1.2.4** Các khối chức năng: Transponder/Muxponder, OADM, Optical Amplifier, OSC, VOA, tap.

### Module 1.3 — Thành phần thụ động & chủ động
- **1.3.1** Mux/Demux & filter: AWG, thin-film filter, interleaver.
- **1.3.2** Khuếch đại EDFA: nguyên lý bơm Er3+, gain, noise figure, gain flattening.
- **1.3.3** Raman amplification (giới thiệu): distributed gain, vì sao cải thiện OSNR.
- **1.3.4** OSC, VOA, coupler/tap: mạng "nhìn thấy chính nó" thế nào.

### Module 1.4 — Đo lường & chất lượng tín hiệu
- **1.4.1** Đo công suất: power meter, OSA — đọc phổ DWDM.
- **1.4.2** ★ OSNR — khái niệm nền tảng: định nghĩa, dải ref 0.1 nm, vì sao nó quyết định tất cả. *(Interactive: OSNR intuition)*
- **1.4.3** BER, Q-factor, pre-FEC vs post-FEC — chất lượng đo bằng gì.
- **1.4.4** ★ Link budget cơ bản: cộng/trừ dB từ Tx đến Rx, margin. *(Interactive: Link Budget & OSNR Calculator)*

**★ Capstone Cấp 1:** Thiết kế một tuyến DWDM điểm–điểm 4 bước sóng, 2 span, tính power & OSNR đến máy thu.

---

## CẤP 2 — JUNIOR: Vận hành & thiết kế tuyến

### Module 2.1 — Link budget & OSNR budget chi tiết
Loss của connector/splice/filter/span; ASE tích lũy qua chuỗi EDFA; công thức OSNR chuỗi khuếch đại; system margin & aging.

### Module 2.2 — Tán sắc chi tiết
Chromatic dispersion (ps/nm/km), dispersion map, bù tán sắc DCF (lịch sử) vs bù số trong coherent; PMD & giới hạn tốc độ; dispersion slope.

### Module 2.3 — Khuếch đại nâng cao
EDFA gain tilt & transient, khuếch đại Raman (DRA) & hybrid, khuếch đại băng C+L, gain control (AGC/APC).

### Module 2.4 — ROADM
WSS, degree, add/drop; kiến trúc Colorless/Directionless/Contentionless (CDC); express vs local; broadcast-and-select vs route-and-select.

### Module 2.5 — Bộ thu phát & giao diện
Grey vs colored optics; transponder vs pluggable; DWDM tunable SFP+/QSFP; alien wavelength.

### Module 2.6 — Vận hành tuyến
Commissioning/turn-up, gain setup, power balancing, đọc alarm, troubleshoot suy hao/OSNR thấp.

**★ Capstone Cấp 2:** Thiết kế tuyến metro có 3 site ROADM, add/drop tại mỗi site, kiểm tra OSNR & filtering.

---

## CẤP 3 — SENIOR: Coherent & thiết kế hệ thống

### Module 3.1 — Coherent optics nền tảng
Vì sao coherent thay thế IMDD; điều chế BPSK/QPSK/16QAM/64QAM, phân cực kép (DP), constellation; máy thu coherent + DSP; bù CD/PMD bằng số. *(Interactive: Constellation & Modulation Explorer)*

### Module 3.2 — FEC & spectral efficiency
Hard vs soft-decision FEC, coding gain, giới hạn Shannon; baud (symbol rate) vs bits/symbol; probabilistic constellation shaping (PCS); vì sao 1 bước sóng đạt 400G→1.2T→1.6T.

### Module 3.3 — Hiệu ứng phi tuyến
SPM, XPM, FWM, SBS, SRS; mô hình GN/EGN; ngưỡng công suất tối ưu (nonlinear threshold); đánh đổi launch power ↔ OSNR.

### Module 3.4 — OSNR/GSNR engineering
Penalty (filtering, nonlinear, PMD); Generalized SNR (GSNR); required OSNR theo modulation; margin design & real-time margin.

### Module 3.5 — Thiết kế mạng mesh & phổ
Flexible grid, spectrum assignment, RWA/RSA, filtering penalty qua ROADM xếp tầng, guard band.

### Module 3.6 — Băng tần mở rộng
C+L band, Super-C, mở rộng phổ vs thêm sợi; kinh tế của L-band.

**★ Capstone Cấp 3:** Thiết kế mạng long-haul coherent đa span, chọn modulation/baud, tính GSNR & margin, tối ưu launch power.

---

## CẤP 4 — VETERAN: Kiến trúc, tối ưu & vận hành mạng

### Module 4.1 — Kiến trúc mạng hiện đại
IPoDWDM / IP-optical convergence; 400ZR, OpenZR+, 800ZR/ZR+ (chuẩn OIF & form factor QSFP-DD/OSFP); disaggregation & Open Line System (OLS); transponder tích hợp router.

### Module 4.2 — Điều khiển & tự động hóa
SDN cho optical; NETCONF/YANG, OpenConfig; control plane (GMPLS/PCE); streaming telemetry; intent-based & AI-assisted operations.

### Module 4.3 — Lớp OTN
ITU-T G.709: OTU/ODU/OPU, mapping & multiplexing, FEC OTN, FlexO; OTN switching — đủ sâu để SE hiểu và tư vấn.

### Module 4.4 — Bảo vệ & khả dụng
OMS/OCh protection, restoration, ASON, SRLG, mục tiêu 50 ms, availability & sợi dự phòng.

### Module 4.5 — Tối ưu & vận hành nâng cao
Margin harvesting & real-time SNR, nâng dung lượng không gián đoạn, fiber characterization (OTDR/OFDR), spectral monitoring, digital twin.

### Module 4.6 — Kinh tế mạng & tư duy SE
$/bit, W/bit, TCO & sustainability thật (không marketing); tư duy đọc RFP; xây BoM chuẩn kỹ thuật; chọn giải pháp theo ràng buộc khách hàng.

### Module 4.7 — Xu hướng & tương lai
Hollow-core fiber, 1.6T+/per-λ, photonic integration & co-packaged optics, mạng điều khiển bằng AI, an ninh quang (quantum-safe/QKD tổng quan).

**★ Capstone Cấp 4:** Đề xuất kiến trúc mạng backbone quốc gia: OLS + IPoDWDM + bảo vệ + tự động hóa, kèm lập luận kinh tế.

---

## Khu vực tham khảo (Reference — luôn mở)
- **Từ điển thuật ngữ** (Glossary song ngữ Việt–Anh).
- **Thư viện công cụ** (Calculators hub): dB converter, ITU Grid, Link Budget/OSNR, Constellation.
- **Chỉ mục tài liệu chuẩn & hãng**: ITU-T (G.652/G.694.1/G.709/G.798...), OIF (400ZR/800ZR), tài liệu public Nokia/Ciena/Infinera/Huawei/Cisco.

## Nguyên tắc nội dung (tự kiểm tra liên tục)
1. Mỗi con số/công thức phải truy được về chuẩn hoặc nguồn public — không bịa.
2. Mỗi khái niệm gắn với "vì sao nó quan trọng khi triển khai thật".
3. Trung lập hãng; khi nêu ví dụ hãng, ghi rõ nguồn.
4. Mỗi bài có: mục tiêu học, nội dung, hình/sơ đồ, ví dụ số, và (khi hợp lý) công cụ tương tác + quiz.
