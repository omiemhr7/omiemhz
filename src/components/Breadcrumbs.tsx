import { Link } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';

export interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap">
      <Link to="/" className="flex items-center gap-1 hover:text-teal transition-colors">
        <Home className="w-4 h-4" />
        <span>الرئيسية</span>
      </Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          <ChevronLeft className="w-4 h-4 text-slate-400" />
          {item.to ? (
            <Link to={item.to} className="hover:text-teal transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-navy font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
