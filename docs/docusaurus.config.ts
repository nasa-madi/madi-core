import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
// import * as prismStuff from './node_modules/@docusaurus/preset-classic/node_modules/@docusaurus/theme-classic/node_modules/prismjs/components'


const config: Config = {
  title: 'MADI',
  tagline: 'Modular AI for Innovation and Design',
  favicon: 'img/favicon.ico',
  noIndex: true,
  trailingSlash: false,
  url: 'https://nasa-madi.github.io',
  baseUrl: '/madi-core/',
  organizationName: 'nasa-madi.github.io',
  projectName: 'madi-core', 
  onBrokenLinks:'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  themeConfig: {
    metadata: [
      {name: 'theme-color', content: '#317EFB'}, // Example theme color
      {name: 'apple-mobile-web-app-capable', content: 'yes'},
      {name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent'},
      {
        name: 'apple-mobile-web-app-title',
        content: 'Your App Title',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/madi-core/img/icons/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/madi-core/img/icons/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/madi-core/img/icons/favicon-16x16.png',
      },
      {
        rel: 'manifest',
        href: '/madi-core/img/site.webmanifest',
      },
    ],
    navbar: {
      hideOnScroll: true,
      title: 'MADI',
      logo: {
        alt: 'MADI Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          href: 'https://github.com/nasa-madi/madi-core',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/nasa-madi/madi-core',
            },
          ],
        },
      ]
    },
    prism: {
      defaultLanguage: 'bash',
      additionalLanguages: ['javascript','markdown','bash','python','typescript','json'],
      magicComments: [],
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
