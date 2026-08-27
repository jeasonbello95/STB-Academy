import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CoursesPage } from '@/pages/CoursesPage';
import { EventsPage } from '@/pages/EventsPage';
import { HomePage } from '@/pages/HomePage';
import { STBlockPage } from '@/pages/STBlockPage';

function getPage(pathname: string) {
  if (pathname === '/cursos') return CoursesPage;
  if (pathname === '/eventos') return EventsPage;
  if (pathname === '/stblock' || pathname === '/stblock/run') return STBlockPage;
  return HomePage;
}

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const Page = getPage(pathname);

  return (
    <div className="min-h-screen bg-ink-black text-white">
      <Navbar />
      <main><Page /></main>
      <Footer />
    </div>
  );
}

export default App;
