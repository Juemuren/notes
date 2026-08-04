// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: 'https://juemuren.github.io',
  base: 'notes',
  integrations: [
    starlight({
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      title: "笔记",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/juemuren/notes",
        },
      ],
    }),
  ],
});
