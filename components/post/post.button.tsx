"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export default function PostButton({
  children,
  onClick,
  className,
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "grow bg-transparent text-center text-sm text-[#647589] hover:bg-white",
        className
      )}
    >
      {children}
    </Button>
  );
}
