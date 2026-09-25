import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  LogIn,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  BookOpen,
  FileText,
  Lightbulb,
  Monitor,
  Award,
  Users,
  User,
  Upload,
  Link2,
  Eye,
  EyeOff,
  Search,
  Filter,
  Clock,
  TrendingUp,
  BarChart3,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import {
  useStandardsAdmin,
  useEvidenceAdmin,
  useInitiatives,
  useTechTools,
  useCourses,
  useStudentWorks,
  useTeacherProfile,
  useAuth,
} from '@/lib/hooks';
import type {
  Evidence,
  EvidenceType,
  Standard,
  Initiative,
  TechTool,
  Course,
  StudentWork,
} from '@/lib/types';
import {
  EVIDENCE_TYPE_LABELS,
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
} from '@/lib/types';

type Tab = 'dashboard' | 'profile' | 'standards' | 'evidence' | 'initiatives' | 'tech' | 'courses' | 'students';

export default function AdminPage() {
  const { session, loading, isAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Tab>('dashboard');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  };

  const handleLogout = () => supabase.auth.signOut();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">جاري التحميل...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-navy">لوحة الإدارة</h1>
              <p className="text-sm text-slate-500">تسجيل الدخول للمعلمة</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                placeholder="البريد الإلكتروني"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg p-2">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-navy text-white rounded-xl font-semibold hover:bg-navy-light transition-colors"
            >
              تسجيل الدخول
            </button>
          </form>
          <p className="text-xs text-slate-400 mt-4 text-center">
            هذه اللوحة مخصصة للمعلمة فقط ولا تظهر للزوار
          </p>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: BarChart3 },
    { id: 'profile', label: 'بيانات المعلمة', icon: User },
    { id: 'standards', label: 'المعايير', icon: BookOpen },
    { id: 'evidence', label: 'الشواهد', icon: FileText },
    { id: 'initiatives', label: 'المبادرات', icon: Lightbulb },
    { id: 'tech', label: 'الأدوات التقنية', icon: Monitor },
    { id: 'courses', label: 'الدورات', icon: Award },
    { id: 'students', label: 'أعمال الطالبات', icon: Users },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy">لوحة الإدارة</h1>
            <p className="text-sm text-slate-500">{session?.user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          خروج
        </button>
      </div>

      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              tab === t.id
                ? 'bg-navy text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'dashboard' && <Dashboard />}
      {tab === 'profile' && <ProfileManager />}
      {tab === 'standards' && <StandardsManager />}
      {tab === 'evidence' && <EvidenceManager />}
      {tab === 'initiatives' && <InitiativesManager />}
      {tab === 'tech' && <TechToolsManager />}
      {tab === 'courses' && <CoursesManager />}
      {tab === 'students' && <StudentWorksManager />}
    </div>
  );
}

// ─── Dashboard ─────────────────────────────────────────────
function Dashboard() {
  const { standards } = useStandardsAdmin();
  const { evidence } = useEvidenceAdmin();
  const { initiatives } = useInitiatives();
  const { courses } = useCourses();
  const { works } = useStudentWorks();
  const [standardCounts, setStandardCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    supabase
      .from('evidence_standards')
      .select('standard_id, evidence_id')
      .then(({ data }) => {
        const counts: Record<string, number> = {};
        (data || []).forEach((row: any) => {
          counts[row.standard_id] = (counts[row.standard_id] || 0) + 1;
        });
        setStandardCounts(counts);
      });
  }, [evidence]);

  const publishedCount = evidence.filter((e) => e.is_published).length;
  const draftCount = evidence.filter((e) => !e.is_published).length;
  const recentEvidence = evidence.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={FileText} label="إجمالي الشواهد" value={evidence.length} color="navy" />
        <StatCard icon={CheckCircle2} label="شواهد منشورة" value={publishedCount} color="teal" />
        <StatCard icon={Clock} label="مسودات" value={draftCount} color="amber" />
        <StatCard icon={Lightbulb} label="المبادرات" value={initiatives.length} color="blue" />
        <StatCard icon={Award} label="الدورات والشهادات" value={courses.length} color="navy" />
        <StatCard icon={Users} label="أعمال الطالبات" value={works.length} color="teal" />
        <StatCard icon={BookOpen} label="المعايير" value={standards.length} color="blue" />
        <StatCard icon={Monitor} label="الأدوات التقنية" value={0} color="navy" />
      </div>

      {/* Evidence per standard */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-base font-bold text-navy mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-teal" />
          الشواهد حسب كل معيار
        </h3>
        <div className="space-y-2">
          {standards.map((s) => (
            <div key={s.id} className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                {String(s.number).padStart(2, '0')}
              </span>
              <span className="text-sm text-slate-600 flex-1 truncate">{s.title}</span>
              <span className="text-sm font-bold text-navy bg-slate-100 px-2.5 py-0.5 rounded-full min-w-[2rem] text-center">
                {standardCounts[s.id] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent evidence */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-base font-bold text-navy mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-teal" />
          آخر الشواهد المضافة
        </h3>
        {recentEvidence.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">لا توجد شواهد بعد</p>
        ) : (
          <div className="space-y-2">
            {recentEvidence.map((ev) => (
              <div key={ev.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-200 text-slate-600">
                    {EVIDENCE_TYPE_LABELS[ev.type]}
                  </span>
                  <span className="text-sm text-navy font-medium">{ev.title}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${ev.is_published ? 'bg-teal-50 text-teal-700' : 'bg-amber-50 text-amber-700'}`}>
                  {ev.is_published ? 'منشور' : 'مسودة'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: typeof User; label: string; value: number; color: string }) {
  const colors: Record<string, string> = {
    navy: 'bg-navy',
    teal: 'bg-teal',
    blue: 'bg-blue',
    amber: 'bg-amber-500',
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className={`w-10 h-10 rounded-lg ${colors[color] || colors.navy} flex items-center justify-center mb-2`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-2xl font-bold text-navy">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

// ─── Profile Manager ───────────────────────────────────────
function ProfileManager() {
  const { profile, setProfile } = useTeacherProfile();
  const [form, setForm] = useState(profile);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm(profile), [profile]);

  const save = async () => {
    if (!form) return;
    setSaving(true);
    const { data } = await supabase
      .from('teacher_profile')
      .update({
        name: form.name,
        specialty: form.specialty,
        school: form.school,
        academic_year: form.academic_year,
        bio: form.bio,
      })
      .eq('id', form.id)
      .select()
      .maybeSingle();
    if (data) {
      setProfile(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  };

  if (!form) return <p className="text-slate-500">جاري التحميل...</p>;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl">
      <div className="space-y-4">
        <Field label="الاسم" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="التخصص" value={form.specialty} onChange={(v) => setForm({ ...form, specialty: v })} />
        <Field label="المدرسة" value={form.school} onChange={(v) => setForm({ ...form, school: v })} />
        <Field label="العام الدراسي" value={form.academic_year} onChange={(v) => setForm({ ...form, academic_year: v })} />
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">النبذة المهنية</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            rows={5}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
          />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={save} disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal text-white rounded-lg font-medium hover:bg-teal-dark transition-colors disabled:opacity-50">
            <Save className="w-4 h-4" />
            {saving ? 'جاري الحفظ...' : 'حفظ'}
          </button>
          {saved && <span className="text-sm text-teal">تم الحفظ بنجاح</span>}
        </div>
      </div>
    </div>
  );
}

// ─── Standards Manager ─────────────────────────────────────
function StandardsManager() {
  const { standards, setStandards } = useStandardsAdmin();
  const [editing, setEditing] = useState<Standard | null>(null);
  const [showForm, setShowForm] = useState(false);

  const delete_ = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المعيار؟ سيتم حذف جميع الشواهد المرتبطة به.')) return;
    await supabase.from('standards').delete().eq('id', id);
    setStandards(standards.filter((s) => s.id !== id));
  };

  const toggleHidden = async (s: Standard) => {
    const { data } = await supabase
      .from('standards')
      .update({ is_hidden: !s.is_hidden })
      .eq('id', s.id)
      .select()
      .maybeSingle();
    if (data) setStandards(standards.map((x) => (x.id === s.id ? data : x)));
  };

  const moveOrder = async (s: Standard, dir: 'up' | 'down') => {
    const idx = standards.findIndex((x) => x.id === s.id);
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= standards.length) return;
    const swap = standards[swapIdx];
    await supabase.from('standards').update({ sort_order: swap.sort_order }).eq('id', s.id);
    await supabase.from('standards').update({ sort_order: s.sort_order }).eq('id', swap.id);
    setStandards([...standards].sort((a, b) => {
      const aOrder = a.id === s.id ? swap.sort_order : a.id === swap.id ? s.sort_order : a.sort_order;
      const bOrder = b.id === s.id ? swap.sort_order : b.id === swap.id ? s.sort_order : b.sort_order;
      return aOrder - bOrder;
    }));
  };

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => { setEditing(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg text-sm font-medium hover:bg-teal-dark">
          <Plus className="w-4 h-4" /> إضافة معيار
        </button>
      </div>

      {showForm && (
        <StandardForm standard={editing} onClose={() => setShowForm(false)}
          onSave={(s) => {
            if (editing) setStandards(standards.map((x) => (x.id === s.id ? s : x)));
            else setStandards([...standards, s].sort((a, b) => a.sort_order - b.sort_order));
            setShowForm(false);
          }} />
      )}

      <div className="space-y-2">
        {standards.map((s, idx) => (
          <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-navy text-white text-sm font-bold flex items-center justify-center">
                {String(s.number).padStart(2, '0')}
              </span>
              <div>
                <p className="font-bold text-navy text-sm">{s.title}</p>
                <p className="text-xs text-slate-500 line-clamp-1">{s.description}</p>
              </div>
              {s.is_hidden && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">مخفي</span>}
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => moveOrder(s, 'up')} disabled={idx === 0} className="p-2 text-slate-400 hover:text-navy disabled:opacity-30">
                <ArrowUp className="w-4 h-4" />
              </button>
              <button onClick={() => moveOrder(s, 'down')} disabled={idx === standards.length - 1} className="p-2 text-slate-400 hover:text-navy disabled:opacity-30">
                <ArrowDown className="w-4 h-4" />
              </button>
              <button onClick={() => toggleHidden(s)} className="p-2 text-slate-400 hover:text-teal" title={s.is_hidden ? 'إظهار' : 'إخفاء'}>
                {s.is_hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button onClick={() => { setEditing(s); setShowForm(true); }} className="p-2 text-slate-400 hover:text-teal">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => delete_(s.id)} className="p-2 text-slate-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StandardForm({ standard, onClose, onSave }: {
  standard: Standard | null;
  onClose: () => void;
  onSave: (s: Standard) => void;
}) {
  const [number, setNumber] = useState(standard?.number || 1);
  const [title, setTitle] = useState(standard?.title || '');
  const [description, setDescription] = useState(standard?.description || '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    if (standard) {
      const { data } = await supabase.from('standards').update({ number, title, description }).eq('id', standard.id).select().maybeSingle();
      if (data) onSave(data);
    } else {
      const { data } = await supabase.from('standards').insert({ number, title, description, sort_order: number }).select().maybeSingle();
      if (data) onSave(data);
    }
    setSaving(false);
  };

  return (
    <ModalForm title={standard ? 'تعديل معيار' : 'إضافة معيار'} onClose={onClose} onSave={save} saving={saving}>
      <Field label="رقم المعيار" value={String(number)} onChange={(v) => setNumber(parseInt(v) || 1)} type="number" />
      <Field label="اسم المعيار" value={title} onChange={setTitle} />
      <TextArea label="الوصف" value={description || ''} onChange={setDescription} />
    </ModalForm>
  );
}

// ─── Evidence Manager ──────────────────────────────────────
function EvidenceManager() {
  const { evidence, setEvidence, refetch } = useEvidenceAdmin();
  const { standards } = useStandardsAdmin();
  const [editing, setEditing] = useState<Evidence | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [linkedStandards, setLinkedStandards] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [filterStandard, setFilterStandard] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const delete_ = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الشاهد؟')) return;
    await supabase.from('evidence').delete().eq('id', id);
    setEvidence(evidence.filter((e) => e.id !== id));
  };

  const togglePublish = async (ev: Evidence) => {
    const { data } = await supabase
      .from('evidence')
      .update({ is_published: !ev.is_published })
      .eq('id', ev.id)
      .select()
      .maybeSingle();
    if (data) setEvidence(evidence.map((x) => (x.id === ev.id ? data : x)));
  };

  // Filter evidence
  let filtered = evidence;
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((e) => e.title.toLowerCase().includes(q) || (e.description && e.description.toLowerCase().includes(q)));
  }
  if (filterType !== 'all') {
    filtered = filtered.filter((e) => e.type === filterType);
  }
  // For standard filter, we need the junction data — fetch it
  const [evidenceIdsForStandard, setEvidenceIdsForStandard] = useState<string[] | null>(null);
  useEffect(() => {
    if (filterStandard === 'all') {
      setEvidenceIdsForStandard(null);
      return;
    }
    supabase
      .from('evidence_standards')
      .select('evidence_id')
      .eq('standard_id', filterStandard)
      .then(({ data }) => {
        setEvidenceIdsForStandard((data || []).map((d: any) => d.evidence_id));
      });
  }, [filterStandard]);

  if (evidenceIdsForStandard !== null) {
    filtered = filtered.filter((e) => evidenceIdsForStandard.includes(e.id));
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <button onClick={() => { setEditing(null); setLinkedStandards([]); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg text-sm font-medium hover:bg-teal-dark">
          <Plus className="w-4 h-4" /> إضافة شاهد
        </button>

        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="بحث..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal" />
        </div>

        <select value={filterStandard} onChange={(e) => setFilterStandard(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-teal">
          <option value="all">جميع المعايير</option>
          {standards.map((s) => (
            <option key={s.id} value={s.id}>{String(s.number).padStart(2, '0')} — {s.title}</option>
          ))}
        </select>

        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-teal">
          <option value="all">جميع الأنواع</option>
          {Object.entries(EVIDENCE_TYPE_LABELS).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
      </div>

      {showForm && (
        <EvidenceForm evidence={editing} standards={standards} initialLinks={linkedStandards}
          onClose={() => setShowForm(false)}
          onSave={() => { refetch(); setShowForm(false); }} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((ev) => (
          <div key={ev.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 whitespace-nowrap">{EVIDENCE_TYPE_LABELS[ev.type]}</span>
              <div className="min-w-0">
                <p className="font-bold text-navy text-sm truncate">{ev.title}</p>
                <span className={`text-xs ${ev.is_published ? 'text-teal' : 'text-amber-600'}`}>
                  {ev.is_published ? 'منشور' : 'مسودة'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => togglePublish(ev)} className="p-2 text-slate-400 hover:text-teal" title={ev.is_published ? 'إلغاء النشر' : 'نشر'}>
                {ev.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={async () => {
                  setEditing(ev);
                  const { data } = await supabase.from('evidence_standards').select('standard_id').eq('evidence_id', ev.id);
                  setLinkedStandards((data || []).map((d: any) => d.standard_id));
                  setShowForm(true);
                }}
                className="p-2 text-slate-400 hover:text-teal"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => delete_(ev.id)} className="p-2 text-slate-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-8 text-center">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">لا توجد شواهد مطابقة</p>
          </div>
        )}
      </div>
    </div>
  );
}

function EvidenceForm({ evidence, standards, initialLinks, onClose, onSave }: {
  evidence: Evidence | null;
  standards: Standard[];
  initialLinks: string[];
  onClose: () => void;
  onSave: () => void;
}) {
  const [title, setTitle] = useState(evidence?.title || '');
  const [type, setType] = useState<EvidenceType>(evidence?.type || 'link');
  const [description, setDescription] = useState(evidence?.description || '');
  const [semester, setSemester] = useState(evidence?.semester || '');
  const [date, setDate] = useState(evidence?.date || '');
  const [academicYear, setAcademicYear] = useState(evidence?.academic_year || '');
  const [notes, setNotes] = useState(evidence?.notes || '');
  const [url, setUrl] = useState(evidence?.url || '');
  const [filePath, setFilePath] = useState(evidence?.file_path || '');
  const [coverImagePath, setCoverImagePath] = useState(evidence?.cover_image_path || '');
  const [isPublished, setIsPublished] = useState(evidence?.is_published ?? false);
  const [links, setLinks] = useState<string[]>(initialLinks);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadingCover, setUploadingCover] = useState(false);

  const getStoragePath = (standardIds: string[]) => {
    if (standardIds.length === 0) return `evidence/general/${Date.now()}`;
    const firstStandard = standards.find((s) => s.id === standardIds[0]);
    if (firstStandard) return `evidence/standard-${String(firstStandard.number).padStart(2, '0')}/${Date.now()}`;
    return `evidence/general/${Date.now()}`;
  };

  const handleUpload = async (file: File) => {
    setUploadError('');
    if (file.size > MAX_FILE_SIZE) {
      setUploadError(`حجم الملف يتجاوز الحد المسموح (${Math.round(MAX_FILE_SIZE / 1024 / 1024)} ميجابايت)`);
      return;
    }

    setUploading(true);
    const ext = file.name.split('.').pop();
    const folder = getStoragePath(links);
    const fileName = `${folder}.${ext}`;
    const { error } = await supabase.storage.from('evidence-files').upload(fileName, file);
    if (!error) {
      setFilePath(fileName);
      if (file.type.startsWith('image/')) setType('image');
      else if (file.type === 'application/pdf') setType('pdf');
      else if (file.type.startsWith('video/')) setType('video');
      else if (file.type.includes('presentation') || file.type.includes('powerpoint')) setType('presentation');
      else if (file.type.includes('word') || file.type.includes('document')) setType('document');
      else setType('other');
    } else {
      setUploadError('فشل رفع الملف: ' + error.message);
    }
    setUploading(false);
  };

  const handleCoverUpload = async (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setUploadError('حجم صورة الغلاف يتجاوز الحد المسموح');
      return;
    }
    setUploadingCover(true);
    const ext = file.name.split('.').pop();
    const fileName = `evidence/covers/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('evidence-files').upload(fileName, file);
    if (!error) setCoverImagePath(fileName);
    setUploadingCover(false);
  };

  const save = async () => {
    setSaving(true);
    const payload = {
      title, type, description: description || null,
      semester: semester || null, date: date || null, academic_year: academicYear || null,
      notes: notes || null, url: url || null, file_path: filePath || null,
      cover_image_path: coverImagePath || null, is_published: isPublished, is_placeholder: false,
    };

    let evId: string;
    if (evidence) {
      const { data } = await supabase.from('evidence').update(payload).eq('id', evidence.id).select().maybeSingle();
      evId = evidence.id;
      if (data) {
        await supabase.from('evidence_standards').delete().eq('evidence_id', evId);
        if (links.length > 0) {
          await supabase.from('evidence_standards').insert(links.map((sid) => ({ evidence_id: evId, standard_id: sid })));
        }
        onSave();
      }
    } else {
      const { data } = await supabase.from('evidence').insert(payload).select().maybeSingle();
      if (data) {
        evId = data.id;
        if (links.length > 0) {
          await supabase.from('evidence_standards').insert(links.map((sid) => ({ evidence_id: evId, standard_id: sid })));
        }
        onSave();
      }
    }
    setSaving(false);
  };

  return (
    <ModalForm title={evidence ? 'تعديل شاهد' : 'إضافة شاهد'} onClose={onClose} onSave={save} saving={saving}>
      <Field label="اسم الشاهد" value={title} onChange={setTitle} />

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">نوع الشاهد</label>
        <select value={type} onChange={(e) => setType(e.target.value as EvidenceType)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 bg-white">
          {Object.entries(EVIDENCE_TYPE_LABELS).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
      </div>

      <TextArea label="وصف الشاهد" value={description || ''} onChange={setDescription} />

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">المعيار/المعايير المرتبطة (يمكن اختيار أكثر من معيار)</label>
        <div className="max-h-32 overflow-y-auto border border-slate-200 rounded-xl p-3 space-y-2">
          {standards.map((s) => (
            <label key={s.id} className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={links.includes(s.id)}
                onChange={(e) => {
                  if (e.target.checked) setLinks([...links, s.id]);
                  else setLinks(links.filter((id) => id !== s.id));
                }}
                className="w-4 h-4 rounded border-slate-300 text-teal focus:ring-teal" />
              {String(s.number).padStart(2, '0')} — {s.title}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="التاريخ" value={date || ''} onChange={setDate} />
        <Field label="الفصل الدراسي" value={semester || ''} onChange={setSemester} placeholder="الفصل الأول / الثاني" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="العام الدراسي" value={academicYear || ''} onChange={setAcademicYear} placeholder="1448هـ" />
      </div>

      <TextArea label="ملاحظات" value={notes || ''} onChange={setNotes} />

      <Field label="رابط خارجي" value={url || ''} onChange={setUrl} />

      {/* File upload */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">رفع ملف (PDF / صورة / فيديو / PPT / DOC)</label>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm cursor-pointer hover:bg-slate-200">
            <Upload className="w-4 h-4" />
            {uploading ? 'جاري الرفع...' : 'اختر ملف'}
            <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
          </label>
          {filePath && <span className="text-sm text-teal flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> تم رفع الملف</span>}
        </div>
        {uploadError && <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {uploadError}</p>}
        <p className="text-xs text-slate-400 mt-1">الحد الأقصى: {Math.round(MAX_FILE_SIZE / 1024 / 1024)} ميجابايت</p>
      </div>

      {/* Cover image */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">صورة الغلاف (اختياري)</label>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm cursor-pointer hover:bg-slate-200">
            <Upload className="w-4 h-4" />
            {uploadingCover ? 'جاري الرفع...' : 'اختر صورة'}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleCoverUpload(e.target.files[0])} />
          </label>
          {coverImagePath && <span className="text-sm text-teal">تم رفع صورة الغلاف</span>}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 text-teal focus:ring-teal" />
        نشر الشاهد (يظهر للزوار)
      </label>
    </ModalForm>
  );
}

// ─── Initiatives Manager ───────────────────────────────────
function InitiativesManager() {
  const { initiatives, setInitiatives } = useInitiatives();
  const { standards } = useStandardsAdmin();
  const [editing, setEditing] = useState<Initiative | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [initLinks, setInitLinks] = useState<string[]>([]);

  const delete_ = async (id: string) => {
    if (!confirm('حذف هذه المبادرة؟')) return;
    await supabase.from('initiatives').delete().eq('id', id);
    setInitiatives(initiatives.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => { setEditing(null); setInitLinks([]); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg text-sm font-medium hover:bg-teal-dark">
          <Plus className="w-4 h-4" /> إضافة مبادرة
        </button>
      </div>

      {showForm && (
        <InitiativeForm initiative={editing} standards={standards} initialLinks={initLinks}
          onClose={() => setShowForm(false)}
          onSave={() => { setShowForm(false); }} />
      )}

      <div className="space-y-2">
        {initiatives.map((i) => (
          <div key={i.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
            <p className="font-bold text-navy text-sm">{i.name}</p>
            <div className="flex gap-2">
              <button onClick={async () => {
                setEditing(i);
                const { data } = await supabase.from('initiative_standards').select('standard_id').eq('initiative_id', i.id);
                setInitLinks((data || []).map((d: any) => d.standard_id));
                setShowForm(true);
              }} className="p-2 text-slate-400 hover:text-teal">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => delete_(i.id)} className="p-2 text-slate-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InitiativeForm({ initiative, standards, initialLinks, onClose, onSave }: {
  initiative: Initiative | null;
  standards: Standard[];
  initialLinks: string[];
  onClose: () => void;
  onSave: () => void;
}) {
  const [name, setName] = useState(initiative?.name || '');
  const [idea, setIdea] = useState(initiative?.idea || '');
  const [target, setTarget] = useState(initiative?.target_audience || '');
  const [goal, setGoal] = useState(initiative?.goal || '');
  const [impact, setImpact] = useState(initiative?.impact || '');
  const [linkUrl, setLinkUrl] = useState(initiative?.link_url || '');
  const [coverPath, setCoverPath] = useState(initiative?.cover_image_path || '');
  const [links, setLinks] = useState<string[]>(initialLinks);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `initiatives/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('evidence-files').upload(fileName, file);
    if (!error) setCoverPath(fileName);
    setUploading(false);
  };

  const save = async () => {
    setSaving(true);
    const payload = { name, idea: idea || null, target_audience: target || null, goal: goal || null, impact: impact || null, link_url: linkUrl || null, cover_image_path: coverPath || null };
    let initId: string;
    if (initiative) {
      const { data } = await supabase.from('initiatives').update(payload).eq('id', initiative.id).select().maybeSingle();
      initId = initiative.id;
      if (data) {
        await supabase.from('initiative_standards').delete().eq('initiative_id', initId);
        if (links.length > 0) await supabase.from('initiative_standards').insert(links.map((sid) => ({ initiative_id: initId, standard_id: sid })));
        onSave();
      }
    } else {
      const { data } = await supabase.from('initiatives').insert(payload).select().maybeSingle();
      if (data) {
        initId = data.id;
        if (links.length > 0) await supabase.from('initiative_standards').insert(links.map((sid) => ({ initiative_id: initId, standard_id: sid })));
        onSave();
      }
    }
    setSaving(false);
  };

  return (
    <ModalForm title={initiative ? 'تعديل مبادرة' : 'إضافة مبادرة'} onClose={onClose} onSave={save} saving={saving}>
      <Field label="اسم المبادرة" value={name} onChange={setName} />
      <TextArea label="الفكرة" value={idea || ''} onChange={setIdea} />
      <Field label="الفئة المستهدفة" value={target || ''} onChange={setTarget} />
      <TextArea label="الهدف" value={goal || ''} onChange={setGoal} />
      <TextArea label="الأثر" value={impact || ''} onChange={setImpact} />
      <Field label="رابط" value={linkUrl || ''} onChange={setLinkUrl} />
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">صورة الغلاف</label>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm cursor-pointer hover:bg-slate-200">
          <Upload className="w-4 h-4" />
          {uploading ? 'جاري الرفع...' : 'اختر صورة'}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
        </label>
        {coverPath && <span className="text-sm text-teal mr-2">تم الرفع</span>}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">ربط بالمعايير</label>
        <div className="max-h-32 overflow-y-auto border border-slate-200 rounded-xl p-3 space-y-2">
          {standards.map((s) => (
            <label key={s.id} className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={links.includes(s.id)}
                onChange={(e) => { if (e.target.checked) setLinks([...links, s.id]); else setLinks(links.filter((id) => id !== s.id)); }}
                className="w-4 h-4 rounded border-slate-300 text-teal focus:ring-teal" />
              {String(s.number).padStart(2, '0')} — {s.title}
            </label>
          ))}
        </div>
      </div>
    </ModalForm>
  );
}

// ─── Tech Tools Manager ────────────────────────────────────
function TechToolsManager() {
  const { tools, setTools } = useTechTools();
  const [editing, setEditing] = useState<TechTool | null>(null);
  const [showForm, setShowForm] = useState(false);

  const delete_ = async (id: string) => {
    if (!confirm('حذف هذه الأداة؟')) return;
    await supabase.from('tech_tools').delete().eq('id', id);
    setTools(tools.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => { setEditing(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg text-sm font-medium hover:bg-teal-dark">
          <Plus className="w-4 h-4" /> إضافة أداة
        </button>
      </div>

      {showForm && (
        <TechToolForm tool={editing} onClose={() => setShowForm(false)}
          onSave={(t) => {
            if (editing) setTools(tools.map((x) => (x.id === t.id ? t : x)));
            else setTools([t, ...tools]);
            setShowForm(false);
          }} />
      )}

      <div className="space-y-2">
        {tools.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
            <div>
              <p className="font-bold text-navy text-sm">{t.name}</p>
              {t.url && <a href={t.url} target="_blank" rel="noopener noreferrer" className="text-xs text-teal flex items-center gap-1"><ExternalLink className="w-3 h-3" /> {t.url}</a>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(t); setShowForm(true); }} className="p-2 text-slate-400 hover:text-teal">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => delete_(t.id)} className="p-2 text-slate-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechToolForm({ tool, onClose, onSave }: {
  tool: TechTool | null;
  onClose: () => void;
  onSave: (t: TechTool) => void;
}) {
  const [name, setName] = useState(tool?.name || '');
  const [usage, setUsage] = useState(tool?.usage_description || '');
  const [example, setExample] = useState(tool?.example || '');
  const [url, setUrl] = useState(tool?.url || '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const payload = { name, usage_description: usage || null, example: example || null, url: url || null };
    if (tool) {
      const { data } = await supabase.from('tech_tools').update(payload).eq('id', tool.id).select().maybeSingle();
      if (data) onSave(data);
    } else {
      const { data } = await supabase.from('tech_tools').insert(payload).select().maybeSingle();
      if (data) onSave(data);
    }
    setSaving(false);
  };

  return (
    <ModalForm title={tool ? 'تعديل أداة' : 'إضافة أداة'} onClose={onClose} onSave={save} saving={saving}>
      <Field label="اسم الأداة" value={name} onChange={setName} />
      <TextArea label="وصف استخدامها" value={usage || ''} onChange={setUsage} />
      <TextArea label="طريقة التوظيف / مثال تطبيقي" value={example || ''} onChange={setExample} />
      <Field label="الرابط" value={url || ''} onChange={setUrl} />
    </ModalForm>
  );
}

// ─── Courses Manager ───────────────────────────────────────
function CoursesManager() {
  const { courses, setCourses } = useCourses();
  const [editing, setEditing] = useState<Course | null>(null);
  const [showForm, setShowForm] = useState(false);

  const delete_ = async (id: string) => {
    if (!confirm('حذف هذه الدورة؟')) return;
    await supabase.from('courses').delete().eq('id', id);
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => { setEditing(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg text-sm font-medium hover:bg-teal-dark">
          <Plus className="w-4 h-4" /> إضافة دورة / شهادة
        </button>
      </div>

      {showForm && (
        <CourseForm course={editing} onClose={() => setShowForm(false)}
          onSave={(c) => {
            if (editing) setCourses(courses.map((x) => (x.id === c.id ? c : x)));
            else setCourses([c, ...courses]);
            setShowForm(false);
          }} />
      )}

      <div className="space-y-2">
        {courses.map((c) => (
          <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
            <div>
              <p className="font-bold text-navy text-sm">{c.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                {c.is_certificate && <span className="text-xs text-teal">شهادة مهنية</span>}
                {c.category && <span className="text-xs text-slate-500">{c.category}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(c); setShowForm(true); }} className="p-2 text-slate-400 hover:text-teal">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => delete_(c.id)} className="p-2 text-slate-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CourseForm({ course, onClose, onSave }: {
  course: Course | null;
  onClose: () => void;
  onSave: (c: Course) => void;
}) {
  const [name, setName] = useState(course?.name || '');
  const [provider, setProvider] = useState(course?.provider || '');
  const [date, setDate] = useState(course?.date || '');
  const [hours, setHours] = useState(course?.hours || '');
  const [category, setCategory] = useState(course?.category || '');
  const [description, setDescription] = useState(course?.description || '');
  const [certUrl, setCertUrl] = useState(course?.certificate_url || '');
  const [certFile, setCertFile] = useState(course?.certificate_file_path || '');
  const [isCert, setIsCert] = useState(course?.is_certificate || false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `courses/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('evidence-files').upload(fileName, file);
    if (!error) setCertFile(fileName);
    setUploading(false);
  };

  const save = async () => {
    setSaving(true);
    const payload = {
      name, provider: provider || null, date: date || null, hours: hours || null,
      category: category || null, description: description || null,
      certificate_url: certUrl || null, certificate_file_path: certFile || null, is_certificate: isCert,
    };
    if (course) {
      const { data } = await supabase.from('courses').update(payload).eq('id', course.id).select().maybeSingle();
      if (data) onSave(data);
    } else {
      const { data } = await supabase.from('courses').insert(payload).select().maybeSingle();
      if (data) onSave(data);
    }
    setSaving(false);
  };

  return (
    <ModalForm title={course ? 'تعديل دورة' : 'إضافة دورة'} onClose={onClose} onSave={save} saving={saving}>
      <Field label="اسم الدورة" value={name} onChange={setName} />
      <Field label="الجهة" value={provider || ''} onChange={setProvider} />
      <div className="grid grid-cols-2 gap-3">
        <Field label="التاريخ" value={date || ''} onChange={setDate} />
        <Field label="عدد الساعات" value={hours || ''} onChange={setHours} />
      </div>
      <Field label="نوع الدورة" value={category || ''} onChange={setCategory} placeholder="تدريب / ورشة / شهادة مهنية" />
      <TextArea label="وصف مختصر" value={description || ''} onChange={setDescription} />
      <Field label="رابط الشهادة" value={certUrl || ''} onChange={setCertUrl} />
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">رفع ملف الشهادة (PDF / صورة)</label>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm cursor-pointer hover:bg-slate-200">
          <Upload className="w-4 h-4" />
          {uploading ? 'جاري الرفع...' : 'اختر ملف'}
          <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
        </label>
        {certFile && <span className="text-sm text-teal mr-2">تم الرفع</span>}
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input type="checkbox" checked={isCert} onChange={(e) => setIsCert(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 text-teal focus:ring-teal" />
        شهادة مهنية (تظهر في قسم المؤهلات)
      </label>
    </ModalForm>
  );
}

// ─── Student Works Manager ─────────────────────────────────
function StudentWorksManager() {
  const { works, setWorks } = useStudentWorks();
  const { standards } = useStandardsAdmin();
  const [editing, setEditing] = useState<StudentWork | null>(null);
  const [showForm, setShowForm] = useState(false);

  const delete_ = async (id: string) => {
    if (!confirm('حذف هذا العمل؟')) return;
    await supabase.from('student_works').delete().eq('id', id);
    setWorks(works.filter((w) => w.id !== id));
  };

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => { setEditing(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg text-sm font-medium hover:bg-teal-dark">
          <Plus className="w-4 h-4" /> إضافة عمل طالبة
        </button>
      </div>

      {showForm && (
        <StudentWorkForm work={editing} standards={standards} onClose={() => setShowForm(false)}
          onSave={(w) => {
            if (editing) setWorks(works.map((x) => (x.id === w.id ? w : x)));
            else setWorks([w, ...works]);
            setShowForm(false);
          }} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {works.map((w) => (
          <div key={w.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              {w.image_url && <img src={w.image_url} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />}
              <div className="min-w-0">
                <p className="font-bold text-navy text-sm truncate">{w.title}</p>
                {w.category && <span className="text-xs text-slate-500">{w.category}</span>}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => { setEditing(w); setShowForm(true); }} className="p-2 text-slate-400 hover:text-teal">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => delete_(w.id)} className="p-2 text-slate-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentWorkForm({ work, standards, onClose, onSave }: {
  work: StudentWork | null;
  standards: Standard[];
  onClose: () => void;
  onSave: (w: StudentWork) => void;
}) {
  const [title, setTitle] = useState(work?.title || '');
  const [description, setDescription] = useState(work?.description || '');
  const [category, setCategory] = useState(work?.category || '');
  const [unit, setUnit] = useState(work?.unit || '');
  const [activityName, setActivityName] = useState(work?.activity_name || '');
  const [date, setDate] = useState(work?.date || '');
  const [imageUrl, setImageUrl] = useState(work?.image_url || '');
  const [url, setUrl] = useState(work?.url || '');
  const [filePath, setFilePath] = useState(work?.file_path || '');
  const [standardId, setStandardId] = useState(work?.standard_id || '');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `student-works/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('evidence-files').upload(fileName, file);
    if (!error) {
      const publicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/evidence-files/${fileName}`;
      setImageUrl(publicUrl);
    }
    setUploading(false);
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `student-works/files/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('evidence-files').upload(fileName, file);
    if (!error) setFilePath(fileName);
    setUploading(false);
  };

  const save = async () => {
    setSaving(true);
    const payload = {
      title, description: description || null, category: category || null,
      unit: unit || null, activity_name: activityName || null, date: date || null,
      image_url: imageUrl || null, url: url || null, file_path: filePath || null,
      standard_id: standardId || null,
    };
    if (work) {
      const { data } = await supabase.from('student_works').update(payload).eq('id', work.id).select().maybeSingle();
      if (data) onSave(data);
    } else {
      const { data } = await supabase.from('student_works').insert(payload).select().maybeSingle();
      if (data) onSave(data);
    }
    setSaving(false);
  };

  return (
    <ModalForm title={work ? 'تعديل عمل' : 'إضافة عمل'} onClose={onClose} onSave={save} saving={saving}>
      <Field label="اسم العمل" value={title} onChange={setTitle} />
      <Field label="التصنيف" value={category || ''} onChange={setCategory} placeholder="مشروع / نشاط / نموذج رقمي" />
      <Field label="الوحدة / الموضوع" value={unit || ''} onChange={setUnit} />
      <Field label="اسم النشاط" value={activityName || ''} onChange={setActivityName} />
      <TextArea label="الوصف" value={description || ''} onChange={setDescription} />
      <Field label="تاريخ التنفيذ" value={date || ''} onChange={setDate} />
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">المعيار المرتبط</label>
        <select value={standardId} onChange={(e) => setStandardId(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 bg-white">
          <option value="">بدون معيار</option>
          {standards.map((s) => (
            <option key={s.id} value={s.id}>{String(s.number).padStart(2, '0')} — {s.title}</option>
          ))}
        </select>
      </div>
      <Field label="رابط خارجي" value={url || ''} onChange={setUrl} />
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">صورة العمل</label>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm cursor-pointer hover:bg-slate-200">
            <Upload className="w-4 h-4" />
            {uploading ? 'جاري الرفع...' : 'اختر صورة'}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
          </label>
          {imageUrl && <img src={imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">رفع ملف العمل</label>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm cursor-pointer hover:bg-slate-200">
          <Upload className="w-4 h-4" />
          {uploading ? 'جاري الرفع...' : 'اختر ملف'}
          <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} />
        </label>
        {filePath && <span className="text-sm text-teal mr-2">تم الرفع</span>}
      </div>
    </ModalForm>
  );
}

// ─── Shared form components ────────────────────────────────
function ModalForm({ title, onClose, onSave, saving, children }: {
  title: string;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-slate-200 sticky top-0 bg-white z-10">
          <h3 className="text-lg font-bold text-navy">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          {children}
          <div className="flex gap-3 pt-2">
            <button onClick={onSave} disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal text-white rounded-lg font-medium hover:bg-teal-dark transition-colors disabled:opacity-50">
              <Save className="w-4 h-4" />
              {saving ? 'جاري الحفظ...' : 'حفظ'}
            </button>
            <button onClick={onClose}
              className="px-5 py-2.5 text-slate-600 bg-slate-100 rounded-lg font-medium hover:bg-slate-200 transition-colors">
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1.5">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20" />
    </div>
  );
}

function TextArea({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1.5">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20" />
    </div>
  );
}
