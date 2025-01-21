import { getCommentByPostId } from "@/action/Comment";
import { getLike } from "@/action/Like";
import { getPosts } from "@/action/Post";
import Post from "@/components/custom/post/Post";
import React from "react";

export default async function page({ params }) {
  // console.log(params);
  const { id } = params;
  const post = await getPosts(id);
  const userLike = await getLike(post.post.post_id);
  const comments = (await getCommentByPostId(post.post.post_id)).json;
  // console.log(post);
  return (
    <Post
      info={post.post}
      like={userLike}
      cmts={comments}
      author={post.author}
      imgs={post.images.map((data) => data.url)}
    />
  );
}
