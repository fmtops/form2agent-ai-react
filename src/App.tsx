import { StrictMode } from "react";
import "./App.css";
import CoreRouter from "./routes/core-router";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/main-layout/main-layout";

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <MainLayout>
          <CoreRouter />
        </MainLayout>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
