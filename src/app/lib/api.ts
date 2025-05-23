import fs from 'fs'
import { join } from 'path'
import markdownToHtml from './markdownToHtml'
import matter from 'gray-matter'
import getMetadata from './getMetadata'

const postsDicr = join(process.cwd(), "posts")

export function getPostSlugs() {
  let files = fs.readdirSync(postsDicr)

  const posts = files.map((filename) => {
    const fullPath = join(postsDicr, filename)

    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    const { data } = matter(fileContents)

    return {
      filename: filename,
      title: data.title,
      date: data.createdAt ? new Date(data.createdAt) : new Date(0)
    }
  })

  posts.sort((a, b) => b.date.getTime() - a.date.getTime());

  return posts

}

export async function getPostBySlug(slug: string) {
  const fullPath = join(postsDicr, slug)
  const fileContents = fs.readFileSync(fullPath, 'utf-8')

  const html = await markdownToHtml(fileContents)

  return html
}

export async function getPostBySlugWithMetadata(slug: string) {
  const fullPath = join(postsDicr, slug)
  const fileContents = fs.readFileSync(fullPath, 'utf-8')

  const metadata = await getMetadata(fileContents)

  return metadata

}

export function getAllPosts() {
  const slugs = getPostSlugs();

  return slugs
}

