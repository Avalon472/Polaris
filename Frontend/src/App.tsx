import { Navigate, Route, Routes } from "react-router-dom";
import LoadingSpinner from "./components/layout/LoadingSpinner";
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthUser } from "./features/auth/api/AuthQueries";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import HomePage from "./pages/home/HomePage";
import NoteDetails from "./pages/notes/NoteDetails";
import NotesOverview from "./pages/notes/NotesOverview";
import splash from "./res/Splash.jpg";

function App() {
  const { data: authUser, isLoading } = useAuthUser();

  return (
    <div className="flex w-screen h-screen bg-bgTransparent relative">
      <img
        src={splash}
        className="h-screen w-screen absolute left-0 top-0 opacity-50 -z-10"
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {authUser && <Navbar />}

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

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes" element={<NotesOverview />} />
                <Route path="/notes/:slug" element={<NoteDetails />} />
              </Route>
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
