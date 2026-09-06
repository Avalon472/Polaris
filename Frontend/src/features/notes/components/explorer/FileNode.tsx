import type { NoteFileNode } from "@/types/notes";
import {
  ClipboardList,
  FileText,
  FolderClosed,
  Newspaper,
  ToolCase,
  Wrench,
} from "lucide-react";

interface FileNodeProps {
  type: "note" | "folder";
  clickHandler: () => void;
  node?: NoteFileNode;
  folderName?: string;
}
const FileNode = ({ type, clickHandler, node, folderName }: FileNodeProps) => {
  const iconSize = 50;
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
      return <FolderClosed className="text-accent shrink-0" size={iconSize} />;
    }
  })();

  const fileName = type === "note" ? node!.name : folderName!;

  return (
    <div
      className="gap-2 items-center justify-center p-2 text-text hover:text-accent
    hover:shadow hover:-translate-y-1 transition-all duration-400 ease-in-out shadow-accent
    bg-bg2 border border-border rounded-2xl flex flex-col overflow-hidden size-28 cursor-pointer"
      onClick={() => {
        clickHandler();
      }}
    >
      {noteTypeIcon}
      <p className="w-full text-center text-sm/4 line-clamp-2 overflow-hidden text-ellipsis mb-auto">
        {fileName}
      </p>
    </div>
  );
};

export default FileNode;
