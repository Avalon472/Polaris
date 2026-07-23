import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { useNavigate } from "react-router-dom";

const WikiLinkView = ({ node }: NodeViewProps) => {
  const navigate = useNavigate();
  // TODO: Add trigger for wiki hover card
  // const [isHovered, setIsHovered] = useState(false);
  const { title, slug } = node.attrs;
  // TODO: Add in call to get wiki card data
  // const { data: linkedNote } = useGetNotesByParam("slug", slug);

  return (
    // Needs to have NodeViewWrapper as root element to allow for
    // rendering in TipTap's ProseMirror
    <NodeViewWrapper as="span" className="inline">
      <span
        className="text-accent-purple border border-accent-purple-border bg-accent-purple-bg px-1.5 py-0.5 rounded-md text-sm cursor-pointer hover:bg-accent-purple-bg/80 relative"
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/notes/${slug}`)}
      >
        {title}
      </span>
    </NodeViewWrapper>
  );
};

export default WikiLinkView;
