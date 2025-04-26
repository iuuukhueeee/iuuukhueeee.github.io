import matter from "gray-matter";

export default async function getMetadata(markdown: string) {
  const { data } = matter(markdown);

  return data

}