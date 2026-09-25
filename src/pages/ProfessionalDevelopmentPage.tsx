import { Award, BookOpen, Clock, Building2, ExternalLink, FileText, Tag } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useCourses } from '@/lib/hooks';
import type { Course } from '@/lib/types';

export default function ProfessionalDevelopmentPage() {
  const { courses, loading } = useCourses();

  const certificates = courses.filter((c) => c.is_certificate);
  const trainings = courses.filter((c) => !c.is_certificate);

  const certFileUrl = (path: string | null) =>
    path ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/evidence-files/${path}` : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'التطوير المهني' }]} />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy">التطوير المهني</h1>
            <p className="text-sm text-slate-500">المؤهلات والشهادات والدورات التدريبية</p>
          </div>
        </div>
      </div>

      {/* Certificates section */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-teal" />
          المؤهلات والشهادات المهنية
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse h-32" />
            ))}
          </div>
        ) : certificates.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <Award className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">لا توجد شهادات مضافة بعد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {certificates.map((cert) => (
              <CertificateCard key={cert.id} cert={cert} certFileUrl={certFileUrl} />
            ))}
          </div>
        )}
      </section>

      {/* Trainings section */}
      <section>
        <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal" />
          الدورات والورش التدريبية
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse h-40" />
            ))}
          </div>
        ) : trainings.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">لا توجد دورات مضافة بعد</p>
            <p className="text-xs text-slate-400 mt-1">يمكن إضافة الدورات والورش التدريبية من خلال لوحة الإدارة</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {trainings.map((course) => (
              <TrainingCard key={course.id} course={course} certFileUrl={certFileUrl} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function CertificateCard({ cert, certFileUrl }: { cert: Course; certFileUrl: (p: string | null) => string | null }) {
  const certUrl = cert.certificate_url || certFileUrl(cert.certificate_file_path);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-teal-300 transition-all">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
          <Award className="w-6 h-6 text-teal" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-navy mb-1">{cert.name}</h3>
          {cert.provider && (
            <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-2">
              <Building2 className="w-4 h-4" />
              {cert.provider}
            </p>
          )}
          {cert.category && (
            <span className="inline-flex items-center gap-1 text-xs text-teal bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100 mb-2">
              <Tag className="w-3 h-3" />
              {cert.category}
            </span>
          )}
          {cert.description && (
            <p className="text-sm text-slate-500 leading-relaxed mb-2">{cert.description}</p>
          )}
          {certUrl && (
            <a
              href={certUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-teal hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              عرض الشهادة
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function TrainingCard({ course, certFileUrl }: { course: Course; certFileUrl: (p: string | null) => string | null }) {
  const certUrl = course.certificate_url || certFileUrl(course.certificate_file_path);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-teal-300 transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-navy text-sm leading-tight pt-1">{course.name}</h3>
          {course.category && (
            <span className="inline-flex items-center gap-1 text-xs text-teal bg-teal-50 px-1.5 py-0.5 rounded-full border border-teal-100 mt-1">
              <Tag className="w-3 h-3" />
              {course.category}
            </span>
          )}
        </div>
      </div>
      {course.description && (
        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{course.description}</p>
      )}
      <div className="space-y-1.5 text-sm text-slate-500">
        {course.provider && (
          <p className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-slate-400" />
            {course.provider}
          </p>
        )}
        {course.date && (
          <p className="flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-slate-400" />
            {course.date}
          </p>
        )}
        {course.hours && (
          <p className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            {course.hours} ساعة
          </p>
        )}
      </div>
      {certUrl && (
        <a
          href={certUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-3 text-sm text-teal hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          عرض الشهادة
        </a>
      )}
    </div>
  );
}
