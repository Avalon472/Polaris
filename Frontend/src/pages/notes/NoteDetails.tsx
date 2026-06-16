import Editor from "@/features/notes/components/editor/TextEditor";
import { useGetNotesByParam } from "@/features/notes/mutations/NotesMutations";
import { LucideArrowBigLeftDash } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NoteDetails = () => {
  const { slug } = useParams();

  if (!slug) {
    //TODO: make 404 page for invalid navigations
    return <div>404, no route param provided</div>;
  }

  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const {
    data: note,
    isLoading,
    isRefetching,
  } = useGetNotesByParam("slug", slug);

  return (
    <div className="w-full h-full bg-bg3 p-4 overflow-y-scroll scrollbar-thin flex flex-col">
      <div className="w-full flex justify-between">
        <LucideArrowBigLeftDash
          onClick={() => {
            navigate(-1);
          }}
        />
        <button
          onClick={() => setEditing(!editing)}
          className={`border px-2 py-1 rounded-2xl transition-colors duration-200 hover:cursor-pointer w-16 text-center
          ${editing ? "text-accent hover:text-text border-accent hover:border-border" : "text-text hover:text-accent border-border hover:border-accent"}`}
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      {note && !isLoading && !isRefetching ? (
        <>
          <h1> {note[0].title}</h1>
          <Editor
            key={note[0]._id}
            initialContent={note[0].body}
            isEditing={editing}
          />
        </>
      ) : (
        <p>Setting things up...</p>
      )}
    </div>
  );
};

export default NoteDetails;
