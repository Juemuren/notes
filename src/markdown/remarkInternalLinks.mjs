const PROTOCOL_SCHEME = "[a-z][a-z\\d+.-]*:";
const PROTOCOL_RELATIVE = "//";
const ANCHOR_FRAGMENT = "#";
const EXCLUDE_LINK = new RegExp(`^(?:${PROTOCOL_SCHEME}|${PROTOCOL_RELATIVE}|${ANCHOR_FRAGMENT})`, "i");
const MARKDOWN_EXTENSION = /\.mdx?$/i;
const INDEX_DOCUMENT = /^index\.mdx?$/i;
const INDEX_ROUTE = /(?:^|\/)index\/$/i;

function isIndexPage(file) {
  return INDEX_DOCUMENT.test(file.basename ?? "");
}

function markdownPathToRoute(pathname, indexPage) {
  const sourcePath = indexPage || pathname.startsWith("/") ? pathname : `../${pathname}`;

  return sourcePath.replace(MARKDOWN_EXTENSION, "/").replace(INDEX_ROUTE, "/").toLowerCase();
}

function splitUrl(url) {
  const suffixIndex = url.search(/[?#]/);
  if (suffixIndex === -1) return { pathname: url, suffix: "" };

  return {
    pathname: url.slice(0, suffixIndex),
    suffix: url.slice(suffixIndex),
  };
}

function rewriteInternalLink(url, indexPage) {
  if (EXCLUDE_LINK.test(url)) return url;

  const { pathname, suffix } = splitUrl(url);

  if (!MARKDOWN_EXTENSION.test(pathname)) return url;

  return markdownPathToRoute(pathname, indexPage) + suffix;
}

function rewriteLinks(node, rewriteUrl) {
  if (node.type === "link") {
    node.url = rewriteUrl(node.url);
  }

  node.children?.forEach((child) => rewriteLinks(child, rewriteUrl));
}

export function remarkInternalLinks() {
  return (tree, file) => {
    const indexPage = isIndexPage(file);
    rewriteLinks(tree, (url) => rewriteInternalLink(url, indexPage));
  };
}
