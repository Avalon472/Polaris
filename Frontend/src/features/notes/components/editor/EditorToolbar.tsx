import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEditorState, type Editor } from "@tiptap/react";
import { Link } from "lucide-react";
import { useState } from "react";
import EditorTooltip from "./EditorTooltip";

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
  <div
    title={title}
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    className={`
      px-3 py-1 rounded text-sm transition-colors border border-surface shrink-0 h-8 cursor-pointer
      ${
        isActive
          ? "bg-accent-purple-bg text-accent"
          : "text-subtle hover:text-muted hover:bg-surface"
      }
    `}
  >
    {children}
  </div>
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
      isAtLink: ctx.editor.isActive("link"),
    }),
  });

  const [open, setOpen] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkHref, setLinkHref] = useState("");

  const normalizeUrl = (url: string) =>
    /^([a-z][a-z0-9+.-]*:|\/|#)/i.test(url) ? url : `https://${url}`;

  const handleOpenChange = (next: boolean) => {
    if (next) {
      if (editor.isActive("link")) editor.commands.extendMarkRange("link");
      const { from, to } = editor.state.selection;
      setLinkText(editor.state.doc.textBetween(from, to, " "));
      setLinkHref(editor.getAttributes("link").href ?? "");
    }
    setOpen(next);
  };

  const save = () => {
    const href = linkHref.trim() ? normalizeUrl(linkHref.trim()) : "";
    const chain = editor.chain().focus();

    if (!href) {
      chain.extendMarkRange("link").unsetLink().run();
    } else {
      const { from, to } = editor.state.selection;
      const original = editor.state.doc.textBetween(from, to, " ");
      const text = linkText || href;

      if (text === original && from !== to) {
        chain.setLink({ href }).run();
      } else {
        chain
          .insertContentAt(
            { from, to },
            {
              type: "text",
              text,
              marks: [{ type: "link", attrs: { href } }],
            },
          )
          .run();
      }
    }
    setOpen(false);
  };
  return (
    <div className="flex items-stretch gap-2 px-3 py-2 border-b border-border bg-bg2">
      <div className="flex items-center gap-2 flex-wrap max-h-18 overflow-y-auto scrollbar-thin">
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
          Inline
        </ToolbarBtn>

        {/* divider */}
        <div className="w-px h-4 bg-transparent mx-1" />

        <ToolbarBtn
          title="Heading 1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editorState.isH1}
        >
          H1
        </ToolbarBtn>

        <ToolbarBtn
          title="Heading 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
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
          {"</>"}
        </ToolbarBtn>

        <ToolbarBtn
          title="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editorState.isBlockquote}
        >
          "
        </ToolbarBtn>

        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger>
            <ToolbarBtn
              title="Hyperlink"
              onClick={() => {
                // Handled by popover
              }}
              isActive={editorState.isAtLink}
            >
              <Link className="text-xs" size={16} />
            </ToolbarBtn>
          </PopoverTrigger>
          <PopoverContent>
            <form
              className="flex flex-col gap-1 p-1"
              onSubmit={(e) => {
                e.preventDefault();
                save();
              }}
            >
              <label htmlFor="linkText" className="text-base">
                Text to display
              </label>
              <input
                id="linkText"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="bg-bg3 border border-border"
              />

              <label htmlFor="linkHref" className="text-base">
                Link URL
              </label>
              <input
                id="linkHref"
                value={linkHref}
                onChange={(e) => setLinkHref(e.target.value)}
                className="bg-bg3 border border-border"
              />

              <button type="submit" className="buttonCore mt-2">
                Save
              </button>
            </form>
          </PopoverContent>
        </Popover>
      </div>

      <div className="ml-auto border-l border-border px-4 flex items-center justify-center">
        <EditorTooltip />
      </div>
    </div>
  );
};

export default Toolbar;
