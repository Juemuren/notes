const CALLOUT_MARKER = /^\[!(note|tip|caution)\]/;

function splitHeader(paragraph) {
  const { children } = paragraph;
  const lineBreakIndex = children.findIndex(
    (child) => child.type === "text" && child.value.includes("\n"),
  );

  if (lineBreakIndex === -1) {
    return { title: children, body: [] };
  }

  const lineBreak = children[lineBreakIndex];
  const newlineIndex = lineBreak.value.indexOf("\n");
  const title = children.slice(0, lineBreakIndex);
  const body = children.slice(lineBreakIndex + 1);

  const titleText = lineBreak.value.slice(0, newlineIndex);
  if (titleText) title.push({ ...lineBreak, value: titleText });

  const bodyText = lineBreak.value.slice(newlineIndex + 1);
  if (bodyText) body.unshift({ ...lineBreak, value: bodyText });

  return { title, body };
}

function parseCallout(blockquote) {
  const header = blockquote.children[0];
  if (header?.type !== "paragraph") return;

  const marker = header.children[0];
  if (marker?.type !== "text") return;

  const match = marker.value.match(CALLOUT_MARKER);
  if (!match) return;

  marker.value = marker.value.slice(match[0].length).trimStart();

  return {
    name: match[1],
    header,
    content: blockquote.children.slice(1),
  };
}

function transformCallout(blockquote) {
  const callout = parseCallout(blockquote);
  if (!callout) return;

  const { title, body } = splitHeader(callout.header);
  const label = {
    type: "paragraph",
    data: { directiveLabel: true },
    children: title,
  };
  const children = [label];

  if (body.length > 0) children.push({ type: "paragraph", children: body });
  children.push(...callout.content);

  return {
    type: "containerDirective",
    name: callout.name,
    attributes: {},
    children,
  };
}

function transformCallouts(node) {
  if (Array.isArray(node.children)) {
    node.children = node.children.map(transformCallouts);
  }

  if (node.type === "blockquote") {
    return transformCallout(node) ?? node;
  }

  return node;
}

export function remarkObsidianCallouts() {
  return (tree) => {
    transformCallouts(tree);
  };
}
