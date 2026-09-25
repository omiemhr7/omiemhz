import { useState } from 'react';
import { Users, X, ExternalLink } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useStudentWorks } from '@/lib/hooks';
import type { StudentWork } from '@/lib/types';

export default function StudentWorksPage() {
  const { works, loading } = useStudentWorks();
  const [selected, setSelected] = useState<StudentWork | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'أعمال الطالبات وإنجازاتهن' }]} />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy">أعمال الطالبات وإنجازاتهن</h1>
            <p className="text-sm text-slate-500">المشاريع والمنتجات التعليمية والأنشطة التطبيقية</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse h-48" />
          ))}
        </div>
      ) : works.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 mb-1">لا توجد أعمال طالبات مضافة بعد</p>
          <p className="text-sm text-slate-400">يمكن إضافة المشاريع والإنجازات من خلال لوحة الإدارة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {works.map((work) => (
            <div
              key={work.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-teal-300 transition-all cursor-pointer"
              onClick={() => setSelected(work)}
            >
              {work.image_url ? (
                <div className="h-40 bg-slate-100 overflow-hidden">
                  <img src={work.image_url} alt={work.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="h-40 bg-navy flex items-center justify-center">
                  <Users className="w-10 h-10 text-navy-300" />
                </div>
              )}
              <div className="p-5">
                {work.category && (
                  <span className="text-xs text-teal bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100 mb-2 inline-block">
                    {work.category}
                  </span>
                )}
                <h3 className="font-bold text-navy text-sm mb-1 leading-tight">{work.title}</h3>
                {work.description && (
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{work.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-navy text-white">
              <h3 className="text-lg font-bold">{selected.title}</h3>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-navy-light">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {selected.image_url && (
                <div className="mb-4 rounded-xl overflow-hidden border border-slate-200">
                  <img src={selected.image_url} alt={selected.title} className="w-full" />
                </div>
              )}
              {selected.category && (
                <span className="text-xs text-teal bg-teal-50 px-2 py-1 rounded-full border border-teal-100 mb-3 inline-block">
                  {selected.category}
                </span>
              )}
              {selected.description && (
                <p className="text-slate-600 leading-relaxed mb-4">{selected.description}</p>
              )}
              {selected.url && (
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-light transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  عرض العمل
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
