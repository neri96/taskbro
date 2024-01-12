import { useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { useTypedSelector } from "./app/store";
import { useAppDispatch } from "./app/store";
import { selectAuthStatus } from "./features/auth/authSlice";
import { setCredentials } from "./features/auth/authSlice";

import { useMeQuery } from "./app/services/user";

import { AppProvider } from "./providers";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";

const App = () => {
  const dispatch = useAppDispatch();

  const isAuth = useTypedSelector(selectAuthStatus);

  const { data, isLoading } = useMeQuery(undefined);

  useEffect(() => {
    if (data) {
      const { user, token } = data;

      dispatch(setCredentials({ user, token }));
    }
  }, [data]);

  return (
    <AppProvider>
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
            path="/auth"
            element={!isAuth ? <Auth /> : <Navigate to="/" replace />}
          />
        </Routes>
      </Layout>
    </AppProvider>
  );
};

export default App;
