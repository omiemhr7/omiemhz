# ملف الشواهد المهنية — أ. أميمة السلمي

موقع إلكتروني عربي (RTL) لإدارة وعرض ملف الشواهد المهنية التعليمية، مبني بـ React + Vite + Supabase.

## المتطلبات

- Node.js 18 أو أحدث
- npm

## التشغيل محليًا

```bash
npm install
npm run dev
```

## البناء للإنتاج

```bash
npm run build
```

الناتج في مجلد `dist/`.

## متغيرات البيئة

المشروع يحتاج إلى متغيرين في ملف `.env`:

```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
```

هذه القيم متوفرة مسبقًا في مشروع Supabase المرتبط. لا تحتاج لتعديلها إلا إذا أنشأت مشروع Supabase جديد.

---

## 1. ربط المشروع بـ GitHub

1. ادخل إلى [GitHub](https://github.com) وأنشئ مستودعًا جديدًا.
2. في مجلد المشروع، شغّل:
   ```bash
   git init
   git add .
   git commit -m "ملف الشواهد المهنية"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

---

## 2. النشر على Netlify

1. ادخل إلى [app.netlify.com](https://app.netlify.com)
2. اضغط "Add new site" → "Import an existing project"
3. اختر مستودع GitHub
4. الإعدادات:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. في قسم Environment variables، أضف:
   - `VITE_SUPABASE_URL` = رابط Supabase
   - `VITE_SUPABASE_ANON_KEY` = مفتاح Supabase
6. اضغط "Deploy"

ملف `netlify.toml` موجود مسبقًا ويضبط الإعدادات تلقائيًا.

---

## 3. النشر على Vercel

1. ادخل إلى [vercel.com](https://vercel.com)
2. اضغط "New Project" → اختر مستودع GitHub
3. الإعدادات:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. في قسم Environment Variables، أضف نفس المتغيرات (`VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY`)
5. اضغط "Deploy"

ملف `vercel.json` موجود مسبقًا للتعامل مع التوجيه (SPA routing).

---

## 4. ربط Domain خاص

### على Netlify:
1. Site settings → Domain management → Add custom domain
2. أدخل نطاقك (مثل `evidence.example.com`)
3. وجّه DNS: أضف سجل CNAME يشير إلى رابط Netlify

### على Vercel:
1. Project settings → Domains → Add
2. أدخل نطاقك
3. وجّه DNS حسب التعليمات التي يعرضها Vercel

---

## 5. ضبط متغيرات البيئة

في لوحة تحكم Netlify أو Vercel، ابحث عن Environment Variables وأضف:

| المتغير | القيمة |
|---------|--------|
| `VITE_SUPABASE_URL` | رابط مشروع Supabase |
| `VITE_SUPABASE_ANON_KEY` | مفتاح Anon من Supabase |

هذه القيم موجودة في ملف `.env` في المشروع المحلي. إذا كنت تستخدم نفس مشروع Supabase، انسخها كما هي.

---

## 6. ربط قاعدة البيانات (Supabase)

قاعدة البيانات متصلة مسبقًا عبر Supabase. جميع الجداول والسياسات (RLS) منشأة. إذا أنشأت مشروع Supabase جديد:

1. ادخل إلى [supabase.com](https://supabase.com)
2. أنشئ مشروعًا جديدًا
3. في SQL Editor، نفّذ ملفات الترحيل بالترتيب:
   - `supabase/migrations/20260919121937_create_portfolio_schema.sql`
   - `supabase/migrations/20260919121956_storage_policies.sql`
   - `supabase/migrations/20260919123611_upgrade_portfolio_schema.sql`
4. في Storage، أنشئ Bucket باسم `evidence-files` (عام)
5. حدّث `.env` بمفاتيح المشروع الجديد

---

## 7. ربط Storage

مجلد التخزين `evidence-files` منشأ في Supabase Storage. الملفات تُخزّن في مسارات منظمة:

```
evidence-files/
  evidence/
    standard-01/   ← ملفات معيار 1
    standard-02/   ← ملفات معيار 2
    ...
    standard-11/   ← ملفات معيار 11
    covers/        ← صور غلاف الشواهد
    general/       ← ملفات غير مرتبطة بمعيار محدد
  initiatives/     ← صور المبادرات
  courses/         ← ملفات الشهادات
  student-works/   ← أعمال الطالبات
```

الملف يُخزن مرة واحدة فقط، ويربط بالمعايير عبر جدول `evidence_standards`.

---

## 8. إنشاء حساب Admin

حساب الإدارة الأساسي منشأ مسبقًا بالبريد:

```
Omiemh.r7@gmail.com
```

إذا احتجت لإعادة إنشائه في مشروع Supabase جديد:

1. ادخل إلى Supabase Dashboard → Authentication → Users
2. اضغط "Add user"
3. أدخل البريد: `Omiemh.r7@gmail.com`
4. أدخل كلمة مرور قوية
5. تأكد من تفعيل "Auto Confirm User"

أو عبر SQL:
```sql
-- في Supabase SQL Editor
-- استبدل PASSWORD بكلمة مرور قوية
INSERT INTO auth.users (
  instance_id, id, aud, role, email,
  email_confirmed_at, encrypted_password,
  email_change_confirm_status, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data, is_sso_user
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(), 'authenticated', 'authenticated',
  'Omiemh.r7@gmail.com', now(),
  crypt('YOUR_PASSWORD', gen_salt('bf')),
  0, now(), now(),
  '{"role":"admin"}'::jsonb, '{"role":"admin"}'::jsonb, false
);
```

---

## 9. تسجيل الدخول لأول مرة

1. افتح الموقع واذهب إلى الرابط: `yourdomain.com/admin`
2. أو اضغط رابط "لوحة الإدارة" في أسفل الموقع (التذييل)
3. أدخل البريد: `Omiemh.r7@gmail.com`
4. أدخل كلمة المرور التي ضبطتها
5. ستظهر لوحة التحكم مع الإحصائيات

---

## 10. رفع أول شاهد

1. بعد تسجيل الدخول، اذهب إلى تبويب "الشواهد"
2. اضغط "إضافة شاهد"
3. املأ البيانات:
   - اسم الشاهد
   - نوع الشاهد (PDF / صورة / فيديو / رابط...)
   - المعايير المرتبطة (يمكن اختيار أكثر من معيار)
   - التاريخ / الفصل الدراسي / العام الدراسي
   - الوصف والملاحظات
4. ارفع الملف (PDF / صورة / فيديو) أو أضف رابطًا خارجيًا
5. اختر "نشر الشاهد" إذا تريد ظهوره للزوار
6. اضغط "حفظ"

الشاهد سيظهر تلقائيًا في صفحة المعيار المرتبط به.

---

## 11. النسخ الاحتياطي

### نسخ احتياطي لقاعدة البيانات:
1. Supabase Dashboard → Database → Backups
2. Supabase يحتفظ بنسخ احتياطية تلقائية يومية
3. لنسخة يدوية: Database → SQL Editor → نفّذ:
   ```sql
   -- تصدير البيانات (يمكن استخدام pg_dump عبر Supabase CLI)
   ```

### نسخ احتياطي للملفات:
1. Supabase Dashboard → Storage
2. Bucket `evidence-files` يحتوي على جميع الملفات
3. يمكن تنزيل الملفات يدويًا أو استخدام Supabase CLI

### فصل البيانات عن الواجهة:
- الواجهة (Frontend): الكود في GitHub، يُنشر على Netlify/Vercel
- قاعدة البيانات: في Supabase (منفصلة تمامًا)
- تخزين الملفات: في Supabase Storage (منفصل تمامًا)

إعادة نشر الواجهة لا تؤثر على البيانات أو الملفات.

---

## الأمان

- Row Level Security (RLS) مفعّل على جميع الجداول
- الزوار (anon) يرون الشواهد المنشورة فقط (`is_published = true`)
- الزوار يرون المعايير غير المخفية فقط (`is_hidden = false`)
- عمليات الإضافة والتعديل والحذف متاحة للمستخدم المسجّل فقط (authenticated)
- لوحة الإدارة محمية بمصادقة Supabase Auth
- التحقق من البريد الإلكتروني: فقط `Omiemh.r7@gmail.com` يُعتبر admin
- لا توجد كلمات مرور أو مفاتيح API في كود الواجهة

---

## التقنيات المستخدمة

- **React 18** + **TypeScript**
- **Vite** للبناء
- **Tailwind CSS** للتصميم
- **Supabase** (قاعدة بيانات + مصادقة + تخزين ملفات)
- **React Router** للتنقل
- **Lucide React** للأيقونات
- خط **Cairo** العربي
Netlify deployment update
