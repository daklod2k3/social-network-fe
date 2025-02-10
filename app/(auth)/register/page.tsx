import { AuthForm } from "@/components/auth/form.auth";
import React from "react";

export const metadata = {
  title: "Đăng ký",
  description: "Đăng ký tài khoản Fast Connect mới",
};

export default function Page() {
  return <AuthForm isLogin={false} />;
}
