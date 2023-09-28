import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/types/supabaseTypes'

export const dynamic = 'force-dynamic'
import type { tSignUpSchema } from '@/app/(auth)/sign-up/page'
import { SignUpSchema } from '@/schema/auth-schema'

export async function POST(request: Request) {

  const formData: tSignUpSchema = await request.json() 
  const result = SignUpSchema.safeParse(formData)
  let zodError = {}
  if(!result.success) {
    result.error.issues.forEach((issue) => {
      zodError = { ...zodError, [issue.path[0]]: issue.message }
    })
    return NextResponse.json({ errors: zodError }, { status: 400 })
  }
 
  const email = formData.email
  const password = formData.password
  const supabase = createRouteHandlerClient<Database>({ cookies })

  const res = await supabase.auth.signUp({
    email,
    password,

  })
  return NextResponse.json({data:res.data, error: res.error})
  

}