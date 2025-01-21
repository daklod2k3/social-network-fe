import PostSkeleton from "@/components/post/post.skeleton";
import React from "react";

export default function loading() {
  return (
    <div className="gap-3 flex w-full flex-col">
      {/* <NewPost className/> */}
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      {/* <PostSkeleton /> */}
    </div>
  );
}
