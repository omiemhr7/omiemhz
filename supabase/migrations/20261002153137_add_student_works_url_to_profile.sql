-- Add a single centralized student works file URL to teacher_profile
ALTER TABLE teacher_profile ADD COLUMN IF NOT EXISTS student_works_url text;
