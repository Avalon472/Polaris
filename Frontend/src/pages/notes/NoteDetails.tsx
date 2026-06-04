import Editor from "@/components/layout/TextEditor";
import type { Note } from "@/types/notes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fullNoteData } from "./testData";

const NoteDetails = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState<Note>();

  useEffect(() => {
    const found = fullNoteData.find((n) => n._id === noteId);
    setNote(found);
  }, [noteId]);

  return (
    <div className="w-full h-full bg-bg3">
      {noteId}
      {note?.body}
      <Editor />
    </div>
  );
};

export default NoteDetails;
