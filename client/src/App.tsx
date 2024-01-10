import { Routes, Route, Navigate } from "react-router-dom";

import { useTypedSelector } from "./app/store";
import { selectAuthStatus } from "./features/auth/authSlice";

import { AppProvider } from "./providers";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

const App = () => {
  const isAuth = useTypedSelector(selectAuthStatus);

  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Home /> : <Navigate to="/auth" replace />}
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
