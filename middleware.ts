import { NextResponse } from "next/server";
import { NextRequestWithAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req });
  const isLoginPage = req.nextUrl.pathname === "/login";

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/voucher", req.url));
  }

  if (!token && !isLoginPage) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/voucher", "/history", "/login"],
};
