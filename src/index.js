import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/tailwind.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./router/Router";
import {
  AuthProvider,
  TaskProvider,
  ProjectProvider,
  ThemeProvider
} from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <TaskProvider>
          <ProjectProvider>
            <ToastContainer position="top-right" autoClose={3000} />
            <AppRouter />
          </ProjectProvider>
        </TaskProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
