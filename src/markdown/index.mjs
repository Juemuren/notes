import { unified } from "@astrojs/markdown-remark";

import { remarkInternalLinks } from "./remarkInternalLinks.mjs";
import { remarkObsidianCallouts } from "./remarkObsidianCallouts.mjs";

export const markdownProcessor = unified({
  remarkPlugins: [remarkObsidianCallouts, remarkInternalLinks],
});
