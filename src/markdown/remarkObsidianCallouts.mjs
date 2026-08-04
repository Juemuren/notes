const CALLOUT_MARKER = /^\[!(note|tip|caution)\]/;

function splitHeader(paragraph) {
  const title = [];
  const body = [];
  let inBody = false;

  for (const child of paragraph.children) {
    if (!inBody && child.type === "text") {
      const newline = child.value.indexOf("\n");

      if (newline !== -1) {
        const titleText = child.value.slice(0, newline);
        const bodyText = child.value.slice(newline + 1);

        if (titleText) title.push({ ...child, value: titleText });
        if (bodyText) body.push({ ...child, value: bodyText });
        inBody = true;
        continue;
      }
    }

    (inBody ? body : title).push(child);
  }

  return { title, body };
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
  ];

  if (body.length > 0) {
    children.push({ type: "paragraph", children: body });
  }

  children.push(...blockquote.children.slice(1));

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
