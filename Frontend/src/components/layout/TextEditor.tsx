// src/Editor.tsx
"use client";

import { Tiptap, useEditor } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";

function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
  });

  if (!editor) return null;

  return (
    <Tiptap editor={editor}>
      <Tiptap.Content />

      <BubbleMenu editor={editor}>
        <button>Bold</button>
        <button>Italic</button>
      </BubbleMenu>

      <FloatingMenu editor={editor}>
        <button>Add heading</button>
      </FloatingMenu>
    </Tiptap>
  );
}

export default Editor;
