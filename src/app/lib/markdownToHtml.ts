import rehypeFormat from "rehype-format";
import rehypeHighlight from "rehype-highlight";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import * as prod from 'react/jsx-runtime'

const production = {
  Fragment: prod.Fragment,
  jsx: prod.jsx,
  jsxs: prod.jsxs
  // sanitize: schema
}

export default async function markdownToHtml(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkFrontmatter)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(markdown)

  const filePreview = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeReact, production)
    .use(rehypeHighlight, { detect: true })
    .process(file)


  // const result = await remark().use(html).process(markdown)
  return filePreview.result
}