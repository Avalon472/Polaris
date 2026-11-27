import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import HomePage from "./pages/home/HomePage";
import NoteDetails from "./pages/notes/NoteDetails";
import NotesOverview from "./pages/notes/NotesOverview";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectsOverview from "./pages/projects/ProjectsOverview";

// Utilizes modern browser router, which allows for blocker
// and uncouples routes from the rendering tree
export const router = createBrowserRouter([
  {
    //TODO: Add router error page
    element: <App />,
    // errorElement: <RouteError />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/signup", element: <SignupPage /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/notes", element: <NotesOverview /> },
          { path: "/notes/:slug", element: <NoteDetails /> },
          { path: "/projects", element: <ProjectsOverview /> },
        ],
      },

      // Tag paths with a handle for route tracking hook to identify
      {
        path: "*",
        element: <Navigate to="/404" replace />,
        handle: { is404: true },
      },
      { path: "/404", element: <NotFoundPage />, handle: { is404: true } },
    ],
  },
]);
