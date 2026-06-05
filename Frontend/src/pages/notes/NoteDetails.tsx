import Editor from "@/features/notes/components/editor/TextEditor";
import type { Note } from "@/types/notes";
import { LucideArrowBigLeftDash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fullNoteData } from "./testData";

const NoteDetails = () => {
  const { slug } = useParams();
  const [note, setNote] = useState<Note>();
  const navigate = useNavigate();

  useEffect(() => {
    const found = fullNoteData.find((n) => n.slug === slug);
    if (found) {
      setNote(found);
    }
  }, [slug]);

  return (
    <div className="w-full h-full bg-bg3 p-4 overflow-y-scroll scrollbar-thin flex flex-col">
      <LucideArrowBigLeftDash
        onClick={() => {
          navigate(-1);
        }}
      />

      <h1> {note?.title}</h1>
      {note ? (
        <Editor key={note._id} initialContent={note.body} />
      ) : (
        <p>Setting things up...</p>
      )}
    </div>
  );
};

export default NoteDetails;
