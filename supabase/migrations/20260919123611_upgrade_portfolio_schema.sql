/*
# Upgrade portfolio schema: publish/draft, hidden standards, new evidence fields, initiative/course/student_work enhancements

1. Modified Tables
- `evidence`: add is_published (boolean default false), notes (text), cover_image_path (text), academic_year (text), sort_order (integer default 0)
- `standards`: add is_hidden (boolean default false), sort_order (integer default 0)
- `initiatives`: add link_url (text), cover_image_path (text)
- `courses`: add category (text), description (text), certificate_file_path (text), cover_image_path (text)
- `student_works`: add unit (text), activity_name (text), date (text), file_path (text), standard_id (uuid FK to standards)
- `tech_tools`: add url (text)

2. New Tables
- `initiative_standards` — junction linking initiatives to standards (many-to-many)
- `tech_tool_evidence` already exists from original schema

3. Security Changes
- RLS policies updated: public SELECT only sees published evidence and non-hidden standards
- Authenticated users (admin) can see all rows and perform CRUD
- Storage policies already in place from previous migration

4. Notes
- Evidence is_published defaults to false (draft) — new evidence starts as draft
- Standards is_hidden defaults to false — existing 11 standards remain visible
- Student works now can link to a specific standard
- No data loss — all existing data preserved, new columns get safe defaults
*/

-- Add columns to evidence
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT false;
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS notes text;
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS cover_image_path text;
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS academic_year text;
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;

-- Add columns to standards
ALTER TABLE standards ADD COLUMN IF NOT EXISTS is_hidden boolean NOT NULL DEFAULT false;
ALTER TABLE standards ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;

-- Add columns to initiatives
ALTER TABLE initiatives ADD COLUMN IF NOT EXISTS link_url text;
ALTER TABLE initiatives ADD COLUMN IF NOT EXISTS cover_image_path text;

-- Add columns to courses
ALTER TABLE courses ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS certificate_file_path text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS cover_image_path text;

-- Add columns to student_works
ALTER TABLE student_works ADD COLUMN IF NOT EXISTS unit text;
ALTER TABLE student_works ADD COLUMN IF NOT EXISTS activity_name text;
ALTER TABLE student_works ADD COLUMN IF NOT EXISTS date text;
ALTER TABLE student_works ADD COLUMN IF NOT EXISTS file_path text;
ALTER TABLE student_works ADD COLUMN IF NOT EXISTS standard_id uuid REFERENCES standards(id) ON DELETE SET NULL;

-- Add columns to tech_tools
ALTER TABLE tech_tools ADD COLUMN IF NOT EXISTS url text;

-- Create initiative_standards junction
CREATE TABLE IF NOT EXISTS initiative_standards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  initiative_id uuid NOT NULL REFERENCES initiatives(id) ON DELETE CASCADE,
  standard_id uuid NOT NULL REFERENCES standards(id) ON DELETE CASCADE,
  UNIQUE(initiative_id, standard_id)
);

ALTER TABLE initiative_standards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_initiative_standards" ON initiative_standards;
CREATE POLICY "public_read_initiative_standards" ON initiative_standards FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_initiative_standards" ON initiative_standards;
CREATE POLICY "auth_insert_initiative_standards" ON initiative_standards FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_initiative_standards" ON initiative_standards;
CREATE POLICY "auth_update_initiative_standards" ON initiative_standards FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_initiative_standards" ON initiative_standards;
CREATE POLICY "auth_delete_initiative_standards" ON initiative_standards FOR DELETE
  TO authenticated USING (true);

-- Update evidence RLS: public sees only published, authenticated sees all
-- First drop old public read policy
DROP POLICY IF EXISTS "public_read_evidence" ON evidence;

-- Public can only read published evidence
CREATE POLICY "public_read_evidence" ON evidence FOR SELECT
  TO anon, authenticated USING (is_published = true);

-- Admin (authenticated) can read all evidence (including drafts)
CREATE POLICY "admin_read_all_evidence" ON evidence FOR SELECT
  TO authenticated USING (true);

-- Admin can insert/update/delete (existing policies already cover this, but let's ensure)
-- The existing auth_insert_evidence, auth_update_evidence, auth_delete_evidence policies
-- already use TO authenticated, so they're fine.

-- Update standards RLS: public sees only non-hidden, authenticated sees all
DROP POLICY IF EXISTS "public_read_standards" ON standards;

CREATE POLICY "public_read_standards" ON standards FOR SELECT
  TO anon, authenticated USING (is_hidden = false);

CREATE POLICY "admin_read_all_standards" ON standards FOR SELECT
  TO authenticated USING (true);

-- Update sort_order for existing standards based on their number
UPDATE standards SET sort_order = number WHERE sort_order = 0;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_evidence_published ON evidence(is_published);
CREATE INDEX IF NOT EXISTS idx_standards_hidden ON standards(is_hidden);
CREATE INDEX IF NOT EXISTS idx_initiative_standards_initiative ON initiative_standards(initiative_id);
CREATE INDEX IF NOT EXISTS idx_initiative_standards_standard ON initiative_standards(standard_id);
CREATE INDEX IF NOT EXISTS idx_student_works_standard ON student_works(standard_id);
