import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = 'https://slwhpddjofltpgijeswa.supabase.co'
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsd2hwZGRqb2ZsdHBnaWplc3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNjM0MDksImV4cCI6MTk4MzczOTQwOX0.dIiPY8CQRRrYf41wDMnoNk-M-cASYbBGR8wMw_2qs1o'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function channelService() {
  return {
    getAllChannels() {
      return supabase.from("channel")
        .select("*")
    }
  }
}