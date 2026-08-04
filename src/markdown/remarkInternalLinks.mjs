const PROTOCOL_SCHEME = "[a-z][a-z\\d+.-]*:";
const PROTOCOL_RELATIVE = "//";
const ANCHOR_FRAGMENT = "#";
const EXCLUDE_LINK = new RegExp(`^(?:${PROTOCOL_SCHEME}|${PROTOCOL_RELATIVE}|${ANCHOR_FRAGMENT})`, "i");
const MARKDOWN_EXTENSION = /\.mdx?$/i;

function rewriteInternalLink(url) {
  if (EXCLUDE_LINK.test(url)) return url;

  const suffixIndex = url.search(/[?#]/);
  const hasSuffix = suffixIndex !== -1;
  const pathname = hasSuffix ? url.slice(0, suffixIndex) : url;
  const suffix = hasSuffix ? url.slice(suffixIndex) : "";

  const route = pathname.replace(MARKDOWN_EXTENSION, "").toLowerCase();
  return route + suffix;
}

function rewriteLinksInTree(node) {
  if (node.type === "link") {
    node.url = rewriteInternalLink(node.url);
  }

  if (!Array.isArray(node.children)) return;

  for (const child of node.children) {
    rewriteLinksInTree(child);
  }
}

export function remarkInternalLinks() {
  return rewriteLinksInTree;
}
