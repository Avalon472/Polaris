import LoadingSpinner from "@/components/layout/LoadingSpinner";
import Editor from "@/features/notes/components/editor/TextEditor";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { compareObjects, createDescription } from "@/lib/utils";
import type { NotePayload } from "@/types/notes";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useCreateNote } from "../../api/NotesMutations";

const QuickIntake = () => {
  const createNote = useCreateNote();

  const blankNote: NotePayload = {
    title: "",
    body: "",
    path: "/",
    references: [],
  };

  useUnsavedChanges(
    () => !compareObjects(draftData, blankNote),
    "Your draft has not been saved. Unsaved changes will be lost upon leaving the page.",
  );

  const [draftData, setDraftData] = useState<NotePayload>(blankNote);

  const eligibleForSave = draftData.body && draftData.title;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftData({ ...draftData, title: e.target.value });
  };

  const handleSave = () => {
    if (!eligibleForSave) {
      toast.error("The note requires both a title and body to be set.");
      return;
    }
    if (!draftData.description) {
      setDraftData(() => ({
        ...draftData,
        description: createDescription(draftData.body),
      }));
    }

    createNote.mutate(
      {
        ...draftData,
      },
      {
        onSuccess: () => {
          setDraftData(blankNote);
        },
      },
    );
  };

  const titleClass =
    "text-xl leading-normal w-full px-6 py-2 rounded-2xl truncate min-h-14";
  return createNote.isPending ? (
    <LoadingSpinner />
  ) : (
    <div className="w-full h-full bg-bg3 p-4 overflow-clip flex flex-col gap-2 flex-2 min-w-0 rounded-2xl min-h-80">
      <div className="flex gap-2">
        <input
          className={`${titleClass} bg-bg3 border border-border outline-none placeholder:text-subtle`}
          placeholder="Your Note's Title"
          name="title"
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(event);
          }}
          value={draftData.title}
        />
        <button
          onClick={handleSave}
          disabled={!eligibleForSave}
          className={`buttonCore shrink-0 ${eligibleForSave ? "text-success hover:text-success border-subtle hover:border-success" : "text-subtle pointer-events-none"}`}
        >
          Save Changes
        </button>
      </div>

      <Editor
        initialContent={draftData.body}
        isEditing={true}
        onChange={(content) => {
          setDraftData(() => ({ ...draftData, body: content }));
        }}
        onReferencesChange={(newRefs) =>
          setDraftData(() => ({ ...draftData, references: newRefs }))
        }
      />
    </div>
  );
};

export default QuickIntake;
