import type { StarlightUserConfig } from '@astrojs/starlight/types';

const GA_ID = "G-L8DZH6S9RF";

export const googleAnalytics = [
  {
    tag: "script",
    attrs: {
      async: true,
      src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
    },
  },
  {
    tag: "script",
    content: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    `,
  },
] satisfies StarlightUserConfig['head'];
