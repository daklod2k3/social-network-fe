"use client";

import { useForm } from "react-hook-form";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useState } from "react";

import { login, register as signup } from "@/action/auth";

import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, Eye, EyeOff, Loader2 } from "lucide-react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const RegisterSchema = z
  .object({
    password: z.string().min(6, {
      message: "Mật khẩu phải có ít nhất 6 ký tự",
    }),
    email: z.string().email({
      message: "Email không hợp lệ",
    }),
    name: z.string().min(1, {
      message: "Tên không được trống",
    }),
    repassword: z.string(),
  })
  .refine((data) => data.password == data.repassword, {
    message: "Mật khẩu không trùng khớp",
    path: ["repassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ",
  }),
  password: z.string().min(1, {
    message: "Thiếu mật khẩu",
  }),
});

// const FormField = function ({
//   label,
//   type,
//   placeholder,
//   name,
//   error,
//   register,
//   valueAsNumber,
//   showPassIcon,
// }: any) {
//   return (
//     <>
//       <Label>{label}</Label>
//       <div className="flex flex-row-reverse items-center">
//         <Input
//           className="text-black"
//           type={type}
//           placeholder={placeholder}
//           {...register(name, {
//             valueAsNumber,
//           })}
//         />
//         {showPassIcon}
//       </div>
//       {error && <span className="text-xs text-[#DD2C00]">{error.message}</span>}
//     </>
//   );
// };

export function AuthForm({ isLogin = true }) {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(isLogin ? LoginSchema : RegisterSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
    },
  });
  // ...
  // console.log(password);

  // password show/hide icon
  const [isShow, setIsShow] = useState(false);

  const { toast } = useToast();

  const [success, setSuccess] = useState(false);

  const EyeIcon = (
    <Eye
      className={"absolute mr-2 cursor-pointer"}
      size={20}
      onClick={() => setIsShow(true)}
    />
  );
  const EyeOffIcon = (
    <EyeOff
      className={"absolute mr-2 cursor-pointer"}
      size={20}
      onClick={() => setIsShow(false)}
    />
  );

  const [loading, setLoading] = useState(false);

  const showPassIcon = form.watch("password")
    ? isShow
      ? EyeOffIcon
      : EyeIcon
    : "";

  const formSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    // if ()
    const result = isLogin ? await login(data) : await signup(data);
    if (!result.error) {
      setSuccess(true);
      return;
    }

    toast({
      title: "Login failed",
      description: result?.error || "An error occurred",
      variant: "destructive",
    });
    setLoading(false);
  };

  if (success)
    return (
      <Popover open={true}>
        <PopoverTrigger className="fixed left-1/2 top-1/2"></PopoverTrigger>
        <PopoverContent className="flex -translate-y-1/2 space-y-4 flex-col items-center shadow">
          <span className="text-lg font-bold">Đăng nhập thành công</span>
          <CircleCheck className="text-green-500" size={50} />
          <span>Đang chuyển hướng...</span>
        </PopoverContent>
      </Popover>
    );

  return (
    <Card className="flex items-center justify-center self-center rounded-md border-[1px] border-white bg-white px-10 py-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(formSubmit)}
          className="mx-auto grid w-[350px] gap-6"
          noValidate
        >
          <div className="grid gap-2 text-center">
            <div className="relative h-[130px]">
              <Image
                src={"/image/logo.png"}
                alt="Logo image"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="font-medium">
              {isLogin ? "Đăng nhập tài khoản" : "Đăng ký tài khoản"}
            </p>
          </div>
          <div className="grid gap-4">
            {isLogin ? (
              <>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu</FormLabel>
                        <FormControl>
                          <div className="flex flex-row-reverse items-center">
                            <Input
                              {...field}
                              type={isShow ? "text" : "password"}
                              placeholder="Mật khẩu"
                            />
                            {showPassIcon}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="grid gap-2">
                  {/* <Label htmlFor="email">Họ Tên</Label>
                  <Input
                    type="text"
                    required
                    placeholder="Nhập họ tên của bạn"
                    {...register("name")}
                  /> */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên hiển thị</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Tên hiển thị"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" placeholder="Email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu</FormLabel>
                        <FormControl>
                          <div className="flex flex-row-reverse items-center">
                            <Input
                              {...field}
                              type={isShow ? "text" : "password"}
                              placeholder="Mật khẩu"
                            />
                            {showPassIcon}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="repassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nhập lại mật khẩu</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
            <Button type="submit" className="mt-2 w-full" disabled={loading}>
              {isLogin ? "Đăng nhập" : "Đăng ký"}
              {loading && <Loader2 className="ml-2 animate-spin" size={16} />}
            </Button>
            {/* {isLogin ? (
            <Button variant="outline" className="w-full" type="button">
              <Image
                src="/image/logo-google.webp"
                className="mr-1"
                width={"24"}
                height={"24"}
                alt="google logo"
              />{" "}
              Login with Google
            </Button>
          ) : (
            ""
          )} */}
          </div>
          <div className="mt-4 text-center text-sm">
            {isLogin ? (
              <>
                <span className="text-black">Không có tài khoản? </span>
                <Link href="/register" className="underline">
                  Đăng ký
                </Link>
              </>
            ) : (
              <>
                <span className="text-black">Đã có tài khoản? </span>
                <Link href="/login" className="underline">
                  Đăng nhập
                </Link>
              </>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
}
