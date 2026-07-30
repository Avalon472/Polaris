import { InputRule, Node, mergeAttributes } from "@tiptap/core";
import Link from "@tiptap/extension-link";
import { TextSelection } from "@tiptap/pm/state";
import { ReactNodeViewRenderer } from "@tiptap/react";
import WikiLinkView from "./Wikilink";

export const WikiLink = Node.create({
  name: "wikilink",
  group: "inline",
  inline: true,
  atom: true, // Treated as a single unit

  // Gives the node specified attributes
  addAttributes() {
    return {
      slug: { default: null },
      title: { default: null },
      id: { default: null },
    };
  },

  // Turns node into tagged span when turned to HTML
  parseHTML() {
    return [{ tag: "span[data-wikilink]" }];
  },

  // Serialization/data form of node
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes({ "data-wikilink": "" }, HTMLAttributes)];
  },

  // Overrides renderHTML to display a react component instead
  addNodeView() {
    return ReactNodeViewRenderer(WikiLinkView);
  },

  // Tell TipTap how to serialize the node
  renderMarkdown(node) {
    const title = node.attrs?.title || "";
    const slug = node.attrs?.slug || "";
    const id = node.attrs?.id || null;

    return `[[${title}|${slug}|${id}]]`;
  },

  // Tells TipTap how to deserialize/render the node
  parseMarkdown(token) {
    const content = token.text ?? "";
    const [title, slug, id] = content.split("|");
    return {
      type: "wikilink",
      attrs: { title, slug, id: id ?? null },
    };
  },

  markdownTokenizer: {
    name: "wikilink",
    level: "inline",
    start(src: string) {
      return src.indexOf("[[");
    },
    tokenize(src: string) {
      const rule = /^\[\[([^\]]+)\]\]/;
      const match = rule.exec(src);
      if (!match) return undefined;

      return {
        type: "wikilink",
        raw: match[0], // Full matched string
        text: match[1], // Capture group, everything between brackets
      };
    },
  },

  addInputRules() {
    return [
      new InputRule({
        find: /\[\[([^\]]+)\]\]$/,
        handler: ({ state, range, match }) => {
          const { tr } = state;
          const start = range.from;
          const end = range.to;
          const title = match[1];
          const slug = title.toLowerCase().replace(/\s+/g, "-");

          // Grabs component described from node details above
          tr.replaceWith(
            start,
            end,
            this.type.create({ title, slug, id: null }),
          );
        },
      }),
    ];
  },
});

export const CustomLink = Link.extend({
  addKeyboardShortcuts() {
    const convertLink = () => {
      const { state, view } = this.editor;
      const { selection, tr } = state;
      if (!selection.empty) return false;

      const $from = selection.$from;
      const text = $from.parent.textBetween(0, $from.parentOffset);
      // Looks for [label](href) syntax
      const match = text.match(/\[([^\]]+)\]\(([^)]+)\)$/);
      if (!match) return false;

      const [, label, href] = match;
      const start = selection.from - match[0].length;
      const end = selection.from;

      // Replaces the markdown with href linked to label's text
      tr.replaceWith(start, end, state.schema.text(label));
      tr.addMark(
        start,
        start + label.length,
        state.schema.marks.link.create({ href }),
      );
      // Need to place cursor at end and remove mark to prevent it from
      // sticking and extending when user types
      tr.setSelection(TextSelection.create(tr.doc, start + label.length));
      tr.removeStoredMark(state.schema.marks.link);

      view.dispatch(tr);

      return true;
    };

    return {
      // Shortcuts for space and enter convert pasted in syntax,
      // converting it after one of them has been hit
      Space: () => {
        const converted = convertLink();
        if (!converted) return false;

        this.editor.chain().insertContent(" ").unsetLink().run();
        return true;
      },
      Enter: () => {
        const converted = convertLink();
        if (!converted) return false;
        this.editor.chain().unsetLink().run();
        // Return false in either case to fallback to default TipTap handling
        return false;
      },
    };
  },
});
