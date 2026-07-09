import LoadingSpinner from "@/components/layout/LoadingSpinner";
import {
  useCreateNote,
  useDeleteNote,
  useUpdateNote,
} from "@/features/notes/api/NotesMutations";
import { useGetNotesByParam } from "@/features/notes/api/NotesQueries";
import DeleteModal from "@/features/notes/components/DeleteModal";
import FieldLabel from "@/features/notes/components/editor/FieldLabel";
import TagEditor from "@/features/notes/components/editor/TagsEditor";
import Editor from "@/features/notes/components/editor/TextEditor";
import TypeDropdown from "@/features/notes/components/editor/TypeDropdown";
import type { NotePayload } from "@/types/notes";
import { BookText, LucideArrowBigLeftDash, TagIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NoteDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isNew = slug === "new" || !slug;

  const {
    data: note,
    isLoading,
    isRefetching,
  } = useGetNotesByParam("slug", isNew ? "" : slug);

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
    return <LoadingSpinner />;
  }
  if (!note?.[0] && !isNew) return <div>Note not found</div>;

  const noteData = isNew ? null : note![0];

  const handleSave = () => {
    if (isNew) {
      createNote.mutate(
        {
          ...draftData,
        },
        {
          onSuccess: () => {
            setIsChanged(false);
            setEditing(false);
          },
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
    "text-4xl leading-normal w-full px-8 py-2 rounded-2xl truncate min-h-18";
  return (
    <div className="w-full h-full bg-bg3 p-4 overflow-y-scroll scrollbar-thin flex flex-col gap-2">
      <div className="w-full flex justify-between items-center border-b border-border pb-1.5">
        <LucideArrowBigLeftDash
          size={30}
          onClick={() => navigate(-1)}
          className="text-text hover:text-accent transition-colors duration-200"
        />
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
            {editing ? "Close" : "Edit"}
          </button>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <FieldLabel
          icon={TagIcon}
          label="Tags"
          id="noteTags"
          vertical
          width={67}
        >
          <TagEditor
            selectedTags={draftData.tags ?? []}
            onSelect={(tags) => {
              setDraftData({ ...draftData, tags });
              setIsChanged(true);
            }}
            editing={editing}
          />
        </FieldLabel>
        <FieldLabel
          icon={TagIcon}
          label="Type"
          id="noteTags"
          vertical
          width={33}
        >
          <TypeDropdown
            selectedType={draftData.type ?? "general"}
            onSelect={(type) => {
              setDraftData({ ...draftData, type: type! });
              setIsChanged(true);
            }}
            editing={editing}
          />
        </FieldLabel>
      </div>

      <FieldLabel
        icon={BookText}
        label="Title"
        id="noteTitle"
        vertical
        width={100}
      >
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
      </FieldLabel>

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
