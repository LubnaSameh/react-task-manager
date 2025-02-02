import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "../components";

const Home = lazy(() => import("../pages/Home"));
const Projects = lazy(() => import("../pages/Projects"));
const ProjectDetails = lazy(() => import("../pages/ProjectDetails"));
const Tasks = lazy(() => import("../pages/Tasks"));
const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));
const AllProjects = lazy(() => import("../pages/AllProjects"));
const NotFound = lazy(() => import("../pages/NotFound"));

const SuspenseWrapper = (Component) => (
  <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
    <Component />
  </Suspense>
);

const AppRouter = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={SuspenseWrapper(Home)} />
        <Route path="/projects" element={SuspenseWrapper(Projects)} />
        <Route path="/projects/:id" element={SuspenseWrapper(ProjectDetails)} />
        <Route path="/projects/:projectId/tasks" element={SuspenseWrapper(Tasks)} />
        <Route path="/login" element={SuspenseWrapper(Login)} />
        <Route path="/signup" element={SuspenseWrapper(SignUp)} />
        <Route path="/all-projects" element={SuspenseWrapper(AllProjects)} />
        <Route path="*" element={SuspenseWrapper(NotFound)} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default AppRouter;
