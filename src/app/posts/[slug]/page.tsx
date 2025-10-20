import {
  getPostBySlug,
  getPostBySlugWithMetadata,
  getPostSlugs,
} from "@/app/lib/api";
import markdownStyles from "./markdown-styles.module.css";
import { Inter } from "next/font/google";
import "github-markdown-css/github-markdown-dark.css";
import 'highlight.js/styles/github-dark.css';

const inter = Inter({ subsets: ["latin"], weight: ["700"], style: ["normal"] });

export async function generateStaticParams() {
  const slugs = getPostSlugs();

  return slugs.map((slug) => ({
    slug: slug.filename,
  }));
}

export default async function Post(props: Params) {
  const { slug } = await props.params;

  const post = await getPostBySlug(slug);
  return (
    <div
      className={
        "flex justify-center items-center my-5 md:my-20 mx-6 md:mx-20" + inter.className
      }
    >
      <div className="w-full max-w-prose md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        {/* <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: post }}
        ></div> */}
        <article
          className={["markdown-body", markdownStyles["markdown"]].join(" ")}
        >
          {post}
        </article>
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

export async function generateMetadata(props: Params) {
  const { slug } = await props.params;
  const fileName = slug + ".md"

  const metadata = await getPostBySlugWithMetadata(fileName);

  return {
    title: `${metadata.title} —— iuuukhueeee`,
    description: metadata.description,
  };
}
