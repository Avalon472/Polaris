import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetNotesByParam } from "../../api/NotesQueries";

interface WikiLinkProps {
  title: string;
  slug: string;
  invalidLink?: boolean;
}
export const WikiLink = ({
  title,
  slug,
  invalidLink = false,
}: WikiLinkProps) => {
  const navigate = useNavigate();
  const sharedClasses =
    "border border-accent-purple-border bg-accent-purple-bg px-1.5 py-0.5 rounded-md text-sm ";

  return (
    <>
      {invalidLink ? (
        // Disabled appearance for broken references
        <span className={`text-muted line-through ${sharedClasses}`}>
          {title}
        </span>
      ) : (
        <span
          className={`text-accent-purple cursor-pointer hover:bg-accent-purple-bg/80 ${sharedClasses}`}
          // onMouseEnter={() => setIsHovered(true)}
          // onMouseLeave={() => setIsHovered(false)}
          onClick={() => navigate(`/notes/${slug}`)}
        >
          {title}
        </span>
      )}
    </>
  );
};

export const WikiLinkNode = ({ node, updateAttributes }: NodeViewProps) => {
  const { id, slug: embeddedSlug, title: embeddedTitle } = node.attrs;

  const noteID: string | undefined = id !== "null" ? id : undefined;
  // Query by ID if available, otherwise slug
  const { data: linkedNote } = useGetNotesByParam(
    noteID ? "id" : "slug",
    noteID ?? embeddedSlug,
  );

  // Sync attributes whenever the live note data changes
  useEffect(() => {
    if (!linkedNote?.[0]) return;
    const note = linkedNote[0];

    // Update cached values if anything has drifted
    if (
      note._id !== noteID ||
      note.slug !== embeddedSlug ||
      note.title !== embeddedTitle
    ) {
      updateAttributes({
        id: note._id,
        slug: note.slug,
        title: note.title,
      });
    }
  }, [linkedNote]);

  return (
    // Needs to have NodeViewWrapper as root element to allow for
    // rendering in TipTap's ProseMirror
    <NodeViewWrapper as="span" className="inline">
      {linkedNote && linkedNote[0] ? (
        <WikiLink title={linkedNote[0].title} slug={linkedNote[0].slug} />
      ) : (
        <WikiLink title={embeddedTitle} slug={embeddedSlug} invalidLink />
      )}
    </NodeViewWrapper>
  );
};
