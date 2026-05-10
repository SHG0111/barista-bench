-- Run this in your Supabase SQL Editor to create the notifications table.
-- After running, notifications will be auto-generated from real events:
--   - New orders placed
--   - New user registrations
--   - Return requests filed

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL DEFAULT 'info',
  icon TEXT,
  title TEXT NOT NULL,
  description TEXT,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read notifications"
  ON notifications FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete notifications"
  ON notifications FOR DELETE
  USING (auth.role() = 'authenticated');
