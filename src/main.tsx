import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";

import App from "./App.tsx";
import Microfront1 from "microfront1/App";
import Microfront2 from "microfront2/App";

import { store } from "./store/index.ts";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="pokemon/:id" element={<Microfront1 />} />
          <Route path="history" element={<Microfront2 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
