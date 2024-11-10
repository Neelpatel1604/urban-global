import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://talznxmltwhweacabxdt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhbHpueG1sdHdod2VhY2FieGR0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTE4OTA5NCwiZXhwIjoyMDQ2NzY1MDk0fQ.bmO18gFA5G8r30gC56CQCH0t9wjcRzWny4Mo6cEph4Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 