import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { DashboardEventsWidget } from './components/DashboardEventsWidget';
import './index.css';

// 1. Montaje del widget interactivo de eventos dentro del Dashboard de Tutor LMS
function mountDashboardWidget() {
  const dashboardRoot = document.getElementById('stb-dashboard-events-root');
  if (dashboardRoot && !dashboardRoot.hasAttribute('data-react-mounted')) {
    dashboardRoot.setAttribute('data-react-mounted', 'true');
    createRoot(dashboardRoot).render(
      <StrictMode>
        <DashboardEventsWidget />
      </StrictMode>
    );
  }
}

// 2. Montaje de la aplicación completa SPA de React (portada, /eventos, /cursos, etc.)
function mountApp() {
  const root = document.getElementById('root');
  if (root && !root.hasAttribute('data-react-mounted')) {
    root.setAttribute('data-react-mounted', 'true');
    createRoot(root).render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    );
  }
}

// Ejecutar de inmediato y ante eventos de carga de documento
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    mountDashboardWidget();
    mountApp();
  });
} else {
  mountDashboardWidget();
  mountApp();
}

// Respaldo para frameworks reactivos o Alpine.js en Tutor LMS
setTimeout(() => {
  mountDashboardWidget();
  mountApp();
}, 250);
setTimeout(() => {
  mountDashboardWidget();
  mountApp();
}, 1000);