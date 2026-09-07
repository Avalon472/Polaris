import { createFileTree, findLayerParent, sortNodeLayer } from "@/lib/utils";
import type { UpdateNotePayload } from "@/types/notes";
import { FolderPlus, Move, MoveUp, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUpdateNote } from "../../api/NotesMutations";
import { useGetAllNotes } from "../../api/NotesQueries";
import AddFolderModal from "../explorer/AddFolderModal";
import FileNode from "../explorer/FileNode";

const NotesFileExplorer = () => {
  const navigate = useNavigate();
  // TODO: Add breadcrumb at top to show file path,
  // better refresh tree after adding a node in a deeper layer
  const { data: notes } = useGetAllNotes();
  const updateNote = useUpdateNote();

  const [currentPath, setCurrentPath] = useState("/");
  const [addFolder, setAddFolder] = useState(false);
  // Originally memoized but shifted to state object to
  // allow for resorting after adding or moving a file node
  const [fileTree, setFileTree] = useState(createFileTree(notes ?? []));
  const [localTree, setLocalTree] = useState(fileTree);
  const [selectedNode, setSelectedNode] = useState("");
  const [moveNode, setMoveNode] = useState(false);
  useEffect(() => {
    setFileTree(createFileTree(notes ?? []));
  }, [notes]);
  console.log(fileTree);
  console.log(currentPath);
  const iconCoreClasses =
    "transition-all duration-300 text-text hover:text-accent";
  return (
    <div className="h-1/2 flex-1 min-h-0 w-full flex flex-col select-none">
      <p className="pl-2 text-subtle">Note Exporer</p>

      <div className="flex flex-col h-full bg-bg3 overflow-y-auto rounded-2xl border border-border content-start ">
        <div className="flex border-b border-border w-full p-2 px-4">
          <p>Home{currentPath}</p>
          <div className="flex gap-2 ml-auto">
            <MoveUp
              className={`${currentPath === "/" ? "text-muted" : "text-text hover:text-accent"} transition-all duration-300`}
              onClick={() => {
                if (currentPath !== "/") {
                  // Find index of last '/' before end of string, make substring from start of path until that '/' to get parent path
                  const parentPath = currentPath.slice(
                    0,
                    currentPath.lastIndexOf("/", currentPath.length - 2) + 1,
                  );
                  setCurrentPath(parentPath);
                  setLocalTree(findLayerParent(fileTree, currentPath));
                }
              }}
            />
            {moveNode ? (
              <X
                className={`${iconCoreClasses}`}
                onClick={() => setMoveNode(false)}
              />
            ) : (
              <Move
                className={`${iconCoreClasses}`}
                onClick={() => setMoveNode(true)}
              />
            )}

            <FolderPlus
              className={`${iconCoreClasses}`}
              onClick={() => setAddFolder(true)}
            />
          </div>
        </div>

        <div className="flex flex-wrap h-full gap-4 p-4 overflow-y-scroll scrollbar-thin">
          {localTree.map((node) => {
            if (node.path === currentPath) {
              return node.type === "note" ? (
                <FileNode
                  key={node.noteSlug}
                  type="note"
                  clickHandler={() => {
                    if (selectedNode !== node.noteSlug) {
                      setSelectedNode(node.noteSlug!);
                    } else if (moveNode) {
                      toast.error(
                        "Please select a folder to move this note to.",
                      );
                    } else {
                      navigate(`/notes/${node.noteSlug}`);
                    }
                  }}
                  selected={selectedNode === node.noteSlug}
                  node={node}
                />
              ) : (
                <FileNode
                  key={node.path}
                  type="folder"
                  clickHandler={() => {
                    if (moveNode) {
                      const movedNote = notes?.find(
                        (note) => note.slug === selectedNode,
                      );
                      console.log(`${node.path}${node.name}/`, movedNote);
                      updateNote.mutate({
                        ...(movedNote as UpdateNotePayload),
                        path: `${node.path}${node.name}/`,
                      });
                    } else if (selectedNode !== node.name) {
                      setSelectedNode(node.name);
                    } else {
                      setCurrentPath(`${node.path}${node.name}/`);
                      setLocalTree(
                        localTree.find((folder) => folder.name === node.name)!
                          .children!,
                      );
                    }
                  }}
                  selected={selectedNode === node.name}
                  folderName={node.name}
                />
              );
            }
          })}
        </div>
      </div>

      <AddFolderModal
        isOpen={addFolder}
        onOpenChange={setAddFolder}
        onConfirm={(folderName) => {
          localTree.push({
            type: "folder",
            name: folderName,
            path: currentPath,
            children: [],
          });

          setFileTree(sortNodeLayer(fileTree));
        }}
      />
    </div>
  );
};

export default NotesFileExplorer;
