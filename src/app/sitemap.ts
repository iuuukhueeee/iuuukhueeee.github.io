import { MetadataRoute } from "next";
import { getAllPosts } from "./lib/api";

export const dynamic = "force-static";

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages: MetadataRoute.Sitemap = []

  const posts = getAllPosts();

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://hl11jp.github.io/posts/${post.filename}`,
    lastModified: post.date,
  }))
  return Promise.resolve([...defaultPages, ...blogPages]);
}