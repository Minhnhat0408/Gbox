import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/types/supabaseTypes'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const supabase = createRouteHandlerClient<Database>({ cookies })

  await supabase.auth.signOut()

  return NextResponse.redirect(`${requestUrl.origin}/sign-in`, {
    status: 301,
  })
}