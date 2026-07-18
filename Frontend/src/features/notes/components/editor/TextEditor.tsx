import DragHandle from "@tiptap/extension-drag-handle-react";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extensions";
import { Markdown } from "@tiptap/markdown";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { GripVertical } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "./EditorToolbar";

interface EditorProps {
  initialContent?: string;
  onChange?: (markdown: string) => void;
  isEditing: boolean;
}

function Editor({ initialContent, onChange, isEditing }: EditorProps) {
  const navigate = useNavigate();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      Placeholder.configure({ placeholder: "Start writing…" }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: initialContent,
    editable: isEditing,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getMarkdown());
    },
    contentType: "markdown",
  });

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(isEditing);
  }, [isEditing, editor]);

  return (
    <div
      className={`flex flex-col h-full border border-border rounded-[10px] overflow-hidden ${isEditing ? "bg-bg3" : "bg-surface"} transition-all duration-200`}
    >
      <div
        className={`${isEditing ? "opacity-100 h-10" : "opacity-0 h-0 pointer-events-none"} transition-all duration-200`}
      >
        <Toolbar editor={editor} />
      </div>
      {isEditing && (
        <DragHandle editor={editor}>
          <GripVertical className="w-5 h-5 bg-surface rounded-sm m-1 text-subtle hover:text-text cursor-grab active:cursor-grabbing" />
        </DragHandle>
      )}
      <EditorContent
        editor={editor}
        spellCheck={false}
        onClick={(e) => {
          // Custom anchor tag handling to both disable links
          // when editing and account for custom internal links
          const target = e.target as HTMLElement;
          const link = target.closest("a");
          if (isEditing) {
            editor?.commands.focus();
            return;
          }
          if (!link) return;
          e.preventDefault();
          const href = link.getAttribute("href") ?? "";
          if (href.startsWith("/notes/")) {
            navigate(href);
          } else {
            window.open(href, "_blank", "noopener,noreferrer");
          }
        }}
        className={`overflow-y-auto ${isEditing ? "[&_a]:pointer-events-none [&_a]:pointer-text py-2" : "py-4"} transition-all duration-200`}
      />
    </div>
  );
}

export default Editor;

// <BubbleMenu editor={editor}>
//       <button onClick={() => editor.chain().focus().toggleBold().run()}>
//         Bold
//       </button>
//       <button onClick={() => editor.chain().focus().toggleItalic().run()}>
//         Italic
//       </button>
//     </BubbleMenu>

//     <FloatingMenu editor={editor}>
//       <button
//         onClick={() =>
//           editor.chain().focus().toggleHeading({ level: 1 }).run()
//         }
//       >
//         H1
//       </button>
//     </FloatingMenu>
