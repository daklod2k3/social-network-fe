"use server";

import { cookies } from "next/headers";
import { ApiAuth, ApiRoutes } from "./api";

export async function createPost(imageNames: string[], body: string) {
  const res = await new ApiAuth(await cookies(), ApiRoutes.Post).post({
    content: body,
    images: imageNames,
  });
  console.log(res);

  if (res.status === 200) return await res.json();
  else {
    return {
      error: "Kết nối đến máy chủ thất bại",
    };
  }
}
