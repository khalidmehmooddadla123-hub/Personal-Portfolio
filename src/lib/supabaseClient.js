import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xgcovkcdderrlgovhupk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnY292a2NkZGVycmxnb3ZodXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NDc3ODcsImV4cCI6MjA4NzIyMzc4N30.ZgtWIaXbVq0OAcFcfLQkvWi-wS1i9nhUJqvmi5Bjc3c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);