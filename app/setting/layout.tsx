import { getSession } from "@/action/auth";
import InvalidToken from "@/components/auth/logout";
import { UserProvider } from "@/components/context/user.context";
import MessageBox from "@/components/message/message.box";
import MessageFind from "@/components/message/message.find";
import LeftNavigation from "@/components/nav/left.nav";
import TopNavigation from "@/components/nav/top.nav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

// import NotificationListen from "@/components/Notification.Listen";
import React from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookie = await cookies();
  const session = await getSession();

  if (!("user_id" in session)) return <InvalidToken />;
  if (!session.user) redirect("/login");

  const user = session.user;

  if (user)
    return (
      <UserProvider value={user}>
        <TopNavigation className="fixed top-0 z-50 flex" />

        {/* <TopNavigationCollapse className="z-50 top-0 fixed flex md:hidden" /> */}

        <div className="mt-20 flex min-h-screen w-full items-start gap-4 px-5">
          <SidebarProvider>
            <main>
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </div>
        {/* <NotificationListen /> */}
      </UserProvider>
    );

  return <InvalidToken />;
}
