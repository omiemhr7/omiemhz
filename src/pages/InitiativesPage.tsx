import { useState } from 'react';
import { Lightbulb, Target, Users, TrendingUp, X, ArrowLeft, ExternalLink } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useInitiatives } from '@/lib/hooks';
import type { Initiative } from '@/lib/types';

export default function InitiativesPage() {
  const { initiatives, loading } = useInitiatives();
  const [selected, setSelected] = useState<Initiative | null>(null);

  const coverUrl = (path: string | null) =>
    path ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/evidence-files/${path}` : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'المبادرات والمشاريع' }]} />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy">المبادرات والمشاريع</h1>
            <p className="text-sm text-slate-500">المبادرات التعليمية والتقنية والمشاريع التطبيقية</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse h-64" />
          ))}
        </div>
      ) : initiatives.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Lightbulb className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">لا توجد مبادرات مضافة بعد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {initiatives.map((init) => (
            <div
              key={init.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-teal-300 transition-all"
            >
              {coverUrl(init.cover_image_path) && (
                <div className="h-40 overflow-hidden">
                  <img src={coverUrl(init.cover_image_path)!} alt={init.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0 ${coverUrl(init.cover_image_path) ? '' : ''}`}>
                    <Lightbulb className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy">{init.name}</h3>
                    {init.link_url && (
                      <a href={init.link_url} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-teal flex items-center gap-1 mt-0.5 hover:underline">
                        <ExternalLink className="w-3 h-3" />
                        رابط المبادرة
                      </a>
                    )}
                  </div>
                </div>

                {init.idea && (
                  <div className="mb-3">
                    <p className="text-xs text-slate-400 mb-1">الفكرة</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{init.idea}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3 mb-4">
                  {init.target_audience && (
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs text-slate-400">الفئة المستهدفة: </span>
                        <span className="text-sm text-slate-600">{init.target_audience}</span>
                      </div>
                    </div>
                  )}
                  {init.goal && (
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs text-slate-400">الهدف: </span>
                        <span className="text-sm text-slate-600">{init.goal}</span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setSelected(init)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-teal border border-teal-200 rounded-lg hover:bg-teal hover:text-white transition-colors"
                >
                  عرض التفاصيل
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Initiative detail modal */}
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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">{selected.name}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-navy-light">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {coverUrl(selected.cover_image_path) && (
                <img src={coverUrl(selected.cover_image_path)!} alt={selected.name}
                  className="w-full rounded-xl object-cover max-h-60" />
              )}
              {selected.idea && (
                <div>
                  <p className="text-xs font-bold text-slate-400 mb-1">الفكرة</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{selected.idea}</p>
                </div>
              )}
              {selected.target_audience && (
                <div>
                  <p className="text-xs font-bold text-slate-400 mb-1">الفئة المستهدفة</p>
                  <p className="text-sm text-slate-600">{selected.target_audience}</p>
                </div>
              )}
              {selected.goal && (
                <div>
                  <p className="text-xs font-bold text-slate-400 mb-1">الهدف</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{selected.goal}</p>
                </div>
              )}
              {selected.impact && (
                <div>
                  <p className="text-xs font-bold text-slate-400 mb-1">الأثر</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{selected.impact}</p>
                </div>
              )}
              {selected.link_url && (
                <a href={selected.link_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-light transition-colors text-sm">
                  <ExternalLink className="w-4 h-4" />
                  فتح رابط المبادرة
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
