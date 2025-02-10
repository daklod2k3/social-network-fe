"use server";

import { LoginSchema } from "@/components/auth/form.auth";
import { CreateProfileSchema } from "@/components/create-profile.form";
import { AuthResponse } from "@/entity/auth";
import { ErrorResponse } from "@/entity/response";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ApiAuth, ApiRoutes } from "./api";

// const LogName = "create profile";

export async function login(form: z.infer<typeof LoginSchema>) {
  const api = new ApiAuth(await cookies(), ApiRoutes.Login);
  let data;
  try {
    const res = await api.post(form);
    data = await res.json();
    console.log(data);

    switch (data?.error) {
      case "invalid_credentials":
        return {
          error: "Tài khoản hoặc mật khẩu không đúng",
        };
    }
  } catch (error) {
    console.log(error);
    return {
      error: "Có gì đó không đúng :'(, vui lòng thử lại sau",
    };
  }
  const cookie = await cookies();
  cookie.set("access_token", data.access_token);
  cookie.set("refresh_token", data.refresh_token);
  if (data.access_token) {
    redirect("/");
  }
  return {
    error: "Có gì đó không đúng :'(, vui lòng thử lại sau",
  };
}

export async function register(form: {
  email: string;
  password: string;
}) {
  const api = new ApiAuth(await cookies(), ApiRoutes.Register);

  try {
    const res = await api.post(form);
    const data = await res.json();
    console.log(data);

    switch (data.error) {
      case "user_already_exists":
        return {
          error: "Người dùng đã tồn tại",
        };
    }

    if (!data.access_token) {
      return {
        error: "Có gì đó không đúng :'(, vui lòng thử lại sau",
      };
    }

    const cookie = await cookies();
    cookie.set("access_token", data.access_token);
    cookie.set("refresh_token", data.refresh_token);
  } catch (error) {
    console.log(error);
    return {
      error: "Có gì đó không đúng :'(, vui lòng thử lại sau",
    };
  }
  redirect("/create-profile");
}

export async function createProfile(form: z.infer<typeof CreateProfileSchema>) {
  try {
    const req = await (await getAuthApi()).post(form);
    const data = await req.json();
    if (!data.user_id) {
      return data;
    }
  } catch (e) {
    console.error(e);

    return {
      error: "Server error",
    };
  }
  redirect("/");
}

export async function getSession(
  cookies?: ReadonlyRequestCookies,
): Promise<ErrorResponse | AuthResponse> {
  let apiAuth;
  if (cookies) {
    apiAuth = new ApiAuth(cookies, ApiRoutes.Session);
  } else {
    apiAuth = await getAuthApi(ApiRoutes.Session);
  }
  try {
    const req = await apiAuth.get({});
    // const req = await fetch((await getAuthApi()).baseUrl + ApiRoutes.Session, {
    //   credentials: "include",
    // });
    // console.log(req);
    if (req.status == 401) {
      return {
        "error": "Unauthorized",
      };
    }

    const data = await req.json();
    // if (data)

    return data as AuthResponse;
  } catch (e) {
    console.error(e);
  }
  return {
    error: "Server error",
  };
}

export async function getProfile() {
  try {
    const req = await (await getAuthApi(ApiRoutes.Profile)).get({});
    console.log(req);
    const data = await req.json();
    if (!data.user_id) {
      return data;
    }
  } catch (e) {
    console.error(e);
    redirect("/login");
  }
}

async function getAuthApi(route: ApiRoutes = ApiRoutes.Profile) {
  return new ApiAuth(await cookies(), route);
}

export async function logout() {
}
