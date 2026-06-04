import { Markdown } from "@tiptap/markdown";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

function Editor() {
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: "<p>Hello World!</p>",
  });

  if (!editor) return null;

  //Grab contents of editor when leaving/destroying page
  useEffect(() => () => {
    const markdownString = editor.getMarkdown();
    console.log(markdownString);
  });

  return (
    <div>
      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none"
      />

      <BubbleMenu editor={editor}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
      </BubbleMenu>

      <FloatingMenu editor={editor}>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
      </FloatingMenu>
    </div>
  );
}

export default Editor;
