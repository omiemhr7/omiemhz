import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Layers } from 'lucide-react';
import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import EvidenceCard from '@/components/EvidenceCard';
import EvidenceModal from '@/components/EvidenceModal';
import { useStandard } from '@/lib/hooks';
import type { Evidence } from '@/lib/types';

export default function StandardDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { standard, evidence, loading } = useStandard(id);
  const [selected, setSelected] = useState<Evidence | null>(null);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-slate-200 p-8 animate-pulse h-64" />
      </div>
    );
  }

  if (!standard) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-slate-500 mb-4">لم يتم العثور على المعيار</p>
        <Link to="/standards" className="text-teal hover:underline">العودة للمعايير</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'المعايير', to: '/standards' },
          { label: `المعيار ${String(standard.number).padStart(2, '0')}` },
        ]}
      />

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="bg-navy text-white p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-teal flex items-center justify-center shrink-0">
              <span className="text-white text-xl font-bold">
                {String(standard.number).padStart(2, '0')}
              </span>
            </div>
            <div>
              <p className="text-teal-light text-sm mb-1">المعيار {String(standard.number).padStart(2, '0')}</p>
              <h1 className="text-xl lg:text-2xl font-bold mb-2">{standard.title}</h1>
              {standard.description && (
                <p className="text-navy-200 leading-relaxed text-sm max-w-2xl">
                  {standard.description}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Layers className="w-4 h-4 text-teal" />
            عدد الشواهد: <span className="font-bold text-navy">{evidence.length}</span>
          </div>
          <button
            onClick={() => navigate('/standards')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-navy bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للمعايير
          </button>
        </div>
      </div>

      {/* Evidence list */}
      <div>
        <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-teal" />
          الشواهد المرتبطة بالمعيار
        </h2>

        {evidence.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 mb-2">لا توجد شواهد مرتبطة بهذا المعيار بعد</p>
            <p className="text-sm text-slate-400">سيتم إضافة الشواهد لاحقًا من خلال لوحة الإدارة</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evidence.map((ev) => (
              <EvidenceCard key={ev.id} evidence={ev} onClick={() => setSelected(ev)} />
            ))}
          </div>
        )}
      </div>

      <EvidenceModal evidence={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
