// @ts-check
import starlight from "@astrojs/starlight";
import mermaid from "astro-mermaid";
import { defineConfig } from "astro/config";

import { markdownProcessor } from "./src/markdown/index.mjs";
import { ignore, jq } from "./src/syntaxes/index.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://juemuren.github.io",
  base: "notes",
  markdown: {
    processor: markdownProcessor,
  },
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
