import { Link } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Lightbulb,
  Monitor,
  Award,
  Users,
  ArrowLeft,
  Briefcase,
  Target,
  Sparkles,
} from 'lucide-react';
import { useTeacherProfile, useStandards } from '@/lib/hooks';

export default function HomePage() {
  const { profile } = useTeacherProfile();
  const { standards } = useStandards();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-teal blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/20 border border-teal/30 text-teal-light text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                ملف شواهد مهني رقمي
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4">
                ملف الشواهد المهنية
              </h1>
              <h2 className="text-xl lg:text-2xl text-teal-light font-semibold mb-6">
                {profile?.name || 'أ. أميمة السلمي'}
              </h2>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-1.5 rounded-lg bg-navy-light border border-navy-700 text-sm">
                  {profile?.specialty || 'العلوم الإدارية'}
                </span>
                <span className="px-4 py-1.5 rounded-lg bg-navy-light border border-navy-700 text-sm">
                  {profile?.school || 'متوسطة وثانوية ذهبان'}
                </span>
                <span className="px-4 py-1.5 rounded-lg bg-navy-light border border-navy-700 text-sm">
                  {profile?.academic_year || '1448هـ'}
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/standards"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-xl font-semibold hover:bg-teal-dark transition-colors shadow-lg shadow-teal/20"
                >
                  استعراض المعايير والشواهد
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-navy-light text-white rounded-xl font-semibold hover:bg-navy-700 transition-colors border border-navy-600"
                >
                  نبذة مهنية
                </a>
              </div>
            </div>

            {/* Visual element */}
            <div className="hidden lg:flex justify-center animate-fade-in">
              <div className="relative">
                <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-navy-light to-navy-dark border border-navy-600 flex items-center justify-center shadow-2xl">
                  <div className="grid grid-cols-2 gap-4 p-8">
                    <div className="w-28 h-28 rounded-2xl bg-teal/20 border border-teal/30 flex flex-col items-center justify-center gap-2">
                      <Monitor className="w-8 h-8 text-teal-light" />
                      <span className="text-xs text-teal-light">تعليم رقمي</span>
                    </div>
                    <div className="w-28 h-28 rounded-2xl bg-blue/20 border border-blue/30 flex flex-col items-center justify-center gap-2">
                      <Briefcase className="w-8 h-8 text-blue-light" />
                      <span className="text-xs text-blue-light">علوم إدارية</span>
                    </div>
                    <div className="w-28 h-28 rounded-2xl bg-blue/20 border border-blue/30 flex flex-col items-center justify-center gap-2">
                      <Target className="w-8 h-8 text-blue-light" />
                      <span className="text-xs text-blue-light">تطوير مهني</span>
                    </div>
                    <div className="w-28 h-28 rounded-2xl bg-teal/20 border border-teal/30 flex flex-col items-center justify-center gap-2">
                      <Lightbulb className="w-8 h-8 text-teal-light" />
                      <span className="text-xs text-teal-light">ابتكار</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-teal/30 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-2xl bg-blue/30 blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / Bio */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-slate-100 bg-slate-50">
            <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy">نبذة عني</h3>
              <p className="text-sm text-slate-500">السيرة المهنية المختصرة</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-slate-600 leading-loose text-base">
              {profile?.bio ||
                'معلمة في تخصص العلوم الإدارية، مهتمة بتطوير الممارسات التعليمية وتوظيف التقنيات الرقمية والذكاء الاصطناعي في التعليم، وتصميم تجارب تعلم تطبيقية تعزز مهارات الطالبات الإدارية والتقنية. حاصلة على مؤهل عالٍ في التدريب، وشهادة مهنية احترافية في تقديم التعليم والتدريب الإلكتروني، وأسعى إلى تطوير بيئة تعليمية رقمية داعمة للتعلم والتطبيق والابتكار.'}
            </p>
          </div>
        </div>
      </section>

      {/* Quick access sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <QuickCard
            to="/standards"
            icon={BookOpen}
            title="المعايير والشواهد"
            desc={`${standards.length} معيار مهني مع الشواهد المرتبطة`}
          />
          <QuickCard
            to="/initiatives"
            icon={Lightbulb}
            title="المبادرات والمشاريع"
            desc="المبادرات التعليمية والتقنية والمشاريع التطبيقية"
          />
          <QuickCard
            to="/tech-tools"
            icon={Monitor}
            title="التوظيف التقني"
            desc="الأدوات والمنصات الرقمية المستخدمة في التعليم"
          />
          <QuickCard
            to="/professional-development"
            icon={Award}
            title="التطوير المهني"
            desc="المؤهلات والشهادات والدورات التدريبية"
          />
          <QuickCard
            to="/student-works"
            icon={Users}
            title="أعمال الطالبات"
            desc="مشاريع وإنجازات ونماذج أعمال الطالبات"
          />
          <QuickCard
            to="/search"
            icon={Target}
            title="البحث والتصفية"
            desc="ابحث في جميع الشواهد والمحتوى"
          />
        </div>
      </section>
    </div>
  );
}

function QuickCard({
  to,
  icon: Icon,
  title,
  desc,
}: {
  to: string;
  icon: typeof BookOpen;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-teal-300 transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-navy group-hover:bg-teal flex items-center justify-center mb-4 transition-colors">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h4 className="font-bold text-navy mb-1">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
      <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-teal group-hover:gap-2 transition-all">
        عرض المزيد
        <ArrowLeft className="w-4 h-4" />
      </span>
    </Link>
  );
}
