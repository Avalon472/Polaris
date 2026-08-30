import { createFileTree } from "@/lib/utils";
import type { NoteFileNode } from "@/types/notes";
import {
  ClipboardList,
  FileText,
  Newspaper,
  ToolCase,
  Wrench,
} from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllNotes } from "../../api/NotesQueries";

interface FileNodeProps {
  node: NoteFileNode;
}
const FileNode = ({ node }: FileNodeProps) => {
  const iconSize = 50;
  const navigate = useNavigate();
  // Using an IIFE to immediately decide icon using the type
  const noteTypeIcon = (() => {
    switch (node.noteType) {
      case "framework":
        return <ToolCase className="text-framework shrink-0" size={iconSize} />;
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
        return <Newspaper className="text-article shrink-0" size={iconSize} />;
      case "general":
      default:
        return <FileText className="text-general shrink-0" size={iconSize} />;
    }
  })();

  return (
    <div
      className="gap-2 items-center justify-center p-2 text-text hover:text-accent
    hover:shadow hover:-translate-y-1 transition-all duration-400 ease-in-out shadow-accent
    bg-bg2 border border-border rounded-2xl flex flex-col overflow-hidden size-28 cursor-pointer"
      onClick={() => {
        navigate(`/notes/${node.noteSlug}`);
      }}
    >
      {noteTypeIcon}
      <p className="w-full text-center text-sm/4 line-clamp-2 overflow-hidden text-ellipsis mb-auto">
        {node.name}
      </p>
    </div>
  );
};

const NotesFileExplorer = () => {
  // TODO: Add state object for current folder,
  // change displayed notes based on folder
  // add breadcrumb at top to show file path
  const { data: notes } = useGetAllNotes();
  // Memoize file tree so it doesn't get constantly recalculated
  const fileTree = useMemo(() => createFileTree(notes ?? []), [notes]);
  return (
    <div className="size-full flex flex-col">
      <p className="pl-2 text-subtle">Note Exporer</p>

      <div className="h-full bg-bg3 p-4 gap-4 overflow-y-scroll scrollbar-thin rounded-2xl border border-border content-start flex flex-wrap">
        {fileTree.map((node) => (
          <FileNode
            key={node.type === "note" ? node.noteSlug : node.path}
            node={node}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesFileExplorer;
