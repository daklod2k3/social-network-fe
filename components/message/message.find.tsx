import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CardHoverStyle } from "@/helper/utils";
import { cn } from "@/lib/utils";
import React from "react";
import AvatarWithName from "../avatar.with.name";

export default function MessageFind({
  className,
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("", className)}>
      <Card className={cn(CardHoverStyle)}>
        <CardHeader>
          <CardTitle className="text-lg">Bạn bè</CardTitle>
          <CardDescription>Bắt đầu cuộc trò chuyện mới</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <Input className="mb-3 h-8 " placeholder="Tìm kiếm bạn bè" />
          <Button className="h-fit justify-start shadow-none bg-transparent py-3 text-start text-primary hover:bg-background">
            <AvatarWithName
              active={false}
              src={"/image/duytung-avt.jpg"}
              name={"Duy Tùng"}
            >
              3 phút trước
            </AvatarWithName>
          </Button>
          <Button className="h-fit justify-start  shadow-none bg-transparent py-3 text-start text-primary hover:bg-background">
            <AvatarWithName
              active={true}
              src={"/image/trungtin-avt.jpg"}
              name={"Trungg Tín"}
            >
              <div className="text-xs font-normal text-green-500">
                Trực tuyến
              </div>
            </AvatarWithName>
          </Button>
          <Button className="h-fit justify-start  shadow-none bg-transparent py-3 text-start text-primary hover:bg-background">
            <AvatarWithName
              active={true}
              src={"/image/toanvu-avt.jpg"}
              name={"Bố mực"}
            >
              <div className="text-xs font-normal text-green-500">
                Trực tuyến
              </div>
            </AvatarWithName>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
