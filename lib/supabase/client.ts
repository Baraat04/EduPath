import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
   "https://hznxkbogplasykzrjedo.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bnhrYm9ncGxhc3lrenJqZWRvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2MDA5MCwiZXhwIjoyMDkyMjM2MDkwfQ.JNFBgj2c2wITAxq_oQgN-Yo2HYhj4JuUR6d6MUH1UPg",
  )
}
