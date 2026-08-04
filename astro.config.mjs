// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: 'https://juemuren.github.io/notes/',
  integrations: [
    starlight({
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
