"use client";
import useFeed from "@/hooks/news_feed/use-feed";
import React from "react";
import PostSkeleton from "../post/post.skeleton";

export default function FeedList() {
  const { data, isLoading } = useFeed();

  if (isLoading) return <PostSkeleton />;
  console.log(data);

  return <div>FeedList</div>;
}
