import { getPostBySlug, getPostSlugs } from "@/app/lib/api";

export async function generateStaticParams() {
  const slugs = getPostSlugs();

  return slugs.map((slug) => ({
    slug
  }));
}

export default async function Post(props: Params) {
  const { slug } = await props.params;

  const post = await getPostBySlug(slug);
  return (
    <div className="flex justify-center items-center mt-20 max-w-2xl mx-auto">
      <div dangerouslySetInnerHTML={{ __html: post }}></div>
    </div>
  );
}

type Params = {
  // why this must include Promise?
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  // https://nextjs.org/docs/app/api-reference/functions/generate-static-params
  params: Promise<{
    slug: string;
  }>;
};
