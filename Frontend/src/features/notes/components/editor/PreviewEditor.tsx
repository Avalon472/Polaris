import type { NoteReference } from "@/types/notes";
import {
  ChevronDown,
  ChevronUp,
  FileSearchCorner,
  SquareArrowOutDownLeft,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useState } from "react";
import FieldLabel from "./FieldLabel";

interface PreviewEditorProps {
  noteDescription: string;
  references: NoteReference[];
  referencedBy: NoteReference[];
  onChange: (description: string) => void;
  editing: boolean;
}

const PreviewEditor = ({
  noteDescription,
  references,
  referencedBy,
  onChange,
  editing,
}: PreviewEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`absolute bg-bg2-solid w-2/5 h-2/3 origin-center left-full inset-0 flex flex-col my-auto transition-transform duration-600
        rounded-xl p-4 border gap-4 ${isOpen ? "-translate-x-full border-accent" : "-translate-x-4 border-border"}`}
    >
      <div className="flex flex-col gap-4">
        <FieldLabel
          icon={FileSearchCorner}
          label="Note Description"
          id="noteDescription"
          vertical
          width={100}
        >
          <textarea
            name="noteDescriptionInput"
            className={`${editing ? "bg-bg3 border border-border" : "bg-surface border border-transparent"} 
            p-2 rounded-lg max-h-70 min-h-40 size-full text-muted-foreground outline-none`}
            readOnly={!editing}
            value={noteDescription}
            onChange={(e) => onChange(e.target.value)}
          />
        </FieldLabel>

        <FieldLabel
          icon={SquareArrowOutUpRight}
          label="References"
          id="noteReferences"
          vertical
          width={100}
        >
          <div className="flex gap-4 p-4 bg-surface rounded-md shrink-0 w-full">
            {references.map((item) => (
              // TODO: swap out with wikilink, need to edit wikilink component
              // to have a non-nodewrapper version
              <div key={item._id}>{item.title}</div>
            ))}
          </div>
        </FieldLabel>
        <FieldLabel
          icon={SquareArrowOutDownLeft}
          label="Referenced By"
          id="notesReferencedBy"
          vertical
          width={100}
        >
          <div className="flex gap-4 p-4 bg-surface rounded-md shrink-0 w-full">
            {referencedBy.map((item) => (
              <div key={item._id}>{item.title}</div>
            ))}
          </div>
        </FieldLabel>
      </div>
      {/* Element to mask border from main card */}
      <div className="absolute inset-0 my-auto -left-4 w-4 h-40 bg-bg2-solid" />
      <button
        className="absolute top-1/2 translate-y-[200%] -left-4 origin-left -rotate-90 w-40 h-8 bg-bg2-solid transition-colors duration-300 
        border rounded-t-xl text-text hover:text-accent hover:border-accent border-border flex p-2 justify-center gap-4 items-center border-b-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Connections</span>
        {isOpen ? <ChevronDown size={30} /> : <ChevronUp size={30} />}
      </button>
    </div>
  );
};

export default PreviewEditor;
