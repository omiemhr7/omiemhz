import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/standards', label: 'المعايير' },
  { to: '/initiatives', label: 'المبادرات' },
  { to: '/professional-development', label: 'التطوير المهني' },
  { to: '/tech-tools', label: 'التوظيف التقني' },
  { to: '/student-works', label: 'أعمال الطالبات' },
];

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-40 bg-navy text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-teal flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-tight">ملف الشواهد المهنية</p>
              <p className="text-xs text-navy-200">أ. أميمة السلمي</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-teal text-white'
                    : 'text-navy-100 hover:bg-navy-light hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-md hover:bg-navy-light"
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden bg-navy-dark border-t border-navy-light animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-teal text-white'
                    : 'text-navy-100 hover:bg-navy-light'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
