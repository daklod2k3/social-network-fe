import { ApiRoutes } from "@/action/api";
import { Feed, Post } from "@/entity/document";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useFeed() {
  const data = useSWR("api/" + ApiRoutes.Feed, fetcher, {
    revalidateOnMount: true,
  });
  return {
    ...data,
    data: data.data,
  };
}
