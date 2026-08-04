import { unified } from "@astrojs/markdown-remark";

import { remarkInternalLinks } from "./remarkInternalLinks.mjs";

export const markdownProcessor = unified({
  remarkPlugins: [remarkInternalLinks],
});
