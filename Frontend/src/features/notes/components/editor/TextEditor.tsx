import { Placeholder } from "@tiptap/extensions";
import { Markdown } from "@tiptap/markdown";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import Toolbar from "./EditorToolbar";

interface EditorProps {
  initialContent?: string;
  onChange?: (markdown: string) => void;
}

function Editor({ initialContent, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      Placeholder.configure({ placeholder: "Start writing…" }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getMarkdown());
    },
    contentType: "markdown",
  });

  const [focused, setFocused] = useState(false);

  return (
    <div
      className="flex flex-col h-full border border-border rounded-[10px] bg-bg3 overflow-hidden"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div
        className={`${focused ? "opacity-100 h-8" : "opacity-0 h-0"} transition-all duration-200`}
      >
        <Toolbar editor={editor} />
      </div>

      <EditorContent
        editor={editor}
        spellCheck={false}
        className="overflow-y-auto px-9 h-full"
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
