import { Routes, Route } from 'react-router-dom';
import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AmbientBackground } from '@/components/AmbientBackground';
import { CoursesPage } from '@/pages/CoursesPage';
import { EventsPage } from '@/pages/EventsPage';
import { HomePage } from '@/pages/HomePage';
import { STBlockPage } from '@/pages/STBlockPage';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

function SiteLayout({ children }: { children: ReactNode }) {
  const isNativeWpHeader = typeof window !== 'undefined' && Boolean((window as any).STB_APP_CONFIG?.nativeHeaderActive);

  return (
    <div className="relative min-h-screen bg-deep-950 text-white">
      <AmbientBackground />
      {!isNativeWpHeader && <Navbar />}
      <main className={`relative z-10 ${isNativeWpHeader ? 'pt-16 md:pt-20' : ''}`}>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SiteLayout>
            <HomePage />
          </SiteLayout>
        }
      />
      <Route
        path="/cursos"
        element={
          <SiteLayout>
            <CoursesPage />
          </SiteLayout>
        }
      />
      <Route
        path="/eventos"
        element={
          <SiteLayout>
            <EventsPage />
          </SiteLayout>
        }
      />
      <Route
        path="/stblock"
        element={
          <SiteLayout>
            <STBlockPage />
          </SiteLayout>
        }
      />
      <Route
        path="/stblock/run"
        element={
          <SiteLayout>
            <STBlockPage />
          </SiteLayout>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
    </Routes>
  );
}

export default App;