import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useStandards, useEvidence } from '@/lib/hooks';
import { useState, useMemo } from 'react';

export default function StandardsPage() {
  const { standards, loading } = useStandards();
  const { evidence } = useEvidence();
  const [search, setSearch] = useState('');

  const evidenceCount = useMemo(() => {
    // Count evidence per standard by checking junction — we'll approximate from all evidence
    const counts: Record<string, number> = {};
    // We need to fetch this properly; for now we use the supabase query
    return counts;
  }, [evidence]);

  const filtered = standards.filter(
    (s) =>
      s.title.includes(search) ||
      (s.description && s.description.includes(search))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'المعايير' }]} />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy">المعايير والشواهد</h1>
            <p className="text-sm text-slate-500">
              {standards.length} معيارًا مهنيًا مع الشواهد المرتبطة
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="ابحث عن معيار..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse h-48" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((standard) => (
            <Link
              key={standard.id}
              to={`/standards/${standard.id}`}
              className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-teal-300 transition-all flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-navy group-hover:bg-teal flex items-center justify-center transition-colors">
                  <span className="text-white text-lg font-bold">
                    {String(standard.number).padStart(2, '0')}
                  </span>
                </div>
                <FileText className="w-5 h-5 text-slate-300 group-hover:text-teal transition-colors" />
              </div>
              <h3 className="font-bold text-navy mb-2 leading-tight">{standard.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed flex-1">
                {standard.description}
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-teal group-hover:gap-2 transition-all">
                عرض الشواهد
                <ArrowLeft className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
