import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, FileText, Lightbulb, Monitor, Award, Users, BookOpen, Filter } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import EvidenceCard from '@/components/EvidenceCard';
import EvidenceModal from '@/components/EvidenceModal';
import {
  useStandards,
  useEvidence,
  useInitiatives,
  useTechTools,
  useCourses,
  useStudentWorks,
} from '@/lib/hooks';
import { EVIDENCE_TYPE_LABELS } from '@/lib/types';
import type { Evidence } from '@/lib/types';

type FilterType = 'all' | 'standards' | 'evidence' | 'initiatives' | 'tech' | 'courses' | 'students';

const filterOptions: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'جميع المعايير' },
  { value: 'evidence', label: 'جميع أنواع الشواهد' },
  { value: 'initiatives', label: 'المبادرات' },
  { value: 'courses', label: 'التطوير المهني' },
  { value: 'tech', label: 'التقنية' },
  { value: 'students', label: 'أعمال الطالبات' },
];

export default function SearchPage() {
  const { standards } = useStandards();
  const { evidence } = useEvidence();
  const { initiatives } = useInitiatives();
  const { tools } = useTechTools();
  const { courses } = useCourses();
  const { works } = useStudentWorks();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [evModal, setEvModal] = useState<Evidence | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (text: string) => text.toLowerCase().includes(q);

    return {
      standards: (filter === 'all' || filter === 'standards') && q
        ? standards.filter((s) => match(s.title) || (s.description && match(s.description)))
        : [],
      evidence: (filter === 'all' || filter === 'evidence') && q
        ? evidence.filter((e) =>
            match(e.title) ||
            (e.description && match(e.description)) ||
            match(EVIDENCE_TYPE_LABELS[e.type])
          )
        : [],
      initiatives: (filter === 'all' || filter === 'initiatives') && q
        ? initiatives.filter((i) =>
            match(i.name) || (i.idea && match(i.idea)) || (i.goal && match(i.goal))
          )
        : [],
      tech: (filter === 'all' || filter === 'tech') && q
        ? tools.filter((t) =>
            match(t.name) || (t.usage_description && match(t.usage_description))
          )
        : [],
      courses: (filter === 'all' || filter === 'courses') && q
        ? courses.filter((c) =>
            match(c.name) || (c.provider && match(c.provider))
          )
        : [],
      students: (filter === 'all' || filter === 'students') && q
        ? works.filter((w) =>
            match(w.title) || (w.description && match(w.description)) || (w.category && match(w.category))
          )
        : [],
    };
  }, [query, filter, standards, evidence, initiatives, tools, courses, works]);

  const totalCount =
    results.standards.length +
    results.evidence.length +
    results.initiatives.length +
    results.tech.length +
    results.courses.length +
    results.students.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'البحث والتصفية' }]} />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center">
            <SearchIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy">البحث والتصفية</h1>
            <p className="text-sm text-slate-500">ابحث في جميع محتوى الملف</p>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative mb-4">
          <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث عن معيار، شاهد، مبادرة، أداة تقنية..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pr-12 pl-4 py-3.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-slate-400" />
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === opt.value
                  ? 'bg-navy text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {!query && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <SearchIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">ابدأ بالكتابة للبحث في محتوى الملف</p>
        </div>
      )}

      {query && totalCount === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <SearchIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">لا توجد نتائج مطابقة لبحثك</p>
        </div>
      )}

      {/* Results */}
      {query && totalCount > 0 && (
        <div className="space-y-8">
          <p className="text-sm text-slate-500">{totalCount} نتيجة</p>

          {/* Standards */}
          {results.standards.length > 0 && (
            <ResultSection icon={BookOpen} title="المعايير" count={results.standards.length}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.standards.map((s) => (
                  <Link
                    key={s.id}
                    to={`/standards/${s.id}`}
                    className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-teal-300 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-10 h-10 rounded-lg bg-navy text-white text-sm font-bold flex items-center justify-center">
                        {String(s.number).padStart(2, '0')}
                      </span>
                      <h4 className="font-bold text-navy text-sm">{s.title}</h4>
                    </div>
                    {s.description && <p className="text-xs text-slate-500 line-clamp-2">{s.description}</p>}
                  </Link>
                ))}
              </div>
            </ResultSection>
          )}

          {/* Evidence */}
          {results.evidence.length > 0 && (
            <ResultSection icon={FileText} title="الشواهد" count={results.evidence.length}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.evidence.map((ev) => (
                  <EvidenceCard key={ev.id} evidence={ev} onClick={() => setEvModal(ev)} />
                ))}
              </div>
            </ResultSection>
          )}

          {/* Initiatives */}
          {results.initiatives.length > 0 && (
            <ResultSection icon={Lightbulb} title="المبادرات" count={results.initiatives.length}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.initiatives.map((i) => (
                  <Link
                    key={i.id}
                    to="/initiatives"
                    className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-teal-300 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-teal" />
                      </div>
                      <h4 className="font-bold text-navy text-sm">{i.name}</h4>
                    </div>
                    {i.idea && <p className="text-xs text-slate-500 line-clamp-2">{i.idea}</p>}
                  </Link>
                ))}
              </div>
            </ResultSection>
          )}

          {/* Tech tools */}
          {results.tech.length > 0 && (
            <ResultSection icon={Monitor} title="الأدوات التقنية" count={results.tech.length}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.tech.map((t) => (
                  <Link
                    key={t.id}
                    to="/tech-tools"
                    className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-teal-300 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center">
                        <Monitor className="w-5 h-5 text-teal" />
                      </div>
                      <h4 className="font-bold text-navy text-sm">{t.name}</h4>
                    </div>
                    {t.usage_description && <p className="text-xs text-slate-500 line-clamp-2">{t.usage_description}</p>}
                  </Link>
                ))}
              </div>
            </ResultSection>
          )}

          {/* Courses */}
          {results.courses.length > 0 && (
            <ResultSection icon={Award} title="الدورات والشهادات" count={results.courses.length}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.courses.map((c) => (
                  <Link
                    key={c.id}
                    to="/professional-development"
                    className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-teal-300 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-navy text-sm">{c.name}</h4>
                    </div>
                    {c.provider && <p className="text-xs text-slate-500">{c.provider}</p>}
                  </Link>
                ))}
              </div>
            </ResultSection>
          )}

          {/* Student works */}
          {results.students.length > 0 && (
            <ResultSection icon={Users} title="أعمال الطالبات" count={results.students.length}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.students.map((w) => (
                  <Link
                    key={w.id}
                    to="/student-works"
                    className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-teal-300 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-navy text-sm">{w.title}</h4>
                    </div>
                    {w.description && <p className="text-xs text-slate-500 line-clamp-2">{w.description}</p>}
                  </Link>
                ))}
              </div>
            </ResultSection>
          )}
        </div>
      )}

      <EvidenceModal evidence={evModal} onClose={() => setEvModal(null)} />
    </div>
  );
}

function ResultSection({
  icon: Icon,
  title,
  count,
  children,
}: {
  icon: typeof FileText;
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-base font-bold text-navy mb-3 flex items-center gap-2">
        <Icon className="w-5 h-5 text-teal" />
        {title}
        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{count}</span>
      </h3>
      {children}
    </div>
  );
}
