import React from 'react';
import Layout from '@theme/Layout';
import DbConverter from '@site/src/components/interactive/DbConverter';
import ItuGridExplorer from '@site/src/components/interactive/ItuGridExplorer';
import LinkBudgetCalculator from '@site/src/components/interactive/LinkBudgetCalculator';
import ConstellationExplorer from '@site/src/components/interactive/ConstellationExplorer';
import NonlinearOptimizer from '@site/src/components/interactive/NonlinearOptimizer';
import CascadedFilterPenalty from '@site/src/components/interactive/CascadedFilterPenalty';
import OtnMapper from '@site/src/components/interactive/OtnMapper';

export default function CongCu() {
  return (
    <Layout title="Công cụ" description="Thư viện công cụ tương tác DWDM: dB converter, ITU Grid, Link Budget/OSNR, Constellation.">
      <main className="container margin-vert--lg">
        <h1>Thư viện công cụ tương tác</h1>
        <p style={{maxWidth: 720, color: 'var(--ifm-color-emphasis-700)'}}>
          Bốn công cụ dưới đây là cùng bộ dùng trong bài học. Trực giác kỹ thuật đến từ việc
          tự kéo thanh trượt và nhìn con số thay đổi — không phải học thuộc công thức.
        </p>

        <h2 id="db">1. Bộ chuyển đổi dBm ↔ mW</h2>
        <p>Nền tảng của mọi phép tính quang. Xem bài <a href="/hoc/level-1-fresher/1-1-4-db-dbm">1.1.4</a>.</p>
        <DbConverter />

        <h2 id="itu">2. ITU-T G.694.1 Grid Explorer</h2>
        <p>Tính tần số ↔ bước sóng của bất kỳ kênh nào. Xem bài <a href="/hoc/level-1-fresher/1-2-2-itu-grid">1.2.2</a>.</p>
        <ItuGridExplorer />

        <h2 id="linkbudget">3. Link Budget & OSNR Calculator</h2>
        <p>Công cụ chủ lực: tính OSNR chuỗi span và margin theo modulation. Xem bài <a href="/hoc/level-1-fresher/1-4-4-link-budget">1.4.4</a>.</p>
        <LinkBudgetCalculator />

        <h2 id="constellation">4. Constellation & Modulation Explorer</h2>
        <p>Đánh đổi dung lượng ↔ khoảng cách trong coherent. Xem bài <a href="/hoc/level-3-senior/3-1-coherent">3.1</a>.</p>
        <ConstellationExplorer />

        <h2 id="nonlinear">5. Tối ưu launch power ↔ phi tuyến (GSNR)</h2>
        <p>Điểm ngọt của launch power: OSNR vs phi tuyến, GSNR đỉnh, margin theo modulation (Cấp 3).</p>
        <NonlinearOptimizer />

        <h2 id="filter">6. Filtering penalty qua ROADM xếp tầng</h2>
        <p>Passband hẹp dần qua nhiều ROADM/WSS và ảnh hưởng lên tín hiệu baud cao (Cấp 2–3).</p>
        <CascadedFilterPenalty />

        <h2 id="otn">7. OTN mapper (G.709)</h2>
        <p>Client được ánh xạ vào container OPU/ODU/OTU và line rate nào (Cấp 4).</p>
        <OtnMapper />
      </main>
    </Layout>
  );
}
