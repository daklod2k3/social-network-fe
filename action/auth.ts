"use server";

import { Api } from "./api";

const api = await Api();

export async function login(form: { email: string; password: string }) {
  try {
    const res = await fetch(api.baseUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    switch (data.error_code) {
      case "invalid_credentials":
        return {
          error: "Tài khoản hoặc mật khẩu không đúng",
        };
    }
    return {
      error: "Unknown error",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Unknown error",
    };
  }
}

export async function register(form: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const res = await fetch(api.baseUrl + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    switch (data.error_code) {
      case "user_already_exists":
        return {
          error: "Người dùng đã tồn tại",
        };
    }
    return {
      error: "Unknown error",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Unknown error",
    };
  }
}

export async function getSession(cookie?: string) {
  if (!cookie) return null;
  try {
    const res = await fetch(api.baseUrl + "/auth/session", {
      headers: {
        cookie,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
