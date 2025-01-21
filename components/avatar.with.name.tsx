"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLProps<HTMLDivElement> {
  name: string;
  src?: string;
  active?: boolean;
  size?: number;
  center?: boolean;
}

export default function AvatarWithName({
  children,
  name,
  className,
  src,
  active,
  size = 10,
  center = true,
}: Props) {
  return (
    <div
      className={cn(
        "flex gap-2 text-sm font-medium",
        className,
        center ? "items-center" : ""
      )}
    >
      <Avatar
        className={cn(
          "items-center justify-center bg-white",
          !center ? "mt-2" : "",
          active ? "border-2 border-green-500" : "",
          "w-" + size,
          "h-" + size
        )}
      >
        <AvatarImage src={src ?? "/image/avatar.avif"} />
      </Avatar>
      <div className={cn("flex flex-col text-muted-foreground")}>
        <p
          className={cn("font-bold text-primary", "!text-[" + size * 2 + "px]")}
        >
          {name}
        </p>
        {children}
      </div>
    </div>
  );
}

const GenerateName = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};
