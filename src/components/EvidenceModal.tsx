import { X, ExternalLink, Download, Calendar, FileText, Image as ImageIcon, Video, Link as LinkIcon, Presentation, FileType, File, ZoomIn } from 'lucide-react';
import type { Evidence } from '@/lib/types';
import { EVIDENCE_TYPE_LABELS } from '@/lib/types';
import { useEffect, useState } from 'react';

const typeIcons: Record<string, typeof FileText> = {
  pdf: FileText,
  image: ImageIcon,
  video: Video,
  link: LinkIcon,
  presentation: Presentation,
  document: FileType,
  other: File,
};

export default function EvidenceModal({
  evidence,
  onClose,
}: {
  evidence: Evidence | null;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (evidence) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [evidence]);

  useEffect(() => {
    setZoomed(false);
  }, [evidence]);

  if (!evidence) return null;

  const Icon = typeIcons[evidence.type] || FileText;
  const fileUrl = evidence.file_path
    ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/evidence-files/${evidence.file_path}`
    : null;
  const contentUrl = fileUrl || evidence.url;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-navy text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold leading-tight">{evidence.title}</h3>
              <p className="text-sm text-navy-200">{EVIDENCE_TYPE_LABELS[evidence.type]}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-navy-light transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1">
          {evidence.description && (
            <p className="text-slate-600 leading-relaxed mb-4">{evidence.description}</p>
          )}

          <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-500">
            {evidence.semester && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {evidence.semester}
              </span>
            )}
            {evidence.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {evidence.date}
              </span>
            )}
            {evidence.academic_year && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {evidence.academic_year}
              </span>
            )}
          </div>

          {evidence.notes && (
            <div className="mb-4 bg-slate-50 border border-slate-200 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">ملاحظات</p>
              <p className="text-sm text-slate-600">{evidence.notes}</p>
            </div>
          )}

          {/* Content preview */}
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
            {evidence.type === 'image' && contentUrl ? (
              <div className="relative">
                <img
                  src={contentUrl}
                  alt={evidence.title}
                  className={`w-full ${zoomed ? 'max-h-[600px]' : 'max-h-[400px]'} object-contain cursor-zoom-in`}
                  onClick={() => setZoomed(!zoomed)}
                />
                <button
                  onClick={() => setZoomed(!zoomed)}
                  className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy/80 text-white rounded-lg text-xs hover:bg-navy"
                >
                  <ZoomIn className="w-4 h-4" />
                  {zoomed ? 'تصغير' : 'تكبير'}
                </button>
              </div>
            ) : evidence.type === 'video' && contentUrl ? (
              <video src={contentUrl} controls className="w-full max-h-[400px]" />
            ) : evidence.type === 'pdf' && contentUrl ? (
              <iframe src={contentUrl} className="w-full h-[500px]" title={evidence.title} />
            ) : evidence.type === 'link' && contentUrl ? (
              <div className="p-8 text-center">
                <LinkIcon className="w-12 h-12 text-teal mx-auto mb-3" />
                <p className="text-slate-600 mb-3">رابط خارجي للشاهد</p>
                <a
                  href={contentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-light transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  فتح الرابط
                </a>
              </div>
            ) : evidence.type === 'presentation' && contentUrl ? (
              <iframe src={contentUrl} className="w-full h-[500px]" title={evidence.title} />
            ) : (evidence.type === 'document' || evidence.type === 'other') && contentUrl ? (
              <div className="p-8 text-center">
                <Icon className="w-12 h-12 text-teal mx-auto mb-3" />
                <p className="text-slate-600 mb-3">{EVIDENCE_TYPE_LABELS[evidence.type]}</p>
                <a
                  href={contentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-light transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  فتح الملف
                </a>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Icon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">لا يوجد معاينة متاحة</p>
              </div>
            )}
          </div>

          {contentUrl && (evidence.type === 'pdf' || evidence.type === 'image' || evidence.type === 'document' || evidence.type === 'other') && (
            <a
              href={contentUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              تحميل الملف
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
