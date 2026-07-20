// @ts-check
// DWDM Academy — Docusaurus config
// Cập nhật `url`, `baseUrl`, `organizationName`, `projectName` cho repo GitHub Pages của bạn.

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DWDM Academy',
  tagline: 'Từ Fresher đến Veteran — làm chủ mạng truyền dẫn quang DWDM',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  // === Cấu hình deploy GitHub Pages — SỬA cho repo của bạn ===
  // Ví dụ repo: https://github.com/<user>/dwdm-academy
  url: 'https://quangldn.github.io',
  baseUrl: '/quang-academy/',
  organizationName: 'quangldn',
  projectName: 'quang-academy',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // KaTeX CSS + fonts hiện đại (Photonic theme)
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+',
      crossorigin: 'anonymous',
    },
  ],
  headTags: [
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'}},
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'}},
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
      },
    },
  ],

  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'hoc',
          editUrl: 'https://github.com/quangldn/quang-academy/tree/main/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'DWDM Academy',
        logo: {
          alt: 'DWDM Academy',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'courseSidebar',
            position: 'left',
            label: 'Lộ trình học',
          },
          {to: '/cong-cu', label: 'Công cụ', position: 'left'},
          {to: '/ban-do', label: 'Bản đồ', position: 'left'},
          {to: '/hoc/reference/glossary', label: 'Thuật ngữ', position: 'left'},
          {
            href: 'https://github.com/quangldn/quang-academy',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Học',
            items: [
              {label: 'Lộ trình', to: '/hoc/intro'},
              {label: 'Cấp 1 — Fresher', to: '/hoc/level-1-fresher/1-1-1-anh-sang'},
              {label: 'Cấp 3 — Senior', to: '/hoc/level-3-senior/3-1-coherent'},
            ],
          },
          {
            title: 'Công cụ',
            items: [
              {label: 'ITU Grid Explorer', to: '/cong-cu'},
              {label: 'Link Budget / OSNR', to: '/cong-cu'},
            ],
          },
          {
            title: 'Chuẩn tham khảo',
            items: [
              {label: 'ITU-T G.694.1 (DWDM grid)', href: 'https://www.itu.int/rec/T-REC-G.694.1/'},
              {label: 'ITU-T G.652 (SMF)', href: 'https://www.itu.int/rec/T-REC-G.652/'},
              {label: 'ITU-T G.709 (OTN)', href: 'https://www.itu.int/rec/T-REC-G.709/'},
            ],
          },
        ],
        copyright: `DWDM Academy — nội dung học tập trung lập về hãng. Xây dựng ${new Date().getFullYear()}.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
