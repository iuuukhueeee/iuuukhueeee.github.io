export const dynamic = "force-static";

import { getPostBySlugWithMetadata, getPostSlugs } from "@/app/lib/api";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function generateStaticParams() {
  const slugs = getPostSlugs();

  return slugs.map((slug) => ({
    slug: slug.filename,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const fileName = slug + ".md";

  const metadata = await getPostBySlugWithMetadata(fileName);

  const post = {
    title: `${metadata.title} —— iuuukhueeee`,
    description: metadata.description,
  };

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        👋 {post.title}
      </div>
    ),
    {
      ...size,
    }
  );
}
