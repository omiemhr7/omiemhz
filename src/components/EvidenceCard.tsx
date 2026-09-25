import { Calendar, ExternalLink } from 'lucide-react';
import type { Evidence } from '@/lib/types';
import { EVIDENCE_TYPE_LABELS } from '@/lib/types';
import { evidenceIcons } from '@/components/evidenceIcons';

export default function EvidenceCard({
  evidence,
  onClick,
}: {
  evidence: Evidence;
  onClick: () => void;
}) {
  const Icon = evidenceIcons[evidence.type] || evidenceIcons.link;

  const typeColors: Record<string, string> = {
    pdf: 'bg-red-50 text-red-700 border-red-200',
    image: 'bg-green-50 text-green-700 border-green-200',
    video: 'bg-blue-50 text-blue-700 border-blue-200',
    link: 'bg-teal-50 text-teal-700 border-teal-200',
    presentation: 'bg-amber-50 text-amber-700 border-amber-200',
    document: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    other: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const coverUrl = evidence.cover_image_path
    ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/evidence-files/${evidence.cover_image_path}`
    : null;

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl border border-slate-200 hover:shadow-lg hover:border-teal-300 transition-all cursor-pointer overflow-hidden"
    >
      {coverUrl && (
        <div className="h-32 bg-slate-100 overflow-hidden">
          <img src={coverUrl} alt={evidence.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-navy flex items-center justify-center group-hover:bg-teal transition-colors shrink-0">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-navy text-sm leading-tight">{evidence.title}</h4>
              <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full border ${typeColors[evidence.type] || typeColors.other}`}>
                {EVIDENCE_TYPE_LABELS[evidence.type]}
              </span>
            </div>
          </div>
        </div>

        {evidence.description && (
          <p className="text-sm text-slate-500 line-clamp-2 mb-3 leading-relaxed">
            {evidence.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            {evidence.semester && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {evidence.semester}
              </span>
            )}
            {evidence.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {evidence.date}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-teal group-hover:gap-2 transition-all">
            عرض الشاهد
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
