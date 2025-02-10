import { AuthForm } from "@/components/auth/form.auth";
import React from "react";

export const metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào Fast Connect",
};

export default function Page() {
  return <AuthForm />;
}
