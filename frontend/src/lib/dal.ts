import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { cache } from 'react'
import 'server-only'
import { config } from './utils'
export const isAuthenticated = cache(async () => {
  const token = (await cookies()).get('token')?.value
  if(!token) return false
  try {
    const { payload } = await jwtVerify(token,config.jwtSecret , {
      algorithms: ['HS256'],
    })
    return true
  } catch (err) {
    return false
  }
}
)
