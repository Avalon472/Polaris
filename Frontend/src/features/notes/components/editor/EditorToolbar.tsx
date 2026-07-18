import { useEditorState, type Editor } from "@tiptap/react";
import { Link } from "lucide-react";

interface ToolbarBtnProps {
  onClick: () => void;
  isActive?: boolean;
  title: string;
  children: React.ReactNode;
}

const ToolbarBtn = ({
  onClick,
  isActive,
  title,
  children,
}: ToolbarBtnProps) => (
  <button
    title={title}
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    className={`
      px-2 py-1 rounded text-xs transition-colors border border-surface
      ${
        isActive
          ? "bg-accent-purple-bg text-accent"
          : "text-subtle hover:text-muted hover:bg-surface"
      }
    `}
  >
    {children}
  </button>
);

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) return null;

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isCode: ctx.editor.isActive("code"),
      isH1: ctx.editor.isActive("heading", { level: 1 }),
      isH2: ctx.editor.isActive("heading", { level: 2 }),
      isBulletList: ctx.editor.isActive("bulletList"),
      isCodeBlock: ctx.editor.isActive("codeBlock"),
      isBlockquote: ctx.editor.isActive("blockquote"),
    }),
  });

  return (
    <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-bg2">
      <ToolbarBtn
        title="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editorState.isBold}
      >
        <strong>B</strong>
      </ToolbarBtn>

      <ToolbarBtn
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editorState.isItalic}
      >
        <em>I</em>
      </ToolbarBtn>

      <ToolbarBtn
        title="Inline code"
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editorState.isCode}
      >
        {"</>"}
      </ToolbarBtn>

      {/* divider */}
      <div className="w-px h-4 bg-transparent mx-1" />

      <ToolbarBtn
        title="Heading 1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editorState.isH1}
      >
        H1
      </ToolbarBtn>

      <ToolbarBtn
        title="Heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editorState.isH2}
      >
        H2
      </ToolbarBtn>

      <div className="w-px h-4 bg-transparent mx-1" />

      <ToolbarBtn
        title="Bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editorState.isBulletList}
      >
        • List
      </ToolbarBtn>

      <ToolbarBtn
        title="Code block"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editorState.isCodeBlock}
      >
        Block
      </ToolbarBtn>

      <ToolbarBtn
        title="Blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editorState.isBlockquote}
      >
        "
      </ToolbarBtn>
      <ToolbarBtn
        title="Hyperlink"
        onClick={() => {
          const previousUrl = editor.getAttributes("link").href;
          const url = window.prompt("URL", previousUrl);
          if (!url || url === "") return;
          editor.chain().focus().setLink({ href: url }).run();
        }}
        isActive={editorState.isBold}
      >
        <Link className="text-xs" size={16} />
      </ToolbarBtn>
    </div>
  );
};

export default Toolbar;
