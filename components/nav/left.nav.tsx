"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { CardHoverStyle } from "@/helper/utils";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { CalendarDays, Heart, Home, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { UserContext } from "../context/user.context";
import LinkButton from "../link.button";
import { Avatar } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const iconSize = 20;

type Props = React.HTMLProps<HTMLDivElement>;

export default function LeftNavigation({ className }: Props) {
  const pathname = usePathname();
  const user = useContext(UserContext);

  if (!user) return <Skeleton />;

  return (
    <div className={cn(className, "flex-col items-center md:flex")}>
      <Card className={cn("w-full", CardHoverStyle)}>
        <CardContent className="flex flex-col items-center">
          <Avatar className="m-3 mt-5 h-24 w-24 rounded-full border border-primary bg-white">
            <AvatarImage
              src={user?.avatar_path ?? "/image/avatar.avif"}
              className="h-full"
            />
          </Avatar>
          <div className="flex flex-col items-center">
            <span className="font-bold">{user.display_name}</span>
            <span className="text-[#2bc60c]">Thành viên</span>
            <span className="text-xs text-muted-foreground">1k theo dõi</span>
          </div>
        </CardContent>
      </Card>

      <div className="mt-12 flex h-full w-full flex-col gap-2">
        <LinkButton href="/" isActive={pathname == "/"} name={"Trang chủ"}>
          <img src="/icon/home.png" className="h-7" />
        </LinkButton>
        <LinkButton
          href="/tinder"
          isActive={pathname == "/tinder"}
          name={"Hẹn hò"}
        >
          <Heart size={iconSize} />
        </LinkButton>

        <LinkButton
          href="/scheduler"
          isActive={pathname == "/scheduler"}
          name={"Thời khoá biểu"}
        >
          <CalendarDays size={iconSize} />
        </LinkButton>

        <LinkButton className={"justify-self-end"} name={"Cài đặt"}>
          <Settings size={iconSize} />
        </LinkButton>
      </div>

      {/* <Card className={cn('w-fit h-[70vh] py-3 rounded border-none',)}>
            <CardContent className="flex flex-col px-3 justify-between h-full py-0">
                <div className="flex flex-col gap-5">
                    <LinkButton href="/" isActive={pathname == "/"}>
                        <Home size={iconSize} />
                    </LinkButton>
                    <LinkButton href="/tinder" isActive={pathname == "/tinder"}>
                        <Heart size={iconSize} />
                    </LinkButton>

                    <LinkButton href="/scheduler" isActive={pathname == "/scheduler"}>
                        <CalendarDays size={iconSize}/>
                    </LinkButton>
                
                </div>

                <div className="flex flex-col gap-2 self-end">
                    <LinkButton>
                        <Settings size={iconSize}/>
                    </LinkButton>
                </div>
                
                
            </CardContent>
        </Card> */}
    </div>
  );
}
