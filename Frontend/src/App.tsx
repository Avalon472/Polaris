import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/home/HomePage";
import NoteDetails from "./pages/notes/NoteDetails";
import NotesOverview from "./pages/notes/NotesOverview";

function App() {
  return (
    <div className="flex w-screen h-screen bg-bg">
      <Navbar />
      <div className="w-full mx-auto bg-bg">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesOverview />} />
          <Route path="/notes/:noteId" element={<NoteDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
