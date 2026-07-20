import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          DWDM <span className={styles.heroTitleAccent}>Academy</span>
        </Heading>
        <div className={styles.spectrumBar} aria-hidden="true" />
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <p className={styles.heroLede}>
          Học DWDM như một <strong>kỹ sư</strong> — từ ánh sáng và sợi quang đến coherent,
          GSNR và kiến trúc mạng backbone. Gắn với triển khai thật, không marketing.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/hoc/intro">
            Bắt đầu học →
          </Link>
          <Link className="button button--secondary button--lg" to="/cong-cu">
            Thử công cụ tương tác
          </Link>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}><b>4</b><span>cấp độ</span></div>
          <div className={styles.statDivider} />
          <div className={styles.stat}><b>4</b><span>công cụ tương tác</span></div>
          <div className={styles.statDivider} />
          <div className={styles.stat}><b>ITU-T</b><span>làm gốc</span></div>
        </div>
      </div>
    </header>
  );
}

const LEVELS = [
  {n: '01', name: 'Fresher', to: '/hoc/level-1-fresher',
    desc: 'Ánh sáng, sợi, WDM/DWDM, dB/dBm, OSNR & link budget cơ bản. Đọc được sơ đồ tuyến điểm–điểm.'},
  {n: '02', name: 'Junior', to: '/hoc/level-2-junior',
    desc: 'Tự tính link/OSNR budget, tán sắc & khuếch đại chi tiết, ROADM, turn-up và troubleshoot.'},
  {n: '03', name: 'Senior', to: '/hoc/level-3-senior',
    desc: 'Coherent, DSP, FEC, hiệu ứng phi tuyến, GSNR engineering, thiết kế mesh & flexible grid.'},
  {n: '04', name: 'Veteran', to: '/hoc/level-4-veteran',
    desc: 'IPoDWDM/ZR+, open line system, tự động hoá, OTN, bảo vệ, và tư duy kinh tế mạng.'},
];

function Levels() {
  return (
    <section className={styles.levels}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Lộ trình 4 cấp độ</Heading>
        <p className={styles.sectionSub}>Mỗi cấp là một nấc năng lực rõ ràng — từ số 0 đến kiến trúc mạng.</p>
        <div className={styles.levelGrid}>
          {LEVELS.map((l) => (
            <Link key={l.n} to={l.to} className={styles.levelCard}>
              <span className={styles.levelNum}>{l.n}</span>
              <span className={styles.levelName}>{l.name}</span>
              <span className={styles.levelDesc}>{l.desc}</span>
              <span className={styles.levelArrow}>Vào cấp →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  {i: '◈', t: 'Chính xác, có nguồn', d: 'Mỗi công thức truy về chuẩn ITU-T; mỗi con số sản phẩm ghi rõ nguồn public của hãng.'},
  {i: '⇄', t: 'Tương tác thật', d: 'Bộ công cụ kéo–thả: dB converter, ITU Grid, Link Budget/OSNR, Constellation. Trực giác từ thao tác.'},
  {i: '⚙', t: 'Gắn triển khai', d: 'Mỗi khái niệm trả lời "để làm gì khi đi thật" — OSNR, sợi, khuếch đại, vận hành. Không spec-sheet engineering.'},
];

function Pillars() {
  return (
    <section className={styles.pillars}>
      <div className="container">
        <div className={styles.pillarGrid}>
          {PILLARS.map((p) => (
            <div key={p.t} className={styles.pillarCard}>
              <span className={styles.pillarIcon}>{p.i}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="DWDM Academy — học mạng truyền dẫn quang DWDM từ Fresher đến Veteran, trung lập về hãng, tương tác cao.">
      <HomepageHeader />
      <main>
        <Levels />
        <Pillars />
      </main>
    </Layout>
  );
}
