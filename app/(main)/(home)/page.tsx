"use server";

import NewPost from "@/components/post/new.post";
import React from "react";

export default async function Home() {
  // const userPosts = await getPosts();
  // console.log("post" + userPosts);
  return (
    <div className="flex flex-col items-start justify-start gap-5">
      <NewPost />

      {/* {userPosts?.map(async (data) => {
        const userLike = await getLike(data.post.post_id);
        const comments = (await getCommentByPostId(data.post.post_id)).json;
        // console.log(comments);
        // console.log();
        return (
          <Post
            key={data.post.post_id}
            like={userLike}
            author={data.author}
            info={data.post}
            cmts={comments}
            imgs={data.images.map((data) => data.url)}
          />
        );
      })} */}

      {/* {userPosts? } */}

      {/* <Post author={userInfo} imgs={true} />
      <Post author={userInfo} /> */}
    </div>
  );
}
