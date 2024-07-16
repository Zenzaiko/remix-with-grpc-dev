import type { PartialMessage } from "@bufbuild/protobuf";
import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "react-router";
import { ForumReq } from "services/forum_connect";
import type { Forum as ForumType, Req } from "services/forum_pb";
import MessageBox from "~/components/MessageBox";
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

// export const clientLoader = async ({ params }: LoaderFunctionArgs) => {
//   const posts: PostsType = await fetch(
//     `https://sample_domain/posts/${params.forumId}`
//   ).then((res) => res.json());
//   return posts;
// };
export const clientLoader = async ({ params }: LoaderFunctionArgs) => {
  const transport = createGrpcWebTransport({
    baseUrl: "http://localhost:50051",
  });
  const client = createPromiseClient(ForumReq, transport);

  // PartialMessageを使用してリクエストメッセージのオブジェクトを定義
  const forumId = params?.forumId || "0";
  const req: PartialMessage<Req> = { forumId };

  const forumData: ForumType = await client.getMsg(req);
  const postData = forumData?.postData || [];
  return postData;
};

export default function Forum() {
  const postData = useLoaderData<typeof clientLoader>();
  return (
    <>
      <div className="flex flex-col items-center mt-8 mb-8">
        <div className="w-8/12 border shadow">
          <div className="h-96 p-6">
            <div className="w-full h-full bg-zinc-100 opacity-75">image</div>
          </div>
          <div className="flex flex-col gap-4 px-4">
            {postData.map((contents, index) => {
              if (index % 2 === 0) {
                return (
                  <div key={contents.id} className="w-full flex justify-start">
                    <div className="w-8/12">
                      <MessageBox
                        name={contents.name}
                        comment={contents.comment}
                      />
                    </div>
                  </div>
                );
              }
              return (
                <div key={contents.id} className="w-full flex justify-end">
                  <div className="w-8/12">
                    <MessageBox
                      name={contents.name}
                      comment={contents.comment}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <PostEdit forumId={1} />
        </div>
      </div>
    </>
  );
}
