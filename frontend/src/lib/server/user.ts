import "server-only"
import { cookies } from "next/headers"
import { config } from "../config"
import { logger } from "../logger"
import { Role } from "../types"

export async function getUserData(): Promise<{
  role: Role,
  userName: string,
  email:string
}| null> {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ")

    const url = `${config.backendUrl}/users/me`

    const res = await fetch(url, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    })

    if (!res.ok) {
      logger.error(`getUserData failed: ${res.status} ${url}`)
      return null
    }

    const contentType = res.headers.get("content-type") ?? ""
    if (!contentType.includes("application/json")) {
      const body = await res.text()
      logger.error(
        `getUserData expected JSON, got ${contentType} from ${url}: ${body.slice(0, 200)}`
      )
      return null
    }

    return await res.json()
  } catch (e) {
    logger.error(e)
    return null
  }
}
