import type { NoteFileNode, NoteListItem } from "@/types/notes";
import {
  ClipboardList,
  FileText,
  FolderClosed,
  FolderOpen,
  Newspaper,
  ToolCase,
  Wrench,
} from "lucide-react";
import NoteOptionMenu from "../dashboard/NoteOptionMenu";

interface FileNodeProps {
  type: "note" | "folder";
  clickHandler: () => void;
  selected: boolean;
  node?: NoteFileNode;
  folderName?: string;
  noteContent?: NoteListItem;
  temporary?: boolean;
}
const FileNode = ({
  type,
  clickHandler,
  selected,
  node,
  folderName,
  noteContent,
  temporary = false,
}: FileNodeProps) => {
  const iconSize = 44;
  // Using an IIFE to immediately decide icon using the type
  const noteTypeIcon = (() => {
    if (type === "note" && node) {
      switch (node.noteType) {
        case "framework":
          return (
            <ToolCase className="text-framework shrink-0" size={iconSize} />
          );
        case "project-spec":
          return (
            <ClipboardList
              className="text-project-spec shrink-0"
              size={iconSize}
            />
          );
        case "tool":
          return <Wrench className="text-tool shrink-0" size={iconSize} />;
        case "article":
          return (
            <Newspaper className="text-article shrink-0" size={iconSize} />
          );
        case "general":
        default:
          return <FileText className="text-general shrink-0" size={iconSize} />;
      }
    } else {
      if (temporary) {
        return (
          <FolderOpen className="text-accent/60 shrink-0" size={iconSize} />
        );
      }
      return <FolderClosed className="text-accent shrink-0" size={iconSize} />;
    }
  })();

  const fileName = type === "note" ? node!.name : folderName!;

  return (
    <div
      className={`gap-1 items-center justify-center p-1 transition-all duration-400 relative group m-1
        ease-in-out shadow-accent border border-border rounded-2xl flex flex-col overflow-hidden w-9/10 h-24 cursor-pointer
    ${selected ? "bg-surface text-accent shadow -translate-y-2" : "bg-bg2 text-text hover:text-accent hover:shadow hover:-translate-y-1"}`}
      onClick={(e) => {
        e.stopPropagation();
        clickHandler();
      }}
    >
      {noteTypeIcon}
      <p className="w-full text-center text-sm/4 line-clamp-2 overflow-hidden text-ellipsis mb-auto">
        {fileName}
      </p>

      {noteContent && (
        <div className="absolute right-2 top-2 opacity-50 group-hover:opacity-100 text-text transition-all duration-400">
          <NoteOptionMenu noteContent={noteContent} />
        </div>
      )}
    </div>
  );
};

export default FileNode;
