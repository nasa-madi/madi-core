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

  // Set the production url of your site here
  url: 'https://nasa-madi.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/madi-core/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'nasa-madi.github.io', // Usually your GitHub org/user name.
  projectName: 'madi-core', // Usually your repo name.

  onBrokenLinks:'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
           /* other docs plugin options */
      
          // sidebarPath: './sidebars.ts',
          // // Please change this to your repo.
          // // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/nasa-madi/madi-core/tree/main/madi/docs/generator',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      hideOnScroll: true,
      title: 'MADI',
      logo: {
        alt: 'MADI Logo',
        src: 'img/logo.png',
      },
      items: [
      //   {
      //     type: 'docSidebar',
      //     sidebarId: 'tutorialSidebar',
      //     position: 'left',
      //     label: 'Overiew',
      //   },
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
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Tutorial',
        //       to: '/dintro',
        //     },
        //   ],
        // },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/nasa-madi',
        //     },
        //     // {
        //     //   label: 'Discord',
        //     //   href: 'https://discordapp.com/invite/docusaurus',
        //     // },
        //     // {
        //     //   label: 'Twitter',
        //     //   href: 'https://twitter.com/docusaurus',
        //     // },
        //   ],
        // },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/nasa-madi/madi-core',
            },
          ],
        },
      ],
      //@ts-ignore
      // copyright: `Built with Docusaurus.`,
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
