import DragHandle from "@tiptap/extension-drag-handle-react";
import { Placeholder } from "@tiptap/extensions";
import { Markdown } from "@tiptap/markdown";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { GripVertical } from "lucide-react";
import { useEffect } from "react";
import Toolbar from "./EditorToolbar";

interface EditorProps {
  initialContent?: string;
  onChange?: (markdown: string) => void;
}

// Editor.tsx
interface EditorProps {
  initialContent?: string;
  onChange?: (markdown: string) => void;
  isEditing: boolean;
}

function Editor({ initialContent, onChange, isEditing }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      Placeholder.configure({ placeholder: "Start writing…" }),
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
        onClick={() => isEditing && editor?.commands.focus()}
        className={`overflow-y-auto ${isEditing ? " py-2" : "py-4"} transition-all duration-200`}
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
