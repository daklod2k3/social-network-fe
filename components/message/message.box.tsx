"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import AvatarWithName from "../avatar.with.name";

export default function MessageBox({ className, author }) {
  console.log(author);
  const [messages, setMessages] = useState([]);

  useEffect(() => {}, [setMessages]);

  return (
    <Card className={cn(className, "")}>
      <CardHeader className="p-3 shadow">
        <AvatarWithName name={author.name} src={author.avata_url}>
          <span className="flex text-xs text-[#2bc60c]/60">Trực tuyến</span>
        </AvatarWithName>
      </CardHeader>
      <CardContent
        className={"flex h-[30vh] w-full flex-col justify-end gap-3 px-4"}
      >
        <MessageContent content={"Mai cf ko"} />
        {/* <MessageContent content={""} className={"self-end"} /> */}
      </CardContent>
      <Separator />
      <CardFooter className="p-1">
        <Input
          type="text"
          placeholder="nhập tin nhắn"
          className="mx-3 my-2 w-full shadow outline-none"
        />
      </CardFooter>
    </Card>
  );
}

const MessageContent = ({
  content,
  className,
}: React.ComponentProps<"div"> & { content: string }) => {
  return (
    <div
      className={cn(
        className,
        "w-fit max-w-[80%] break-words rounded-xl bg-primary px-3 py-2 text-primary-foreground shadow-xl"
      )}
    >
      {content}
    </div>
  );
};
