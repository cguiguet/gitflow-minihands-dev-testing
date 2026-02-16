import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://rftnyvxrglbkghpqjffp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmdG55dnhyZ2xia2docHFqZmZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTY3NTEsImV4cCI6MjA4NjU3Mjc1MX0.5My27yPH573ChbBAR9aFiAmNQmLqq2Amr6U2umf_Jn0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
