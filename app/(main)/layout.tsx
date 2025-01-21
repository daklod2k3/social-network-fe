import { getSession } from "@/action/auth";
import InvalidToken from "@/components/auth/logout";
import { UserProvider } from "@/components/context/user.context";
import MessageBox from "@/components/message/message.box";
import MessageFind from "@/components/message/message.find";
import LeftNavigation from "@/components/nav/left.nav";
import TopNavigation from "@/components/nav/top.nav";
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
      <UserProvider value={{ user }}>
        <TopNavigation className="fixed top-0 z-50 flex" />

        {/* <TopNavigationCollapse className="z-50 top-0 fixed flex md:hidden" /> */}

        <div className="mt-20 flex min-h-screen w-full items-start gap-4 px-5">
          <LeftNavigation
            className={
              "h-[calc(100vh - 5rem)] sticky top-20 z-40 ml-5 mr-16 hidden w-1/6"
            }
          />
          <main className="flex w-2/5 basis-auto flex-col items-center justify-center pb-5 *:w-full max-md:w-full">
            {children}
          </main>
          <div className="h-[calc(100vh - 5rem)] sticky top-20 z-40 flex grow flex-col gap-4 max-md:hidden">
            <MessageFind className="w-full max-w-80" />
            {/* <LeftSide className="z-50 w-1/4 left-24 fixed top-24"/> */}
            <div className="fixed bottom-0 right-8 flex w-full flex-row justify-end gap-3">
              {/* <MessageBox
                className="w-full max-w-80"
                author={await getPeopleInfo(4)}
              /> */}
              {/* <MessageBox
                className="w-full max-w-80"
                author={await getPeopleInfo(4)}
              /> */}
            </div>
          </div>
        </div>
        {/* <NotificationListen /> */}
      </UserProvider>
    );

  return <InvalidToken />;
}
