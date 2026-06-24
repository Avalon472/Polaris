import DeleteModal from "@/features/notes/components/DeleteModal";
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
  const [deleteOpen, setDeleteOpen] = useState(false);

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
      setEditing(true);
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
          onSuccess: () => {
            setIsChanged(false);
            setEditing(false);
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
          onSuccess: () => {
            setIsChanged(false);
            setEditing(false);
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

  const titleClass =
    "text-4xl leading-normal w-full my-4 px-8 py-2 rounded-2xl truncate min-h-18";
  return (
    <div className="w-full h-full bg-bg3 p-4 overflow-y-scroll scrollbar-thin flex flex-col">
      <div className="w-full flex justify-between">
        <LucideArrowBigLeftDash onClick={() => navigate(-1)} />
        <div className="flex gap-4">
          {editing ? (
            <>
              {isNew ? null : (
                <button
                  onClick={() => {
                    setDeleteOpen(true);
                  }}
                  className="buttonCore text-destructive hover:text-destructive border-subtle hover:border-destructive"
                >
                  Delete Note
                </button>
              )}

              {isChanged ? (
                <button
                  onClick={handleSave}
                  className="buttonCore text-success hover:text-success border-subtle hover:border-success"
                >
                  Save Changes
                </button>
              ) : null}
            </>
          ) : null}
          <button
            onClick={editing ? handleCancel : () => setEditing(true)}
            className={`buttonCore text-text hover:border-accent border-border
              ${editing ? "hover:text-text bg-accent" : "hover:text-accent"}`}
          >
            {editing ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>

      {editing ? (
        <input
          className={`${titleClass} bg-bg3 border border-border outline-none placeholder:text-subtle`}
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
      ) : (
        <div className={`${titleClass} bg-surface border border-transparent`}>
          {draftData.title}
        </div>
      )}

      {/* Using editable div instead of input for better scroll behavior
      <div
        ref={titleRef}
        contentEditable={editing}
        suppressContentEditableWarning
        data-placeholder="Give Your Note a Title"
        onInput={(e) => {
          const title = e.currentTarget.textContent ?? "";
          setDraftData(() => ({ ...draftData, title }));
          setIsChanged(true);
        }}
        className={`text-4xl outline-none w-full my-4 px-8 py-2 rounded-2xl overflow-x-auto whitespace-nowrap hover:scrollbar-thin 
    flex content-center text-left border border-border empty:before:content-[attr(data-placeholder)] empty:before:text-subtle
    empty:before:pointer-events-none ${editing ? "bg-bg3" : "bg-surface"}`}
      /> */}

      <Editor
        key={draftData.title}
        initialContent={draftData.body}
        isEditing={editing}
        onChange={(content) => {
          setDraftData(() => ({ ...draftData, body: content }));
          setIsChanged(true);
        }}
      />

      {!isNew && (
        <DeleteModal
          isOpen={deleteOpen}
          onOpenChange={setDeleteOpen}
          title={`Delete "${noteData!.title}"?`}
          description="This note will be permanently deleted. This action cannot be undone."
          onConfirm={() => {
            deleteNote.mutate(noteData!._id);
          }}
        />
      )}
    </div>
  );
};

export default NoteDetails;
