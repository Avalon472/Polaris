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

// Minimal shape
export interface NoteListItem {
  _id: string;
  title: string;
  slug: string;
  body: string;
  description?: string;
  tags?: string[];
  type?: NoteType;
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
}

// Shape of Fields for Create and Update
export interface NotePayload {
  title: string;
  body: string;
  tags?: string[];
  type?: NoteType;
  references?: string[];
}

export interface UpdateNotePayload extends NotePayload {
  _id: string;
  pinned?: boolean;
}

export type NoteQueryType = "id" | "tag" | "slug";
