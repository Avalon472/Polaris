import { createFileTree, sortNodeLayer } from "@/lib/utils";
import { FolderPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllNotes } from "../../api/NotesQueries";
import AddFolderModal from "../explorer/AddFolderModal";
import FileNode from "../explorer/FileNode";

const NotesFileExplorer = () => {
  const navigate = useNavigate();
  // TODO: Add state object for current folder,
  // change displayed notes based on folder
  // add breadcrumb at top to show file path
  const { data: notes } = useGetAllNotes();

  const [currentPath, setCurrentPath] = useState("/");
  const [addFolder, setAddFolder] = useState(false);
  // Originally memoized but shifted to state object to
  // allow for resorting after adding or moving a file node
  const [fileTree, setFileTree] = useState(createFileTree(notes ?? []));
  useEffect(() => {
    setFileTree(createFileTree(notes ?? []));
  }, [notes]);
  return (
    <div className="h-1/2 flex-1 min-h-0 w-full flex flex-col">
      <p className="pl-2 text-subtle">Note Exporer</p>

      <div className="flex flex-col h-full bg-bg3 py-2 px-4 rounded-2xl border border-border content-start ">
        <div className="flex">
          <p>Home {currentPath}</p>
          <FolderPlus className="ml-auto" onClick={() => setAddFolder(true)} />
        </div>

        <div className="flex flex-wrap gap-4 py-2 overflow-y-scroll scrollbar-thin">
          {fileTree.map((node) => {
            if (node.path === currentPath) {
              return node.type === "note" ? (
                <FileNode
                  type="note"
                  clickHandler={() => {
                    navigate(`/notes/${node.noteSlug}`);
                  }}
                  node={node}
                />
              ) : (
                <FileNode
                  key={node.path}
                  type="folder"
                  clickHandler={() => {
                    setCurrentPath(node.name);
                  }}
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
          fileTree.push({
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
