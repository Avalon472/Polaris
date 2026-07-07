export type NoteType =
  | "general"
  | "framework"
  | "tool"
  | "project-spec"
  | "article";
export const NoteType = {
  GENERAL: "general",
  FRAMEWORK: "framework",
  TOOL: "tool",
  PROJECT_SPEC: "project-spec",
  ARTICLE: "article",
};

// Hover/Preview
export interface NoteCard {
  summary: string;
  coverIcon?: string;
  tags: string[];
}

// Minimal shape
export interface NoteListItem {
  _id: string;
  title: string;
  slug: string;
  body: string;
  description?: string;
  tags?: string[];
  type?: NoteType;
  notecard?: NoteCard;
  updatedAt: string;
  pinned: boolean;
}

// Full shape
export interface Note extends NoteListItem {
  author: string; // User ID
  references?: NoteReference[];
  referencedBy?: NoteReference[];
  archivedAt?: string;
  createdAt: string;
}

// Reference shape
export interface NoteReference {
  _id: string;
  title: string;
  slug: string;
  notecard?: NoteCard;
}

// Shape of Fields for Create and Update
export interface NotePayload {
  title: string;
  body: string;
  tags?: string[];
  type?: NoteType;
}

export interface UpdateNotePayload extends NotePayload {
  _id: string;
  pinned?: boolean;
}

export type NoteQueryType = "id" | "tag" | "slug";
