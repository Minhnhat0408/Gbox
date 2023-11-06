import { createClient } from '@supabase/supabase-js'
export const supabaseRealtime = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string,  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)