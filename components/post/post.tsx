"use client";
// import { createCommentAction } from "@/action/Comment";
import AvatarWithName from "@/components/avatar.with.name";
import { PostProvider } from "@/components/context/post.context";
import { UserContext } from "@/components/context/user.context";
import PostButton from "@/components/post/post.button";
import CommentSkeleton from "@/components/skeletons/comment.skeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Comment, CommentPost, Like, Post, Profile } from "@/entity/document";
import { CardHoverStyle, FormatTime } from "@/helper/utils";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { HTMLAttributes, Suspense, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import CommentList from "./comment.list";
import Reactions from "./reactions";

const footerIconSize = 17;

interface Props extends HTMLAttributes<HTMLDivElement> {
  info: Post;
  like: Like;
  cmts: Comment[];
  imgs: string[];
  author: Profile;
}

export default function PostComponent({
  info,
  like,
  cmts,
  author,
  imgs,
  className,
}: Props) {
  const {
    register,
    handleSubmit,
    setFocus,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();
  const [newComments, setNewComments] = useState<CommentPost[]>([]);
  const user = useContext(UserContext);

  if (!user) return null;
  // const comment = [...newComments, ...cmts];

  // console.log(Array.from(cmts).length);
  // console.log(info);
  return (
    <PostProvider value={{ post: info }}>
      <Card
        className={cn(className, "relative w-full bg-white", CardHoverStyle)}
      >
        <CardHeader className="flex flex-row justify-between p-5 pb-3">
          <AvatarWithName
            name={author?.display_name}
            src={author?.avatar_path}
            size={12}
          >
            <span className="text-muted-foreground">
              <Link
                href={"/post/" + info.id}
                className="hover:underline"
                suppressHydrationWarning={true}
              >
                {FormatTime(info?.createdAt ?? "12:55")}
              </Link>
            </span>
          </AvatarWithName>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-fit">
              <Ellipsis className="!mt-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col">
              <Button variant="destructive">Xoá</Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="relative flex w-full flex-col gap-3 pb-3 text-post-foreground">
          <div
            className={cn(
              info?.content?.length < 200 && !imgs.length ? "text-2xl" : "",
              "whitespace-pre-line"
            )}
          >
            {info?.content}
          </div>
        </CardContent>
        {imgs ? (
          <div className="relative m-3 flex max-h-[60vh] flex-col items-center justify-center">
            {/* <img src="/image/sololeveling.png" className='w-full object-contain max-h-[60vh]' alt='' /> */}

            <img
              src={imgs[0]}
              className="w-full overflow-hidden rounded-sm object-contain"
              alt=""
            />
            {/* <Image src="/image/Image-generated-by-ZMOs-AI-anime-generator.webp" alt='' fill objectFit='contain' sizes='0px 0px, 0px 0px, 300px (max-height:480px)'/> */}
            <div className="w-full">
              {/* <Separator /> */}
              {/* <div className="px-6 py-2 flex flex-col items-center text-sm w-full justify-between absolute">
              <ReactionButton>
                <img src="/icon/like.png" className="h-8 mr-1 saturate-0" /> 12
              </ReactionButton>
              <ReactionButton variant="ghost">
                <img src="/icon/heart.png" className="h-8 mr-1" /> 1
              </ReactionButton>
              <ReactionButton variant="ghost">
                <img src="/icon/haha.png" className="h-8 mr-1 saturate-0" /> 3
              </ReactionButton>
              <ReactionButton variant="ghost">
                <img src="/icon/angry.png" className="h-8 mr-1 saturate-0" /> 1
              </ReactionButton>
              <ReactionButton variant="ghost">
                <img src="/icon/sad.png" className="h-8 mr-1 saturate-0" />
              </ReactionButton>
              <ReactionButton variant="ghost">
                <img src="/icon/wow.png" className="h-8 mr-1 saturate-0" />
              </ReactionButton>
            </div> */}
            </div>
          </div>
        ) : (
          <div className="mb-3" />
        )}

        <Separator />

        <CardFooter className="relative flex flex-row flex-wrap gap-2 bg-background px-1 py-1 *:grow">
          <Reactions className={"group grow"} like={like} />
          <PostButton onClick={() => setFocus("commentText")}>
            <img src="/icon/comment.png" className="mr-1 h-full" /> Bình luận
          </PostButton>
          <PostButton>
            <img src="/icon/share.png" className="mr-1 h-full" /> Chia sẻ
          </PostButton>
        </CardFooter>
        <Separator />

        <form
          className="mx-5 my-3 flex items-center justify-end gap-2"
          onSubmit={handleSubmit(async (form) => {
            if (!form.commentText) return;
            if (document.activeElement instanceof HTMLElement)
              document.activeElement?.blur();
            // let comments: CommentPost = {
            //   info: { author: user, content: form.commentText },
            //   status: "Đang gửi",
            // };
            // setNewComments([comments, ...newComments]);
            // reset();
            // const result = await handleComment(form, info.post_id);
            // if (result?.comment_id) {
            //   comments = result;
            //   setNewComments([comments, ...newComments]);
            // } else {
            //   setNewComments(newComments);
            //   toast(result);
            // }
          })}
        >
          <Avatar>
            <AvatarImage src={user.avatar_path ?? "/image/avatar.avif"} />
          </Avatar>
          <Input
            autoComplete="off"
            {...register("commentText")}
            className="border-none pr-10"
            placeholder="Hãy viết bình luận của bạn"
          />
          <button
            className={cn(
              "absolute mr-3",
              watch("commentText") ? "block" : "hidden"
            )}
          >
            <img
              src="/icon/send.png"
              className="h-7 cursor-pointer text-muted-foreground hover:text-primary"
            />
          </button>
        </form>
        {/* <PostComments post_id={info.post_id} /> */}
        <CommentList post_id={info?.id} lists={newComments} />
      </Card>
    </PostProvider>
  );
}

const handleComment = async (formData, post_id) => {
  // const comment = await createCommentAction(formData.commentText, post_id);
  // if (comment.status === 201) {
  //   return comment.json;
  // }
  // return {
  //   title: "Bình luận thất bại",
  //   description: "Có lỗi xảy ra khi bình luận",
  //   variant: "destructive",
  // };
};
