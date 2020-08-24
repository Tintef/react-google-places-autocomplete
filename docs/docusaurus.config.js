const repo = 'https://github.com/tintef/react-google-places-autocomplete';

module.exports = {
  title: 'React Google Places Autocomplete',
  tagline: 'React component for easily use Google Places Autocomplete',
  url: 'https://tintef.github.io/',
  baseUrl: '/react-google-places-autocomplete/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'tintef', // Usually your GitHub org/user name.
  projectName: 'react-google-places-autocomplete', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'React Google Places Autocomplete',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        {
          href: repo,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `
        Copyright © ${new Date().getFullYear()} React Google Places Autocomplete, Tintef
        <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      `,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'basic-usage',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/tintef/react-google-places-autocomplete/edit/master/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
