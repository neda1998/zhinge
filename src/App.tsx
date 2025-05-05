import React, { useEffect, useRef } from 'react';
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
  const [, setCookie, removeCookie] = useCookies(['theme']);

  const previousThemeRef = useRef<string | null>(null);

  useEffect(() => {
    const isPanelAdmin = location.pathname.includes('/panel-admin');

    // حذف لینک‌های css فعلی
    const existingLinks = document.querySelectorAll('link[href^="/css/"]');
    existingLinks.forEach(link => link.parentNode?.removeChild(link));

    if (isPanelAdmin) {
      if (!previousThemeRef.current && theme !== 'light') {
        previousThemeRef.current = theme;
      }

      removeCookie('theme', { path: '/' });
      localStorage.removeItem('theme');

      if (theme !== 'light') {
        changeTheme('light');
      }
      return;
    }

    if (previousThemeRef.current && theme === 'light') {
      changeTheme(previousThemeRef.current);
      setCookie('theme', previousThemeRef.current, { path: '/' });
      localStorage.setItem('theme', previousThemeRef.current);
      previousThemeRef.current = null;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/css/${theme}.css`;
    document.head.appendChild(link);

    return () => {
      link.parentNode?.removeChild(link);
    };
  }, [location.pathname, theme, changeTheme, removeCookie, setCookie]);

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
