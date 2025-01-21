"use client";
import {
  Bell,
  Earth,
  LogOut,
  MessageCircleMore,
  Search,
  University,
} from "lucide-react";
import React, {
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// import { subNotification } from "@/action/Notification";
import { cn } from "@/lib/utils";
// import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AvatarWithName from "../avatar.with.name";
import { UserContext } from "../context/user.context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

const iconSize = 20;

export default function TopNavigation({
  className,
}: React.ComponentProps<"div">) {
  // console.log(info);
  // const { toast } = useToast();

  const router = useRouter();
  const user = useContext(UserContext);

  if (!user) return <Skeleton />;
  return (
    <div
      className={cn(
        "min-sm:px-10 flex h-16 w-full flex-row items-center justify-between bg-white px-5 shadow",
        className
      )}
    >
      <div className="flex flex-row items-center gap-5">
        <Link href={"/"}>
          <Image alt="Logo" src={"/image/logo.png"} width={32} height={32} />
        </Link>
        <form className="flex items-center">
          <Search className="absolute ml-3" size="17" />
          <Input
            type="text"
            className="bg-white/30 pl-10 md:w-60"
            placeholder="Tìm kiếm"
          />
        </form>
      </div>

      {/* <div className="ml-5 hidden grow flex-row items-center gap-2 md:flex">
        // <LinkButton isActive={pathname == "/"}>
        //         <Home size={25}/>
        //     </LinkButton> 

        //     <LinkButton isActive={pathname == "/scheduler"}>
        //         <CalendarDays size={25}/>
        //     </LinkButton> 

        //     <LinkButton isActive={pathname == "/class"}>
        //         <NotepadText size={25}/>
        //     </LinkButton>  
        
        <NavigationMenu variant="secondary">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="mr-2">
                <University className="mr-2" />
                Trường
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <img src="/image/logo.png" className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          daklod/lolicon
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components that you can copy and
                          paste into your apps. Accessible. Customizable. Open
                          Source.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="mr-2">
                <Earth className="mr-2" />
                Xã hội
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <img src="/image/logo.png" className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          daklod/lolicon
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components that you can copy and
                          paste into your apps. Accessible. Customizable. Open
                          Source.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>  */}

      <div className="flex items-center gap-3">
        <Button variant="ghost" className="max-md:hidden">
          <MessageCircleMore size={iconSize} />
        </Button>
        <Button variant="ghost" className="max-md:hidden">
          <Bell size={iconSize} />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <AvatarWithName
              active={true}
              className={
                "text-nowrap rounded-sm px-2 py-1 hover:bg-background hover:text-accent-foreground"
              }
              name={user?.display_name}
              src={user?.avatar_path}
            >
              <span className="flex text-xs text-[#2bc60c]/60">Sinh viên</span>
            </AvatarWithName>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                document.cookie = "access_token=; Max-Age=0;secure";
                router.push("/login");
              }}
            >
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <HoverCard openDelay={0}>
          <HoverCardTrigger>
            <AvatarWithName
              active={true}
              className={
                "hover:bg-background px-2 py-1 hover:text-accent-foreground rounded-sm text-nowrap"
              }
              name={info?.name}
              src={info?.avata_url}
            >
              <span className=" flex text-[#2bc60c]/60 text-xs">Sinh viên</span>
            </AvatarWithName>
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-col w-fit p-1">
            <Button
              variant="ghost"
              onClick={() => {
                document.cookie = "access_token=; Max-Age=0;secure";
                router.push("/login");
              }}
            >
              {" "}
              <LogOut className="mr-2" /> Đăng xuất
            </Button>
          </HoverCardContent>
        </HoverCard> */}
      </div>
    </div>
  );
}

interface ListItemProps extends React.ComponentProps<"a"> {
  title: string;
}

const ListItem = function ({
  className,
  title,
  children,
  ref,
  ...props
}: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";
