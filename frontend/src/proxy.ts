import { type NextRequest, NextResponse } from "next/server";
const nonProtectedRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/create-company",
  "/reset-password",

];
export default async function proxy(req: NextRequest) {
  const token = req.cookies.get('token')
  const isProtected = !nonProtectedRoutes.includes(req.nextUrl.pathname)
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }
  return NextResponse.next()
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
