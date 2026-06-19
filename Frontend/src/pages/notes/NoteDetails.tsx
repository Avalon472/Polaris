import Editor from "@/features/notes/components/editor/TextEditor";
import {
  useCreateNote,
  useDeleteNote,
  useGetNotesByParam,
  useUpdateNote,
} from "@/features/notes/mutations/NotesMutations";
import type { NotePayload } from "@/types/notes";
import { LoaderIcon, LucideArrowBigLeftDash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const NoteDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const isNew = slug === "new";

  const {
    data: note,
    isLoading,
    isRefetching,
  } = useGetNotesByParam("slug", isNew ? "" : (slug ?? ""));

  const [draftData, setDraftData] = useState<NotePayload | undefined>(
    undefined,
  );

  useEffect(() => {
    if (note?.[0]) {
      setDraftData(note[0]);
    }
    if (isNew) {
      setDraftData({
        title: "New Note",
        body: "Let's get started",
      });
    }
  }, [note, isNew]);

  const deleteNote = useDeleteNote();
  const updateNote = useUpdateNote();
  const createNote = useCreateNote();

  //Pick mutation to use based on the flag
  const activeNote = isNew ? createNote : updateNote;
  const isPending =
    isLoading || isRefetching || activeNote.isPending || deleteNote.isPending;

  if (!slug) return <div>404, no route param provided</div>;
  if (isPending || !draftData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }
  if (!note?.[0] && !isNew) return <div>Note not found</div>;

  const noteData = isNew ? null : note![0];

  const handleSave = () => {
    if (isNew) {
      createNote.mutate(
        {
          body: draftData.body,
          title: draftData.title,
        },
        {
          onSuccess: (data) => {
            setIsChanged(false);
            setEditing(false);
            navigate(`/notes/${data.slug}`);
          },
          onError: (error) => toast.error(error.message),
        },
      );
    } else {
      updateNote.mutate(
        {
          _id: noteData!._id,
          ...draftData,
        },
        {
          onSuccess: (data) => {
            setIsChanged(false);
            setEditing(false);
            navigate(`/notes/${data.slug}`);
          },
          onError: (error) => toast.error(error.message),
        },
      );
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setIsChanged(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftData({ ...draftData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full h-full bg-bg3 p-4 overflow-y-scroll scrollbar-thin flex flex-col">
      <div className="w-full flex justify-between">
        <LucideArrowBigLeftDash onClick={() => navigate(-1)} />
        <div className="flex gap-4">
          {isChanged && editing && (
            <button
              onClick={handleSave}
              className="border px-2 py-1 rounded-2xl transition-colors duration-200 hover:cursor-pointer min-w-16
                text-center text-text hover:text-accent border-border hover:border-accent whitespace-nowrap"
            >
              Save Changes
            </button>
          )}
          <button
            onClick={editing ? handleCancel : () => setEditing(true)}
            className={`border px-2 py-1 rounded-2xl transition-colors duration-200 hover:cursor-pointer min-w-16 text-center text-text hover:border-accent border-border
              ${editing ? "hover:text-text bg-accent hover:bg-transparent" : "hover:text-accent"}`}
          >
            {editing ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>

      <input
        className="w-full text-4xl placeholder:text-subtle bg-transparent outline-none py-4"
        placeholder="Give Your Note a Title"
        name="title"
        type="text"
        disabled={!editing}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleInputChange(event);
          setIsChanged(true);
        }}
        value={draftData.title}
      />

      <Editor
        key={draftData.title}
        initialContent={draftData.body}
        isEditing={editing}
        onChange={(content) => {
          setDraftData(() => ({ ...draftData, body: content }));
          setIsChanged(true);
        }}
      />
    </div>
  );
};

export default NoteDetails;
