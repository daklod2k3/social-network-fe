import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { SendHorizonal } from "lucide-react";
import React from "react";

export default function PostSkeleton() {
  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row justify-between px-5 pb-3">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pb-3 text-post-foreground"></CardContent>
      <div className="relative flex w-full flex-col items-center justify-center p-5">
        <Skeleton className={"h-[20vh] w-full"} />
      </div>
      {/* <Separator /> */}
    </Card>
  );
}
