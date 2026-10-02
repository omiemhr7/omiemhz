import { Award, ExternalLink, FileText } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useTeacherProfile } from '@/lib/hooks';

export default function StudentWorksPage() {
  const { profile, loading } = useTeacherProfile();
  const fileUrl = profile?.student_works_url || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'إنجازات الطالبات' }]} />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy">إنجازات الطالبات</h1>
            <p className="text-sm text-slate-500">الملف الشامل لأعمال وإنجازات الطالبات</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse h-48" />
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-teal-300 transition-all">
            <div className="h-32 bg-navy flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-teal/20 border border-teal/30 flex items-center justify-center">
                <FileText className="w-8 h-8 text-teal-light" />
              </div>
            </div>
            <div className="p-8 text-center">
              <h2 className="text-xl font-bold text-navy mb-3">ملف إنجاز الطالبات</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                ملف إلكتروني شامل يوثّق أعمال وإنجازات طالبات الصف خلال المقرر.
              </p>
              {fileUrl ? (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-xl font-semibold hover:bg-teal-dark transition-colors shadow-lg shadow-teal/20"
                >
                  <ExternalLink className="w-5 h-5" />
                  استعراض ملف الإنجاز
                </a>
              ) : (
                <p className="text-sm text-slate-400">سيتم إضافة رابط الملف قريبًا</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
