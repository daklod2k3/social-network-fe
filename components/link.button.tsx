import { NavigationMenuContent } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface Props extends React.ComponentProps<typeof Button> {
  isActive?: boolean;
  name: string;
  href?: string;
}

export default function LinkButton({
  children,
  isActive,
  className,
  name,
  href = "/",
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "p-2 h-14",
        " rounded-lg font-[0] flex flex-row gap-2 items-center",
        isActive ? "bg-white " : "hover:bg-white  bg-background",
        className
      )}
    >
      {children}
      {name ? <div>{name}</div> : ""}
    </Link>
  );
}
