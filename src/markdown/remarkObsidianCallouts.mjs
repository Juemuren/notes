const CALLOUT_MARKER = /^\[!(note|tip|caution)\]/;

function splitHeader(paragraph) {
  const { children } = paragraph;
  const separatorIndex = children.findIndex(
    (child) => child.type === "text" && child.value.includes("\n"),
  );

  if (separatorIndex === -1) {
    return { title: children, body: [] };
  }

  const separator = children[separatorIndex];
  const newlineIndex = separator.value.indexOf("\n");
  const titleText = separator.value.slice(0, newlineIndex);
  const bodyText = separator.value.slice(newlineIndex + 1);

  return {
    title: [
      ...children.slice(0, separatorIndex),
      ...(titleText ? [{ ...separator, value: titleText }] : []),
    ],
    body: [
      ...(bodyText ? [{ ...separator, value: bodyText }] : []),
      ...children.slice(separatorIndex + 1),
    ],
  };
}

function toAside(blockquote) {
  const header = blockquote.children[0];
  if (header?.type !== "paragraph") return;

  const marker = header.children[0];
  if (marker?.type !== "text") return;

  const match = marker.value.match(CALLOUT_MARKER);
  if (!match) return;

  marker.value = marker.value.slice(match[0].length).trimStart();

  const { title, body } = splitHeader(header);
  const children = [
    {
      type: "paragraph",
      data: { directiveLabel: true },
      children: title,
    },
    ...(body.length > 0 ? [{ type: "paragraph", children: body }] : []),
    ...blockquote.children.slice(1),
  ];

  return {
    type: "containerDirective",
    name: match[1],
    attributes: {},
    children,
  };
}

function transformCalloutsInTree(node) {
  if (Array.isArray(node.children)) {
    node.children = node.children.map(transformCalloutsInTree);
  }

  if (node.type === "blockquote") {
    return toAside(node) ?? node;
  }

  return node;
}

export function remarkObsidianCallouts() {
  return transformCalloutsInTree;
}
