import { getPostBySlug, getPostSlugs } from "@/app/lib/api";
import markdownStyles from "./markdown-styles.module.css";
import { Inter } from "next/font/google";
import 'github-markdown-css/github-markdown-dark.css'

const inter = Inter({ subsets: ["latin"], weight: ["700"], style: ["normal"] });

export async function generateStaticParams() {
  const slugs = getPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function Post(props: Params) {
  const { slug } = await props.params;

  const post = await getPostBySlug(slug);
  return (
    <div className={"flex justify-center items-center mt-20 mx-6 md:mx-20" + inter.className}>
      <div className="max-w-6xl">
        {/* <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: post }}
        ></div> */}
        <div className={['markdown-body', markdownStyles["markdown"]].join(' ')}>
          {post}
        </div>
      </div>
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
