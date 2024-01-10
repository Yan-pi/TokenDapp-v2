import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DataContextProvider } from "./components/context/DataContext/dataContext.tsx";
import { ThemeProvider } from "./components/context/ThemeContext/themeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
