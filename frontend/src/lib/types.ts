import type { JWTPayload } from "jose";

export type Role = "ADMIN" | "MENTOR" | "INTERN";
export type DashboardLinks = Record<Role, string>
export interface AuthPayload extends JWTPayload{
  sub: string,
  role: string,
  exp: number,
  iat:number
}
