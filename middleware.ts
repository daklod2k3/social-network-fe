import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "./action/auth";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
  ) {
    const session = await getSession();
    // console.log(session?.data);

    if (!session) {
      return NextResponse.next();
    }

    url.pathname = "/";
    NextResponse.redirect(url);
  }
  if (
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/register")
    // !request.nextUrl.pathname.startsWith("/error")
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const session = await getSession(await cookies());
    console.log(session);

    if (!session) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (
      !session.user && !request.nextUrl.pathname.startsWith("/create-profile")
    ) {
      url.pathname = "/create-profile";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
