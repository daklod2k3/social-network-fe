/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { UserRoundPen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FormDescription } from "./ui/form";

const defaultAvatars = [
  "/image/avatar/avatar1.avif",
  // "/image/avatars/avatar2.png",
  // "/image/avatars/avatar3.png",
  // "/image/avatars/avatar4.png",
];

export function EditableAvatar() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(
    defaultAvatars[0]
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedAvatar(imageUrl);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col justify-center gap-2">
          <Button
            variant="ghost"
            className="relative h-28 w-28 rounded-full p-0"
          >
            <Avatar className="h-28 w-28">
              <AvatarImage
                src={selectedAvatar || defaultAvatars[0]}
                alt="Avatar"
              />
              {/* <AvatarFallback>CN</AvatarFallback> */}
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100">
              <UserRoundPen size={28} />
            </div>
          </Button>
          <span className=" text-center">Ảnh đại diện</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chọn ảnh đại diện cho bạn</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-4 mb-5 justify-center">
            {defaultAvatars.map((avatar, index) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "h-20 w-20 rounded-full p-0",
                  selectedAvatar === avatar && "ring-2 ring-primary"
                )}
                onClick={() => handleAvatarSelect(avatar)}
              >
                <Image
                  src={avatar || "/placeholder.svg"}
                  alt={`Avatar ${index + 1}`}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </Button>
            ))}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="avatar-upload">Tải lên cho riêng bạn</Label>
            <Input
              disabled
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
            />
            <FormDescription>Tính năng đang phát triển</FormDescription>
          </div>
        </div>
        <Button onClick={() => setIsOpen(false)}>Xác nhận</Button>
      </DialogContent>
    </Dialog>
  );
}
