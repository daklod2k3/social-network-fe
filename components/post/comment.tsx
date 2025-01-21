import { Separator } from "@/components/ui/separator";
import { CommentPost, Post } from "@/entity/document";
import { FormatTime } from "@/helper/utils";
import { Ellipsis } from "lucide-react";
import React from "react";
import AvatarWithName from "../avatar.with.name";

interface Props extends React.ComponentProps<"div"> {
  comment: CommentPost;
}

export default function Comment({ comment, children }: Props) {
  const info = comment.info;
  const { author, content } = comment.info;
  const { display_name, avatar_path } = author;
  return (
    <div className="p-2">
      <AvatarWithName name={display_name} src={avatar_path} center={false}>
        <div className="flex w-fit flex-col rounded-lg bg-background p-2 text-post-foreground">
          <div className="text-wrap break-all">{content}</div>
        </div>
      </AvatarWithName>
      <div className="flex flex-row gap-5 pl-12 pt-2 text-sm">
        <span className="text-muted-foreground" suppressHydrationWarning>
          {FormatTime(info?.createdAt)}
        </span>
        <a>Thích</a>
        <a>Trả lời</a>
        {/* <Ellipsis className='text-muted-foreground' size={20}/> */}
      </div>
      <div className="flex flex-row">
        <div className="mx-5">
          <Separator orientation="vertical" />
        </div>
        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
}
