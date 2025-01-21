"use client";
import { createPost } from "@/action/Post";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CardHoverStyle } from "@/helper/utils";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { upload } from "@vercel/blob/client";
import { ImagePlus, SendHorizonal, Smile } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";

const postTextChange = (e, setText) => {
  // console.log();
  const text = e.target.textContent;
  // if (text.length > 0)
  setText(text);
};

const onPostClick = (e, ref) => {
  ref.current.focus();
  // ref.current.select()
  console.log(ref);
};

const onPostSubmit = async (
  images: FileList,
  body,
  toast,
  router,
  setLoading
) => {
  setLoading(true);
  // console.log(image);'/.;
  // try {
  //   const imageNames = await Promise.all(
  //     Array.from(images).map(async (image) => {
  //       // console.log(image);
  //       // formData.append("files", image);
  //       return (
  //         await upload(v4(), image, {
  //           access: "public",
  //           handleUploadUrl: "/api/image",
  //         })
  //       ).url;
  //     })
  //   );

  //   // console.log(images);

  //   // console.log(imageNames);

  //   // if () {
  //   //   toast({
  //   //     title: "Đăng bài thất bại",
  //   //     description: "Không để upload ảnh",
  //   //     variant: "destructive",
  //   //   });
  //   //   return;
  //   // }
  //   const result = await createPost(imageNames, body);
  //   if (result?.post.post_id) {
  //     toast({
  //       title: "Đăng bài thành công",
  //     });
  //     result.images = Array.from(images).map((data) =>
  //       URL.createObjectURL(data)
  //     );
  //     router.refresh();
  //     setLoading(false);
  //     return true;
  //   }
  //   //   console.log(result);
  //   toast({
  //     title: "Đăng bài thất bại",
  //     description: result.json,
  //     variant: "destructive",
  //   });
  // } catch (e) {
  //   console.log(e.message);
  //   toast({
  //     title: "Tải ảnh thất bại",
  //     variant: "destructive",
  //   });
  //   setLoading(false);
  //   return false;
  // }
  // setLoading(false);
};

const onPostFileChange = (e, setSelectedFile) => {
  const files = e.target.files;
  if (files) {
    // console.log(files);
    setSelectedFile(files);
  }
};

export default function NewPost() {
  // const [content, setContent ] =
  // const [open, setOpen] = useState(false);

  const [postText, setPostText] = useState("");

  const { handleSubmit, register, getValues } = useForm();

  const postInputRef = useRef(null);
  const { toast } = useToast();

  // const [newPost, setNewPost] = useState([]);

  // const [selectedImage, setSelectedImage] = useState([]);
  const [selectedFile, setSelectedFile] = useState<File[]>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const [input]
  // const [uploadPercent, setUploadPercent] = useState(-1);

  return (
    <>
      <Card className={cn("w-full", CardHoverStyle)}>
        <form
          // action=""
          onSubmit={handleSubmit(async (formData) => {
            // if (
            //   await onPostSubmit(
            //     selectedFile,
            //     postText,
            //     toast,
            //     router,
            //     setLoading
            //   )
            // ) {
            //   setPostText("");
            //   setSelectedFile([]);
            //   postInputRef.current.textContent = "";
            // }
          })}
        >
          <CardHeader>
            <CardTitle>Bài viết mới</CardTitle>
          </CardHeader>
          <CardContent className="relative pb-0">
            {/* <Input 
                    className=" break-all border-none" 
                    placeholder="Hãy viết điều gì đó..." 
                    // onClick={()=>setOpen(true)}  
                    /> */}
            <div
              className="max-h-[50vh] min-h-14 overflow-auto break-all rounded-sm bg-background p-2 outline-none"
              // onPaste={(e)=>{

              // }}
              onPasteCapture={(e) => {
                const items = e.clipboardData.files;
                if (items.length > 0) setSelectedFile([items[0]]);
              }}
              data-lexical-editor={true}
              onInput={(e) => postTextChange(e, setPostText)}
              contentEditable={"plaintext-only"}
              tabIndex={0}
              ref={postInputRef}
            >
              {/* {postText} */}
            </div>
            <div
              className={cn(
                "absolute top-2 ml-2 block text-muted-foreground",
                postText.length > 0 ? "hidden" : ""
              )}
              onClick={(e) => onPostClick(e, postInputRef)}
            >
              Chia sẽ mọi người điều gì đó
            </div>
            {/* <div>Hãy viết gì đó</div> */}
            {selectedFile ? (
              <div className="my-3 flex flex-row flex-wrap content-evenly justify-evenly gap-1">
                {Array.from(selectedFile ?? []).map((data, idx) => (
                  <img
                    src={URL.createObjectURL(data)}
                    key={idx}
                    alt=""
                    className="max-h-[40vh] grow object-contain"
                  />
                ))}
                {/* {selectedFile ? (
                <img
                  // {...register("files")}
                  src={URL.createObjectURL(selectedFile)}
                  alt=""
                  className=" object-contain grow max-h-[40vh]"
                />
              ) : (
                ""
              )} */}
              </div>
            ) : (
              ""
            )}
          </CardContent>
          <CardFooter className="flex w-full flex-row flex-wrap gap-2">
            <AddContentButton className={"p-0"}>
              <label
                htmlFor="postFiles"
                className="mx-4 flex cursor-pointer flex-row items-center"
              >
                <img src="/icon/gallery.png" className="mr-1 h-7" /> Chọn ảnh
              </label>
              <input
                onChange={(e) => onPostFileChange(e, setSelectedFile)}
                id="postFiles"
                multiple
                className="h-0 w-0"
                type="file"
                accept="image/*"
              />
            </AddContentButton>
            <AddContentButton className="bg-background text-primary">
              <img src="/icon/reaction.png" className="mr-1 h-7" /> Thêm biểu
              cảm
            </AddContentButton>
            <div className="flex grow justify-end">
              <Button
                className="w-fit flex-1 justify-self-end text-base"
                disabled={loading}
                type="submit"
              >
                {/* <img src="icon/send.png" className="mr-1 h-7" />{" "} */}
                {loading ? "Đang tải lên" : "Đăng bài"}
              </Button>
            </div>
          </CardFooter>
          {/* <NewPostDialog open={open} /> */}
        </form>
      </Card>
      {/* {newPost.reverse().map((data, idx) => {
        return (
          <Post
            key={idx}
            info={data.post}
            author={data.author}
            cmts={[]}
            imgs={data.images}
          />
        );
      })} */}
    </>
  );
}

const AddContentButton = ({ className, children }) => {
  return (
    <Button
      type="button"
      variant="secondary"
      className={cn(className, "min-w-fit flex-1")}
    >
      {children}
    </Button>
  );
};

const NewPostDialog = ({ children, className, open }) => {
  return (
    <Dialog open={open}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you alone?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
