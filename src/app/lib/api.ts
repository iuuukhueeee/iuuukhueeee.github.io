import fs from 'fs'
import { join } from 'path'
import markdownToHtml from './markdownToHtml'

const postsDicr = join(process.cwd(), "posts")

export function getPostSlugs() {
  let files = fs.readdirSync(postsDicr)

  files.sort((a, b) => {
    return fs.statSync(postsDicr + '/' + b).mtime.getTime() - fs.statSync(postsDicr + '/' + a).mtime.getTime()
  })

  return files

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

