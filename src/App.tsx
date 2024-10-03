import { StrictMode } from "react";
import "./App.css";
import CoreRouter from "./routes/core-router";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/main-layout/main-layout";
import { LayoutProvider } from "./contexts/LayoutContext";

function App() {
  return (
    <StrictMode>
      <LayoutProvider>
        <BrowserRouter>
          <MainLayout>
            <CoreRouter />
          </MainLayout>
        </BrowserRouter>
      </LayoutProvider>
    </StrictMode>
  );
}

export default App;
