"use client";
import { createProfile } from "@/action/auth";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { HTMLInputTypeAttribute, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { EditableAvatar } from "./avatar-edit";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

export interface FormField<T extends ZodType> {
  name: keyof z.infer<T>;
  label: string;
  type: HTMLInputTypeAttribute;
}

export const CreateProfileSchema = z.object({
  display_name: z.string().min(1, "Tên không thể trống"),
  avt_path: z
    .instanceof(File, {
      message: "",
    })
    .refine((file) => file.size <= 5000000, "File size must be less than 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "File must be JPEG, PNG"
    )
    .optional(),
});

type FormFieldType = FormField<typeof CreateProfileSchema>;

const Fields: FormFieldType[] = [
  {
    name: "display_name",
    label: "Nhập tên bạn muốn hiển thị với mọi người",
    type: "text",
  },
  // {
  //   name: "avt_path",
  //   label: "Ảnh đại diện",
  //   type: "file",
  // },
];

export default function CreateProfileForm() {
  const form = useForm<z.infer<typeof CreateProfileSchema>>({
    resolver: zodResolver(CreateProfileSchema),
    mode: "all",
    defaultValues: {
      display_name: "",
    },
  });

  const router = useRouter();

  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const formSubmit = async (data: z.infer<typeof CreateProfileSchema>) => {
    setLoading(true);

    const result = await createProfile(data);
    console.log(result);

    if (!result.error) {
      router.push("/");
      return;
    }

    toast({
      title: "Login failed",
      description: result?.error || "An error occurred",
      variant: "destructive",
    });
    setLoading(false);
  };

  return (
    <Card className="flex items-center font-semibold justify-center self-center rounded-md border-[1px] border-white bg-white px-10 py-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(formSubmit)}
          className="mx-auto grid w-[350px] gap-6"
          noValidate
        >
          <div className="grid gap-2 text-center">
            <p className=" break-words ">
              <span>
                Chào mừng đến với{" "}
                <span className="font-bold">FAST CONNECT</span>
              </span>
              <br />
              <span>hãy cho mọi người biết thêm thông tin về bạn</span>
            </p>
          </div>
          <div className="grid gap-4 ">
            <div className="mx-auto">
              <EditableAvatar />
            </div>
            {Fields.map((item, idx) => (
              <div key={idx} className="grid gap-2">
                <FormField
                  control={form.control}
                  name={item.name}
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      {/* <FormLabel>{item.label}</FormLabel> */}
                      <FormControl autoFocus>
                        <div className="flex flex-row-reverse items-center">
                          <Input
                            {...rest}
                            value={value as string}
                            onChange={
                              item.type != "file"
                                ? onChange
                                : (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      onChange(file);
                                    }
                                  }
                            }
                            autoFocus={idx == 0}
                            className={"h-10 font-normal"}
                            type={item.type}
                            placeholder={item.label}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button type="submit" className="mt-2 w-full" disabled={loading}>
              {"Tiếp tục"}
              {loading && <Loader2 className="ml-2 animate-spin" size={16} />}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
