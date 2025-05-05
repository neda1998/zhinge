import React, { useEffect } from 'react';
import './App.css';
import MainLayout from './components/partial/layout/MainLayout';
import { AllRoutes } from './@types/App/components.type';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './Routes';
import { AppProvider, useAppContext } from './contexts/appContext';

const ThemeLoader = () => {
  const { theme } = useAppContext();

  useEffect(() => {
    const isPanelAdmin = window.location.pathname.includes("/panel-admin/dashboard/manage-setting") || window.location.pathname.includes("/panel-admin/dashboard/realState") || window.location.pathname.includes("/panel-admin/dashboard/estate") || window.location.pathname.includes("/panel-admin/dashboard/estate-detail") || window.location.pathname.includes("/panel-admin/dashboard/estate-management") || window.location.pathname.includes("/panel-admin/dashboard/estate-management-detail") || window.location.pathname.includes("/panel-admin/dashboard/estate-management-edit") || window.location.pathname.includes("/panel-admin/dashboard/estate-management-add") || window.location.pathname.includes("/panel-admin/dashboard/estate-management-edit-attach") || window.location.pathname.includes("/panel-admin/dashboard/estate-management-edit-attach-detail") || window.location.pathname.includes("/panel-admin/dashboard/estate-management-edit-attach-add");

    if (isPanelAdmin) return; 

    const head = document.head;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/css/${theme}.css`;
    head.appendChild(link);

    return () => {
      head.removeChild(link);
    };
  }, [theme]);

  return null;
};

function App() {
  const getRoutes = (AllRoute: AllRoutes[]): any => (
    <React.Fragment>
      {AllRoute.map((route) => {
        if (route.route) {
          return (
            <Route key={route.key} path={route.route} element={<>{route.component}</>} />
          )
        }
        return null
      })}
    </React.Fragment>
  )
  return (
    <AppProvider>
      <BrowserRouter>
        <>
        <ThemeLoader />
          <MainLayout>
            <>
              <Routes>
                {getRoutes(routes)}
              </Routes>
            </>
          </MainLayout>
        </>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
