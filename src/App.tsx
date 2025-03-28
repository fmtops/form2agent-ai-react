import { StrictMode } from "react";
import "./App.css";
import CoreRouter from "./routes/core-router";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/main-layout/main-layout";
import { LayoutProvider } from "./contexts/LayoutContext";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <StrictMode>
      <HelmetProvider>
        <LayoutProvider>
          <BrowserRouter>
            <MainLayout>
              <CoreRouter />
            </MainLayout>
          </BrowserRouter>
        </LayoutProvider>
      </HelmetProvider>
    </StrictMode>
  );
}

export default App;
