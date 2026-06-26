import { LoaderIcon } from "lucide-react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { useAuthUser } from "./features/auth/api/AuthQueries";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import HomePage from "./pages/home/HomePage";
import NoteDetails from "./pages/notes/NoteDetails";
import NotesOverview from "./pages/notes/NotesOverview";
import splash from "./res/Splash.jpg";

function App() {
  const { data: authUser, isLoading } = useAuthUser();
  return isLoading ? (
    <LoaderIcon className="animate-spin" />
  ) : (
    <div className="flex w-screen h-screen bg-bgTransparent relative">
      <img
        src={splash}
        className="h-screen w-screen absolute left-0 top-0 opacity-50 -z-10"
      />
      {authUser ? <Navbar /> : null}
      <div className="w-[calc(100%-14rem)] mx-auto">
        <Routes>
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignupPage />}
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
