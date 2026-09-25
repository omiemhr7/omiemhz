import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import StandardsPage from '@/pages/StandardsPage';
import StandardDetailPage from '@/pages/StandardDetailPage';
import InitiativesPage from '@/pages/InitiativesPage';
import TechToolsPage from '@/pages/TechToolsPage';
import ProfessionalDevelopmentPage from '@/pages/ProfessionalDevelopmentPage';
import StudentWorksPage from '@/pages/StudentWorksPage';
import SearchPage from '@/pages/SearchPage';
import AdminPage from '@/pages/AdminPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/standards" element={<StandardsPage />} />
            <Route path="/standards/:id" element={<StandardDetailPage />} />
            <Route path="/initiatives" element={<InitiativesPage />} />
            <Route path="/tech-tools" element={<TechToolsPage />} />
            <Route path="/professional-development" element={<ProfessionalDevelopmentPage />} />
            <Route path="/student-works" element={<StudentWorksPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
