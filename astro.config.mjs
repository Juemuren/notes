// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import mermaid from "astro-mermaid";

import { jq, ignore } from "./src/syntaxes/index.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://juemuren.github.io",
  base: "notes",
  integrations: [
    mermaid(),
    starlight({
      expressiveCode: {
        shiki: {
          langs: [jq, ignore],
        },
      },
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN",
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
