"use client";
import { Post } from "@/entity/document";
import { createContext } from "react";

export const PostContext = createContext<Post | undefined>(undefined);
export const PostProvider = ({
  children,
  value,
}: typeof PostContext.Provider.arguments) => {
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
