import { LoaderIcon } from "lucide-react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { useAuthUser } from "./features/auth/mutations/AuthMutations";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";
import NoteDetails from "./pages/notes/NoteDetails";
import NotesOverview from "./pages/notes/NotesOverview";

function App() {
  const { data: authUser, isLoading } = useAuthUser();
  return isLoading ? (
    <LoaderIcon className="animate-spin" />
  ) : (
    <div className="flex w-screen h-screen bg-bg">
      {authUser ? <Navbar /> : null}
      <div className="w-full mx-auto bg-bg">
        <Routes>
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/notes"
            element={authUser ? <NotesOverview /> : <Navigate to="/login" />}
          />
          <Route
            path="/notes/:slug"
            element={authUser ? <NoteDetails /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
