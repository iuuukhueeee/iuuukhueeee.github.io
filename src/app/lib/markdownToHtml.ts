import rehypeFormat from "rehype-format";
import rehypeHighlight from "rehype-highlight";
import rehypeReact from "rehype-react";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import * as prod from "react/jsx-runtime";
import rehypeRaw from 'rehype-raw'

const production = {
  Fragment: prod.Fragment,
  jsx: prod.jsx,
  jsxs: prod.jsxs,
  // sanitize: schema
};

export default async function markdownToHtml(markdown: string) {
  const filePreview = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeFormat)
    .use(rehypeHighlight, { detect: true })
    .use(rehypeReact, production)
    .process(markdown);

  return filePreview.result;
}
