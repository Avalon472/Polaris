import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetNotesByParam } from "../../api/NotesQueries";

const WikiLinkView = ({ node, updateAttributes }: NodeViewProps) => {
  const navigate = useNavigate();
  const { id, slug, title } = node.attrs;

  // Query by ID if available, otherwise slug
  const { data: linkedNote } = useGetNotesByParam(
    id ? "id" : "slug",
    id ?? slug,
  );

  // Sync attributes whenever the live note data changes
  useEffect(() => {
    if (!linkedNote?.[0]) return;
    const note = linkedNote[0];

    // Update cached values if anything has drifted
    if (note._id !== id || note.slug !== slug || note.title !== title) {
      updateAttributes({
        id: note._id,
        slug: note.slug,
        title: note.title,
      });
    }
  }, [linkedNote]);

  const sharedClasses =
    "border border-accent-purple-border bg-accent-purple-bg px-1.5 py-0.5 rounded-md text-sm ";
  return (
    // Needs to have NodeViewWrapper as root element to allow for
    // rendering in TipTap's ProseMirror
    <NodeViewWrapper as="span" className="inline">
      {linkedNote && linkedNote[0] ? (
        <span
          className={`text-accent-purple cursor-pointer hover:bg-accent-purple-bg/80 ${sharedClasses}`}
          // onMouseEnter={() => setIsHovered(true)}
          // onMouseLeave={() => setIsHovered(false)}
          onClick={() => navigate(`/notes/${linkedNote[0].slug}`)}
        >
          {linkedNote[0].title}
        </span>
      ) : (
        // Falls back to cached title if note wasn't found, disabled appearance
        <span className={`text-muted line-through ${sharedClasses}`}>
          {title}
        </span>
      )}
    </NodeViewWrapper>
  );
};

export default WikiLinkView;
