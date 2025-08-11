import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// Prefer publishable key; fallback to anon key if needed
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const createClient = async (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient(supabaseUrl, supabaseKey!, {
    cookies: {
      async getAll() {
        return (await cookieStore).getAll()
      },
      async setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            ;(await cookieStore).set(name, value, options)
          }
        } catch {
          // Server Component çağrısı sırasında setAll tetiklenebilir; middleware'de ele alınır
        }
      },
    },
  })
}


