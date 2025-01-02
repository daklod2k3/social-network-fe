import { CookieListItem, ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./auth";

export class Auth {
  cookie: {
    getCookies: () => ResponseCookies;
    setAll: (
      cookies: ResponseCookies,
    ) => void;
  };

  constructor({ cookie }: {
    cookie: {
      getCookies: () => ResponseCookies;
      setAll: (
        cookies: ResponseCookies,
      ) => void;
    };
  }) {
    this.cookie = cookie;
  }

  async updateSession(request: NextRequest) {
    const cookies = this.cookie.getCookies();
    const access_token  = cookies.get("access_token");
    
    const data = await getSession(cookies.get("access_token"));
    if (data) {
      this.cookie.setAll([data.]);
    }
}


