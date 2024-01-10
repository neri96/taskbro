import { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <HelmetProvider>
      <Router>{children}</Router>
    </HelmetProvider>
  );
};
