import { getSession } from "@/action/auth";
import CreateProfileForm from "@/components/create-profile.form";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Tạo thông tin cá nhân",
  description: "Tạo thông tin cá nhân để bắt đầu sử dụng dịch vụ",
};

export default async function Page() {
  const user = await getSession();
  if ('access_token' in user) {
    redirect("/");
  }

  return <CreateProfileForm />;
}
