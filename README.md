# DWDM Academy

Website học DWDM (Dense Wavelength Division Multiplexing) **từ Fresher đến Veteran** — trung lập về hãng, gắn với triển khai thật, tương tác cao. Xây bằng [Docusaurus](https://docusaurus.io/).

> Trạng thái: **bản nháp v0.1 để review**. 5 bài mẫu đã hoàn chỉnh (chuẩn mực chất lượng), phần còn lại là khung + mục tiêu học, đang biên soạn tiếp.

## Nội dung đã có

- **Giáo trình 4 cấp** (Fresher → Junior → Senior → Veteran), xem `CURRICULUM.md` hoặc mục "Lộ trình học" trên site.
- **5 bài học hoàn chỉnh** làm chuẩn mực:
  - `1.1.1` Ánh sáng trong viễn thông (có sơ đồ suy hao sợi)
  - `1.1.4` dB, dBm & toán kỹ thuật quang (có bộ chuyển đổi tương tác)
  - `1.2.2` ITU-T G.694.1 DWDM Grid (có ITU Grid Explorer)
  - `1.4.4` Link budget & OSNR (có Link Budget/OSNR Calculator)
  - `3.1` Coherent optics & điều chế (có Constellation Explorer)
- **4 công cụ tương tác** tại trang `/cong-cu`.
- **Tham khảo**: từ điển thuật ngữ Việt–Anh, chỉ mục chuẩn ITU-T/OIF & tài liệu hãng.

## Chạy local

```bash
npm install
npm start          # dev server: http://localhost:3000/dwdm-academy/
```

## Build & deploy

```bash
npm run build      # xuất static ra thư mục build/
npm run serve      # xem thử bản build
```

### Trước khi deploy — sửa 3 chỗ trong `docusaurus.config.js`

```js
url: 'https://<github-username>.github.io',
baseUrl: '/<repo-name>/',          // ví dụ '/dwdm-academy/'
organizationName: '<github-username>',
projectName: '<repo-name>',
```

Đồng thời sửa các link `github.com/your-username/dwdm-academy` trong navbar/footer.

### Deploy tự động (đã cấu hình sẵn)

`.github/workflows/deploy.yml` tự build và deploy lên GitHub Pages mỗi khi push vào `main`.
Chỉ cần vào **Settings → Pages → Source → GitHub Actions** một lần để bật.

## Cấu trúc thư mục

```
docs/                     # nội dung bài học (theo cấp độ)
  level-1-fresher/ ...    # mỗi bài là 1 file .mdx
  reference/              # thuật ngữ, chỉ mục chuẩn
src/
  components/
    Callout.js            # hộp ghi chú
    LessonStub.js         # placeholder bài đang biên soạn
    interactive/          # 4 công cụ tương tác + Quiz
  pages/
    index.js              # trang chủ
    cong-cu.js            # thư viện công cụ
  theme/MDXComponents.js  # đăng ký component dùng trong .mdx
CURRICULUM.md             # giáo trình tổng thể (bản review)
```

## Thêm bài học mới

1. Tạo file `.mdx` trong thư mục cấp tương ứng, đặt `sidebar_position` ở front-matter.
2. Dùng component có sẵn (không cần import): `<Callout>`, `<Quiz>`, `<DbConverter>`, `<ItuGridExplorer>`, `<LinkBudgetCalculator>`, `<ConstellationExplorer>`.
3. Công thức toán viết bằng `$...$` (inline) hoặc `$$...$$` (block) — KaTeX render sẵn.

Lưu ý MDX: tránh viết `<` hoặc `>` trần trong văn bản (dùng "nhỏ hơn/lớn hơn" hoặc bọc trong `$...$`), vì MDX hiểu nhầm là thẻ JSX.

## Nguyên tắc nội dung

Mỗi con số/công thức truy được về chuẩn ITU-T hoặc nguồn public của hãng; trung lập hãng; mỗi khái niệm gắn với "để làm gì khi triển khai thật". Xem chi tiết cuối `CURRICULUM.md`.
