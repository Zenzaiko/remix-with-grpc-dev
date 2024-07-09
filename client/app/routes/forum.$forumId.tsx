import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "react-router";
import PostContents from "~/components/PostContents";
import PostEdit from "~/components/PostEdit";

export type PostContentsType = {
  id: number;
  name: string;
  comment: string;
};

export type PostsType = {
  forumId: number;
  subject_name: string;
  post_data: Array<PostContentsType>;
};

export const clientLoader = async ({ params }: LoaderFunctionArgs) => {
  const posts: PostsType = await fetch(
    `https://sample_domain/posts/${params.forumId}`
  ).then((res) => res.json());
  return posts;
};

export default function Forum() {
  const posts = useLoaderData<typeof clientLoader>();
  return (
    <>
      <div className="flex flex-col gap-32 items-center mt-8">
        <div className="w-8/12 border shadow">
          <div>
            <h1 className="text-2xl font-bold m-6">{posts.subject_name}</h1>
          </div>
          {posts.post_data.map((contents) => {
            return (
              <div key={contents.id}>
                <PostContents name={contents.name} comment={contents.comment} />
              </div>
            );
          })}
          <PostEdit forumId={1} />
        </div>
      </div>
    </>
  );
}
