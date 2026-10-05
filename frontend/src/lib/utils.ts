export { cn } from "cn"
export const config = {
  backendUrl: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BACKEND_URL_PROD : process.env.NEXT_PUBLIC_BACKEND_URL_DEV,
  jwtSecret: new TextEncoder().encode(process.env.JWT_SECRET),
}
