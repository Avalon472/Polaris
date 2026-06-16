import { Placeholder } from "@tiptap/extensions";
import { Markdown } from "@tiptap/markdown";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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
      <EditorContent
        editor={editor}
        spellCheck={false}
        onClick={() => isEditing && editor?.commands.focus()}
        className={`overflow-y-auto px-9 flex-1 ${isEditing ? "cursor-text py-2" : "cursor-default py-6"} transition-all duration-200`}
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
