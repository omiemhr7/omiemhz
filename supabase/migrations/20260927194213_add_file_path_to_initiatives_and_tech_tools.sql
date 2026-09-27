-- Add file_path column to initiatives for file attachments
ALTER TABLE initiatives ADD COLUMN IF NOT EXISTS file_path text;

-- Add file_path column to tech_tools for file attachments
ALTER TABLE tech_tools ADD COLUMN IF NOT EXISTS file_path text;
