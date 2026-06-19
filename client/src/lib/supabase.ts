import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const HAS_SUPABASE = !!(supabaseUrl && supabaseAnonKey);

// Create a dummy client if env vars are missing so the app doesn't crash in demo mode
export const supabase = HAS_SUPABASE 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        signInWithOAuth: async () => ({ data: null, error: new Error('Supabase non configurato') }),
        signOut: async () => ({ error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      },
      from: () => ({
        select: async () => ({ data: [], error: null }),
        insert: async () => ({ data: null, error: null }),
        update: async () => ({ data: null, error: null }),
        delete: async () => ({ data: null, error: null }),
      })
    } as any;