import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/standards', label: 'المعايير' },
  { to: '/initiatives', label: 'المبادرات' },
  { to: '/professional-development', label: 'التطوير المهني' },
  { to: '/tech-tools', label: 'التوظيف التقني' },
  { to: '/student-works', label: 'أعمال الطالبات' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-lg bg-teal flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold">أ. أميمة السلمي</p>
                <p className="text-xs text-navy-200">العلوم الإدارية</p>
              </div>
            </div>
            <p className="text-sm text-navy-200 leading-relaxed">
              متوسطة وثانوية ذهبان — العام الدراسي 1448هـ
            </p>
            <p className="text-xs text-navy-300 mt-2">ملف شواهد مهني رقمي</p>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 text-teal-light">روابط سريعة</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-navy-200 hover:text-teal-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 text-teal-light">عن الملف</h4>
            <p className="text-sm text-navy-200 leading-relaxed">
              ملف رقمي منظم لعرض الشواهد المهنية والتعليمية وفق المعايير المهنية،
              مصمم لتسهيل وصول جهة التقييم إلى جميع الشواهد.
            </p>
          </div>
        </div>

        <div className="border-t border-navy-700 mt-8 pt-6 text-center">
          <p className="text-xs text-navy-300">
            © 1448هـ — ملف الشواهد المهنية — أ. أميمة السلمي
          </p>
          <Link to="/admin" className="text-xs text-navy-400 hover:text-teal-light transition-colors mt-1 inline-block">
            لوحة الإدارة
          </Link>
        </div>
      </div>
    </footer>
  );
}
