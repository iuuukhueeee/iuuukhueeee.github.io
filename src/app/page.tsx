import { Fragment } from "react";

import { getAllPosts } from "./lib/api";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto">
      <main className="flex flex-col items-center justify-between m-12">
        <div className="text-center lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          <ul className="max-w-md space-y-1 list-none list-inside text-gray-300">
            {posts.map((post, i) => (
              <Fragment key={i}>
                <li className="py-5">
                  <Link href={`posts/${post.filename}`}>{post.title}</Link>
                </li>
                <hr></hr>
              </Fragment>
            ))}
          </ul>
        </div>
        <div className="inline-flex items-center justify-center w-full mt-10">
          <hr className="w-64 h-1 my-8  border-0 rounded bg-gray-700" />
          <div className="absolute px-4 -translate-x-1/2 left-1/2 bg-gray-900">
            <svg
              className="w-4 h-4 text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}
