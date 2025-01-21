"use client";
import CommentSkeleton from "@/components/skeletons/comment.skeleton";
import { Separator } from "@/components/ui/separator";
import { CommentPost } from "@/entity/document";
import React, { useEffect, useState } from "react";
import Comment from "./comment";

interface Props {
  post_id: string;
  lists: CommentPost[];
}

export default function CommentList({ post_id, lists }) {
  const [comments, setComments] = useState(lists);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // getCommentByPostId(post_id).then((res) => {
    //   // console.log(res.json);
    //   setComments(res.json);
    //   setLoading(false);
    // });
  }, [post_id]);

  if (loading) return <CommentSkeleton />;

  return (
    <>
      {lists.length > 0 || comments.length > 0 ? (
        <>
          <Separator />
          <div className="px-4">
            {[...lists, ...comments].map((cmt, idx) => (
              <Comment key={cmt.comment_id ?? idx} comment={cmt} />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
