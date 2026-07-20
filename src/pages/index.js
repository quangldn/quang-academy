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
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.heroLede}>
          Học DWDM như một <strong>kỹ sư</strong> — từ ánh sáng và sợi quang đến coherent,
          GSNR và kiến trúc mạng backbone. Trung lập về hãng, gắn với triển khai thật,
          không marketing.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/hoc/intro">
            Bắt đầu học →
          </Link>
          <Link className="button button--secondary button--lg" to="/cong-cu" style={{marginLeft: 12}}>
            Thử công cụ tương tác
          </Link>
        </div>
      </div>
    </header>
  );
}

const LEVELS = [
  {
    tag: 'Cấp 1', name: 'Fresher', to: '/hoc/level-1-fresher',
    desc: 'Ánh sáng, sợi, WDM/DWDM, dB/dBm, OSNR & link budget cơ bản. Đọc được sơ đồ tuyến điểm–điểm.',
  },
  {
    tag: 'Cấp 2', name: 'Junior', to: '/hoc/level-2-junior',
    desc: 'Tự tính link/OSNR budget, tán sắc & khuếch đại chi tiết, ROADM, turn-up và troubleshoot.',
  },
  {
    tag: 'Cấp 3', name: 'Senior', to: '/hoc/level-3-senior',
    desc: 'Coherent, DSP, FEC, hiệu ứng phi tuyến, GSNR engineering, thiết kế mesh & flexible grid.',
  },
  {
    tag: 'Cấp 4', name: 'Veteran', to: '/hoc/level-4-veteran',
    desc: 'IPoDWDM/ZR+, open line system, tự động hoá, OTN, bảo vệ, và tư duy kinh tế mạng.',
  },
];

function Levels() {
  return (
    <section className={styles.levels}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Lộ trình 4 cấp độ</Heading>
        <div className={styles.levelGrid}>
          {LEVELS.map((l) => (
            <Link key={l.tag} to={l.to} className={styles.levelCard}>
              <span className={styles.levelTag}>{l.tag}</span>
              <span className={styles.levelName}>{l.name}</span>
              <span className={styles.levelDesc}>{l.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  {t: 'Chính xác, có nguồn', d: 'Mỗi công thức truy về chuẩn ITU-T; mỗi con số sản phẩm ghi rõ nguồn public của hãng.'},
  {t: 'Tương tác thật', d: 'Bộ công cụ kéo–thả: dB converter, ITU Grid, Link Budget/OSNR, Constellation. Trực giác từ thao tác.'},
  {t: 'Gắn triển khai', d: 'Mỗi khái niệm trả lời "để làm gì khi đi thật" — OSNR, sợi, khuếch đại, vận hành. Không spec-sheet engineering.'},
];

function Pillars() {
  return (
    <section className={styles.pillars}>
      <div className="container">
        <div className={styles.pillarGrid}>
          {PILLARS.map((p) => (
            <div key={p.t} className={styles.pillarCard}>
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
