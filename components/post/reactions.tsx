"use client";
import { postReaction, ReactionType } from "@/action/like";
import { cn } from "@/lib/utils";
import React, { useContext, useState } from "react";
import { PostContext } from "../context/post.context";
import PostButton from "./post.button";

export default function Reactions({ className, like }) {
  const post = useContext(PostContext);
  const [currentLike, setCurrentLike] = useState(like);
  if (!post) return null;

  const SetReaction = (type?: ReactionType) => {
    if (!type) return;
    const before = currentLike?.type;
    setCurrentLike({ type: type });
    const result = postReaction({ post_id: post.id, type: type });
    result.catch(() => setCurrentLike({ type: before }));
  };

  return (
    <div className={cn(className, "group")}>
      <div
        className={cn(
          "invisible absolute flex w-max -translate-y-full flex-row rounded-full border bg-white opacity-0 shadow-xl delay-300 duration-300 ease-out group-hover:visible group-hover:opacity-100"
        )}
      >
        <ReactionButton reactType="like" onClick={() => SetReaction("like")} />
        <ReactionButton
          reactType="heart"
          onClick={() => SetReaction("heart")}
        />
        <ReactionButton reactType="haha" onClick={() => SetReaction("haha")} />
        <ReactionButton reactType="wow" onClick={() => SetReaction("wow")} />
        <ReactionButton reactType="sad" onClick={() => SetReaction("sad")} />
        <ReactionButton
          reactType="angry"
          onClick={() => SetReaction("angry")}
        />
      </div>
      {currentLike?.type ? (
        <UserReact type={currentLike.type} onClick={() => SetReaction()} />
      ) : (
        <PostButton className={"w-full"} onClick={() => SetReaction("like")}>
          <img src="/icon/like.png" className="h-full" /> Thích
        </PostButton>
      )}
    </div>
  );
}

const UserReact = ({ type, onClick }) => {
  // console.log(type);
  const LikeTranslate = {
    like: "Thích",
    heart: "Yêu thích",
    haha: "Haha",
    wow: "Wow",
    sad: "Buồn",
    angry: "Phẫn nộ",
  };
  const LikeStyle = {
    like: "text-blue-600",
    heart: "text-red-600",
    haha: "text-yellow-600",
    wow: "text-yellow-300",
    sad: "text-yellow-600",
    angry: "text-red-600",
  };
  const LikeBg = {
    like: "bg-blue-100",
    heart: "bg-red-100",
    haha: "bg-yellow-100",
    wow: "bg-yellow-50",
    sad: "bg-yellow-100",
    angry: "bg-red-100",
  };
  return (
    <PostButton
      className={cn(LikeStyle[type], "w-full", LikeBg[type])}
      onClick={onClick}
    >
      <img src={"/icon/" + type + ".png"} className="h-full" />{" "}
      {LikeTranslate[type]}
    </PostButton>
  );
};

const ReactionButton = ({
  children,
  className,
  reactType,
  onClick,
}: React.ComponentProps<"button"> & { reactType: ReactionType }) => {
  return (
    <button
      className={cn(
        className,
        "flex flex-row items-center saturate-0 duration-300 ease-in *:!start-full hover:scale-150 hover:saturate-100",
        "hover:delay-0 active:translate-y-3"
      )}
      onClick={onClick}
    >
      <img src={"/icon/" + reactType + ".png"} className={cn("h-12")} />
      {children}
    </button>
  );
};
