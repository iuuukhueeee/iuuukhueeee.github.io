import fs from 'fs'
import { join } from 'path'
import markdownToHtml from './markdownToHtml'

const postsDicr = join(process.cwd(), "posts")

export function getPostSlugs() {
  return fs.readdirSync(postsDicr)
}

export async function getPostBySlug(slug: string) {
  const fullPath = join(postsDicr, slug)
  const fileContents = fs.readFileSync(fullPath, 'utf-8')

  const html = await markdownToHtml(fileContents)

  return html
}

export function getAllPosts() {
  const slugs = getPostSlugs();

  return slugs
}

