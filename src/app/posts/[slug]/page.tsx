import { getPostBySlug } from "@/app/lib/api";
import markdownToHtml from "@/app/lib/markdownToHtml";

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
  params: Promise<{
    slug: string;
  }>;
};
