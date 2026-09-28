import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import HomePage from "./pages/home/HomePage";
import NoteDetails from "./pages/notes/NoteDetails";
import NotesOverview from "./pages/notes/NotesOverview";

// Utilizes modern browser router, which allows for blocker
// and uncouples routes from the rendering tree
export const router = createBrowserRouter([
  {
    //TODO: Add router error page and 404 page
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
        ],
      },
      //   { path: "*", element: <NotFound /> },
    ],
  },
]);
