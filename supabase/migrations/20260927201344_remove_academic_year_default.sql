-- Remove the default academic year value and clear existing data
ALTER TABLE teacher_profile ALTER COLUMN academic_year SET DEFAULT '';
UPDATE teacher_profile SET academic_year = '' WHERE academic_year = '1448هـ';
