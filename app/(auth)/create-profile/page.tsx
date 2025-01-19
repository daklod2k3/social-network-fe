import { getSession } from "@/action/auth";
import CreateProfileForm from "@/components/create-profile.form";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const user = await getSession();
  if (user.data) {
    redirect("/");
  }

  return <CreateProfileForm />;
}
