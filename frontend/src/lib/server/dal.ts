import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { cache } from 'react'
import 'server-only'
import { config } from '../config'
import { AuthPayload } from '../types'
export const returnPayload = cache(async (): Promise<AuthPayload|null> => {
  const token = (await cookies()).get('token')?.value
  if(!token) return null
  try {
    const { payload } = await jwtVerify(token,config.jwtSecret , {
      algorithms: ['HS256'],
    })
    if (
          typeof payload.sub !== 'string' ||
          typeof payload.role !== 'string' ||
          typeof payload.exp !== 'number'||
          typeof payload.iat !== 'number'
        ) {
          return null
        }

        return {
          sub: payload.sub,
          role: payload.role,
          exp: payload.exp,
          iat:payload.iat
        }
  } catch (err) {
    return null
  }
}
)
