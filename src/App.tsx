import React, { useEffect } from 'react';
import './App.css';
import MainLayout from './components/partial/layout/MainLayout';
import { AllRoutes } from './@types/App/components.type';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import routes from './Routes';
import { AppProvider, useAppContext } from './contexts/appContext';
import { useCookies } from 'react-cookie';

const AppContent = () => {
  const { theme, changeTheme } = useAppContext();
  const location = useLocation();
  const [, , removeCookie] = useCookies(['theme']);

  useEffect(() => {
    const isPanelAdmin = location.pathname.includes('/panel-admin');

    // حذف لینک‌های قبلی
    const existingLinks = document.querySelectorAll('link[href^="/css/"]');
    existingLinks.forEach(link => link.parentNode?.removeChild(link));

    if (isPanelAdmin) {
      // حذف کوکی و localStorage
      removeCookie('theme', { path: '/' });
      localStorage.removeItem('theme');

      // اطمینان از تغییر تم به light
      if (theme !== 'light') {
        changeTheme('light');
      }

      return;
    }

    // اضافه کردن CSS بر اساس theme
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/css/${theme}.css`;
    document.head.appendChild(link);

    return () => {
      link.parentNode?.removeChild(link);
    };
  }, [location.pathname, theme, changeTheme, removeCookie]);

  const getRoutes = (AllRoute: AllRoutes[]): any => (
    <>
      {AllRoute.map((route) =>
        route.route ? (
          <Route key={route.key} path={route.route} element={<>{route.component}</>} />
        ) : null
      )}
    </>
  );

  return (
    <MainLayout>
      <Routes>{getRoutes(routes)}</Routes>
    </MainLayout>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
