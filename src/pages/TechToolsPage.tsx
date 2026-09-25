import { Monitor, Lightbulb, FileText, ExternalLink } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useTechTools } from '@/lib/hooks';

export default function TechToolsPage() {
  const { tools, loading } = useTechTools();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'التوظيف التقني والابتكار' }]} />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center">
            <Monitor className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy">التوظيف التقني والابتكار في التعليم</h1>
            <p className="text-sm text-slate-500">الأدوات والمنصات الرقمية المستخدمة في التعليم</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse h-56" />
          ))}
        </div>
      ) : tools.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Monitor className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">لا توجد أدوات تقنية مضافة بعد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-teal-300 transition-all"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                  <Monitor className="w-6 h-6 text-teal" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-navy pt-2">{tool.name}</h3>
                  {tool.url && (
                    <a href={tool.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-teal flex items-center gap-1 mt-0.5 hover:underline">
                      <ExternalLink className="w-3 h-3" />
                      {tool.url}
                    </a>
                  )}
                </div>
              </div>

              {tool.usage_description && (
                <div className="mb-3">
                  <p className="text-xs font-bold text-slate-400 mb-1 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5" />
                    كيفية التوظيف
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">{tool.usage_description}</p>
                </div>
              )}

              {tool.example && (
                <div className="mb-3">
                  <p className="text-xs font-bold text-slate-400 mb-1 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    مثال تطبيقي
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">{tool.example}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
