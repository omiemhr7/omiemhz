/*
# Create portfolio schema for teacher evidence file

1. New Tables
- `standards` — the 11 professional standards (معايير), pre-seeded
- `evidence` — individual evidence items (شواهد) with type, description, date, URL/file
- `evidence_standards` — many-to-many junction linking evidence to standards
- `initiatives` — educational initiatives (مبادرات)
- `initiative_evidence` — junction linking initiatives to evidence
- `tech_tools` — technology tools/platforms used (أدوات تقنية)
- `tech_tool_evidence` — junction linking tools to evidence
- `courses` — professional development courses and certifications (دورات/شهادات)
- `student_works` — student projects and achievements (أعمال الطالبات)
- `teacher_profile` — single-row teacher profile data (editable)

2. Security
- RLS enabled on all tables
- SELECT: public (anon + authenticated) — visitors can browse
- INSERT/UPDATE/DELETE: authenticated only — teacher manages content via admin panel

3. Notes
- Evidence can link to multiple standards via evidence_standards junction
- Evidence types: pdf, image, video, link, presentation, form
- File storage uses Supabase Storage bucket 'evidence-files'
*/

-- Standards table
CREATE TABLE IF NOT EXISTS standards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number integer NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE standards ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_standards" ON standards;
CREATE POLICY "public_read_standards" ON standards FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_standards" ON standards;
CREATE POLICY "auth_insert_standards" ON standards FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_standards" ON standards;
CREATE POLICY "auth_update_standards" ON standards FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_standards" ON standards;
CREATE POLICY "auth_delete_standards" ON standards FOR DELETE TO authenticated USING (true);

-- Evidence table
CREATE TABLE IF NOT EXISTS evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL DEFAULT 'link',
  description text,
  semester text,
  date text,
  url text,
  file_path text,
  is_placeholder boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_evidence" ON evidence;
CREATE POLICY "public_read_evidence" ON evidence FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_evidence" ON evidence;
CREATE POLICY "auth_insert_evidence" ON evidence FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_evidence" ON evidence;
CREATE POLICY "auth_update_evidence" ON evidence FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_evidence" ON evidence;
CREATE POLICY "auth_delete_evidence" ON evidence FOR DELETE TO authenticated USING (true);

-- Evidence-Standards junction
CREATE TABLE IF NOT EXISTS evidence_standards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  evidence_id uuid NOT NULL REFERENCES evidence(id) ON DELETE CASCADE,
  standard_id uuid NOT NULL REFERENCES standards(id) ON DELETE CASCADE,
  UNIQUE(evidence_id, standard_id)
);

ALTER TABLE evidence_standards ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_evidence_standards" ON evidence_standards;
CREATE POLICY "public_read_evidence_standards" ON evidence_standards FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_evidence_standards" ON evidence_standards;
CREATE POLICY "auth_insert_evidence_standards" ON evidence_standards FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_evidence_standards" ON evidence_standards;
CREATE POLICY "auth_update_evidence_standards" ON evidence_standards FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_evidence_standards" ON evidence_standards;
CREATE POLICY "auth_delete_evidence_standards" ON evidence_standards FOR DELETE TO authenticated USING (true);

-- Initiatives table
CREATE TABLE IF NOT EXISTS initiatives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  idea text,
  target_audience text,
  goal text,
  impact text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE initiatives ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_initiatives" ON initiatives;
CREATE POLICY "public_read_initiatives" ON initiatives FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_initiatives" ON initiatives;
CREATE POLICY "auth_insert_initiatives" ON initiatives FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_initiatives" ON initiatives;
CREATE POLICY "auth_update_initiatives" ON initiatives FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_initiatives" ON initiatives;
CREATE POLICY "auth_delete_initiatives" ON initiatives FOR DELETE TO authenticated USING (true);

-- Initiative-Evidence junction
CREATE TABLE IF NOT EXISTS initiative_evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  initiative_id uuid NOT NULL REFERENCES initiatives(id) ON DELETE CASCADE,
  evidence_id uuid NOT NULL REFERENCES evidence(id) ON DELETE CASCADE,
  UNIQUE(initiative_id, evidence_id)
);

ALTER TABLE initiative_evidence ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_initiative_evidence" ON initiative_evidence;
CREATE POLICY "public_read_initiative_evidence" ON initiative_evidence FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_initiative_evidence" ON initiative_evidence;
CREATE POLICY "auth_insert_initiative_evidence" ON initiative_evidence FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_initiative_evidence" ON initiative_evidence;
CREATE POLICY "auth_update_initiative_evidence" ON initiative_evidence FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_initiative_evidence" ON initiative_evidence;
CREATE POLICY "auth_delete_initiative_evidence" ON initiative_evidence FOR DELETE TO authenticated USING (true);

-- Tech tools table
CREATE TABLE IF NOT EXISTS tech_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  usage_description text,
  example text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tech_tools ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_tech_tools" ON tech_tools;
CREATE POLICY "public_read_tech_tools" ON tech_tools FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_tech_tools" ON tech_tools;
CREATE POLICY "auth_insert_tech_tools" ON tech_tools FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_tech_tools" ON tech_tools;
CREATE POLICY "auth_update_tech_tools" ON tech_tools FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_tech_tools" ON tech_tools;
CREATE POLICY "auth_delete_tech_tools" ON tech_tools FOR DELETE TO authenticated USING (true);

-- Tech tool-Evidence junction
CREATE TABLE IF NOT EXISTS tech_tool_evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tech_tool_id uuid NOT NULL REFERENCES tech_tools(id) ON DELETE CASCADE,
  evidence_id uuid NOT NULL REFERENCES evidence(id) ON DELETE CASCADE,
  UNIQUE(tech_tool_id, evidence_id)
);

ALTER TABLE tech_tool_evidence ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_tech_tool_evidence" ON tech_tool_evidence;
CREATE POLICY "public_read_tech_tool_evidence" ON tech_tool_evidence FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_tech_tool_evidence" ON tech_tool_evidence;
CREATE POLICY "auth_insert_tech_tool_evidence" ON tech_tool_evidence FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_tech_tool_evidence" ON tech_tool_evidence;
CREATE POLICY "auth_update_tech_tool_evidence" ON tech_tool_evidence FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_tech_tool_evidence" ON tech_tool_evidence;
CREATE POLICY "auth_delete_tech_tool_evidence" ON tech_tool_evidence FOR DELETE TO authenticated USING (true);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  provider text,
  date text,
  hours text,
  certificate_url text,
  is_certificate boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_courses" ON courses;
CREATE POLICY "public_read_courses" ON courses FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_courses" ON courses;
CREATE POLICY "auth_insert_courses" ON courses FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_courses" ON courses;
CREATE POLICY "auth_update_courses" ON courses FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_courses" ON courses;
CREATE POLICY "auth_delete_courses" ON courses FOR DELETE TO authenticated USING (true);

-- Student works table
CREATE TABLE IF NOT EXISTS student_works (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text,
  image_url text,
  url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE student_works ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_student_works" ON student_works;
CREATE POLICY "public_read_student_works" ON student_works FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_student_works" ON student_works;
CREATE POLICY "auth_insert_student_works" ON student_works FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_student_works" ON student_works;
CREATE POLICY "auth_update_student_works" ON student_works FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_student_works" ON student_works;
CREATE POLICY "auth_delete_student_works" ON student_works FOR DELETE TO authenticated USING (true);

-- Teacher profile (single row)
CREATE TABLE IF NOT EXISTS teacher_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'أ. أميمة السلمي',
  specialty text NOT NULL DEFAULT 'العلوم الإدارية',
  school text NOT NULL DEFAULT 'متوسطة وثانوية ذهبان',
  academic_year text NOT NULL DEFAULT '1448هـ',
  bio text NOT NULL DEFAULT 'معلمة في تخصص العلوم الإدارية، مهتمة بتطوير الممارسات التعليمية وتوظيف التقنيات الرقمية والذكاء الاصطناعي في التعليم، وتصميم تجارب تعلم تطبيقية تعزز مهارات الطالبات الإدارية والتقنية. حاصلة على مؤهل عالٍ في التدريب، وشهادة مهنية احترافية في تقديم التعليم والتدريب الإلكتروني، وأسعى إلى تطوير بيئة تعليمية رقمية داعمة للتعلم والتطبيق والابتكار.',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE teacher_profile ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_teacher_profile" ON teacher_profile;
CREATE POLICY "public_read_teacher_profile" ON teacher_profile FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_teacher_profile" ON teacher_profile;
CREATE POLICY "auth_insert_teacher_profile" ON teacher_profile FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_teacher_profile" ON teacher_profile;
CREATE POLICY "auth_update_teacher_profile" ON teacher_profile FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_teacher_profile" ON teacher_profile;
CREATE POLICY "auth_delete_teacher_profile" ON teacher_profile FOR DELETE TO authenticated USING (true);

-- Seed the 11 standards
INSERT INTO standards (number, title, description) VALUES
  (1, 'أداء الواجبات الوظيفية', 'الالتزام بالواجبات المهنية والإدارية المنوطة بالمعلمة'),
  (2, 'التفاعل مع المجتمع المهني', 'المشاركة الفاعلة في المجتمع المهني التعليمي وتطوير الذات'),
  (3, 'التفاعل مع أولياء الأمور', 'توثيق التواصل مع أولياء الأمور ومشاركتهم في العملية التعليمية'),
  (4, 'التنوع في استراتيجيات التدريس', 'تنويع استراتيجيات التدريس لتناسب الفروق الفردية للطالبات'),
  (5, 'تحسين نتائج المتعلمين', 'العمل على تحسين التحصيل الدراسي ونواتج التعلم'),
  (6, 'إعداد وتنفيذ خطة التعليم', 'تخطيط الدروس وتنفيذها وفق أهداف تعليمية واضحة'),
  (7, 'توظيف تقنيات ووسائل التعلم', 'دمج التقنيات الرقمية والوسائل التعليمية في العملية التعليمية'),
  (8, 'تهيئة البيئة التعليمية', 'إعداد بيئة تعليمية محفزة وداعمة للتعلم'),
  (9, 'الإدارة الصفية', 'إدارة الصف وتنظيم الوقت والأنشطة بكفاءة'),
  (10, 'تحليل نتائج المتعلمين وتشخيصها', 'تحليل وتشخيص نتائج الطالبات لاتخاذ قرارات تعليمية'),
  (11, 'تنوع أساليب التقويم', 'تنويع أساليب التقويم لقياس نواتج التعلم')
ON CONFLICT (number) DO NOTHING;

-- Seed teacher profile if not exists
INSERT INTO teacher_profile (name, specialty, school, academic_year, bio)
SELECT 'أ. أميمة السلمي', 'العلوم الإدارية', 'متوسطة وثانوية ذهبان', '1448هـ',
  'معلمة في تخصص العلوم الإدارية، مهتمة بتطوير الممارسات التعليمية وتوظيف التقنيات الرقمية والذكاء الاصطناعي في التعليم، وتصميم تجارب تعلم تطبيقية تعزز مهارات الطالبات الإدارية والتقنية. حاصلة على مؤهل عالٍ في التدريب، وشهادة مهنية احترافية في تقديم التعليم والتدريب الإلكتروني، وأسعى إلى تطوير بيئة تعليمية رقمية داعمة للتعلم والتطبيق والابتكار.'
WHERE NOT EXISTS (SELECT 1 FROM teacher_profile);

-- Seed tech tools
INSERT INTO tech_tools (name, usage_description, example)
SELECT * FROM (VALUES
  ('Canva', 'تصميم العروض التقديمية واللوحات التعليمية والإنفوجرافيك', 'تصميم عرض تقديمي تفاعلي لوحدة دراسية'),
  ('NotebookLM', 'توظيف الذكاء الاصطناعي لتحليل المصادر وتوليد الملخصات والأسئلة', 'إنشاء دفتر دراسي ذكي من مصادر الوحدة'),
  ('Gemini', 'استخدام الذكاء الاصطناعي في توليد الأفكار وتطوير المحتوى التعليمي', 'تطوير أنشطة تعليمية مخصصة للطالبات'),
  ('Nearpod', 'إنشاء دروس تفاعلية مع تقييم فوري لمستوى الفهم', 'درس تفاعلي مع اختبارات قصيرة أثناء العرض'),
  ('Padlet', 'لوحة مشاركة تفاعلية لعرض أعمال الطالبات والتعاون', 'لوحة عرض لمشاريع الطالبات الإدارية'),
  ('Google Forms', 'إنشاء استبيانات ونماذج تقويم وإحصاء النتائج', 'نموذج تقويم تشخيصي لبداية الوحدة'),
  ('Google Sites', 'إنشاء مواقع تعليمية لعرض مشاريع ومنتجات الطالبات', 'موقع عرض مشاريع الطالبات الإدارية'),
  ('منصة مدرستي', 'المنصة الرسمية لإدارة التعلم وتوصيل المحتوى للطالبات', 'إدارة الفصل الإفتراضي وتكليف الأنشطة')
) AS t(name, usage_description, example)
WHERE NOT EXISTS (SELECT 1 FROM tech_tools);

-- Seed initiatives
INSERT INTO initiatives (name, idea, target_audience, goal, impact)
SELECT * FROM (VALUES
  ('إرادة للتدريب الطلابي', 'برنامج تدريبي لتنمية المهارات الإدارية للطالبات', 'طالبات متوسطة وثانوية', 'إعداد طالبات قادرات على القيادة والإدارة', 'رفع مستوى المهارات الإدارية والقيادية للطالبات'),
  ('أثر رقمي', 'مبادرة لتوظيف الأدوات الرقمية في التعليم', 'الطالبات والمعلمات', 'نشر ثقافة التعليم الرقمي', 'زيادة استخدام الأدوات الرقمية في الأنشطة التعليمية'),
  ('مهارات طموحة', 'تطوير المهارات المهنية للطالبات', 'طالبات الثانوية', 'تأهيل الطالبات لسوق العمل', 'بناء سيرة ذاتية ومهارات مقابلة للطالبات'),
  ('أثر التعليم الأخضر', 'ربط التعليم بقضايا الاستدامة البيئية', 'جميع الطالبات', 'نشر الوعي البيئي عبر التعليم', 'مشاريع طالبات حول الاستدامة')
) AS i(name, idea, target_audience, goal, impact)
WHERE NOT EXISTS (SELECT 1 FROM initiatives);

-- Seed courses
INSERT INTO courses (name, provider, is_certificate)
SELECT * FROM (VALUES
  ('مؤهل عالٍ في التدريب', 'جهة التدريب المعتمدة', true),
  ('شهادة مهنية احترافية في تقديم التعليم والتدريب الإلكتروني', 'جهة الاعتماد المهني', true)
) AS c(name, provider, is_certificate)
WHERE NOT EXISTS (SELECT 1 FROM courses);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_evidence_standards_evidence ON evidence_standards(evidence_id);
CREATE INDEX IF NOT EXISTS idx_evidence_standards_standard ON evidence_standards(standard_id);
CREATE INDEX IF NOT EXISTS idx_initiative_evidence_initiative ON initiative_evidence(initiative_id);
CREATE INDEX IF NOT EXISTS idx_initiative_evidence_evidence ON initiative_evidence(evidence_id);
CREATE INDEX IF NOT EXISTS idx_tech_tool_evidence_tool ON tech_tool_evidence(tech_tool_id);
CREATE INDEX IF NOT EXISTS idx_tech_tool_evidence_evidence ON tech_tool_evidence(evidence_id);
