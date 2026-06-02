export type NoteType = "general" | "framework" | "tool" | "project-spec";

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
  description?: string;
  tags: string[];
  type: NoteType;
  notecard?: NoteCard;
  updatedAt: string;
  pinned: boolean;
}

// Full shape
export interface Note extends NoteListItem {
  body: string;
  author: string; // User ID
  references: NoteReference[];
  referencedBy: NoteReference[];
  archivedAt: string | null;
  createdAt: string;
}

// Reference shape
export interface NoteReference {
  _id: string;
  title: string;
  slug: string;
  notecard?: NoteCard;
}
