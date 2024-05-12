import { useState, useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";

import { useAppDispatch } from "./app/store";
import { setCredentials } from "./features/auth/authSlice";

import { useMeQuery } from "./app/services/user";

import { AppProvider } from "./providers";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Project from "./pages/Project";
import ErrorFallback from "./components/ErrorFallback";
import Loading from "./components/Loading";

import * as ls from "./localStorage";

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { data, isLoading } = useMeQuery(undefined);

  const handleAuthStatus = () => {
    const token = ls.getToken();

    setIsAuth(Boolean(token));
  };

  useEffect(() => {
    handleAuthStatus();
  }, []);

  useEffect(() => {
    window.addEventListener("storage", handleAuthStatus);
    return () => window.removeEventListener("storage", handleAuthStatus);
  }, []);

  useEffect(() => {
    if (data) {
      const { user } = data;

      dispatch(setCredentials({ user }));
    }
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <AppProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={isAuth ? <Home /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/user/:username"
              element={isAuth ? <Profile /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/project/:uid"
              element={isAuth ? <Project /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/auth"
              element={!isAuth ? <Auth /> : <Navigate to="/" replace />}
            />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </AppProvider>
  );
};

export default App;
