import mongoose, { Schema } from "mongoose";

const NoteSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true },
    body: { type: String, required: true }, // raw markdown/HTML from editor
    bodyText: { type: String }, // plain text strip for search
    description: { type: String }, // brief Github-style summary

    author: { type: Schema.Types.ObjectId, ref: "User", required: true },

    // Bidirectional linking
    references: [{ type: Schema.Types.ObjectId, ref: "Note" }],
    referencedBy: [{ type: Schema.Types.ObjectId, ref: "Note" }],

    tags: [{ type: String, lowercase: true }],
    pinned: { type: Boolean, default: false },
    type: {
      type: String,
      enum: [
        "general",
        "framework",
        "tool",
        "project-spec",
        "article",
        "project-item",
      ],
      default: "general",
    },
    path: { type: String, default: "/" },

    // Soft delete
    archivedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

// Indexes
NoteSchema.index({ tags: 1 });
NoteSchema.index({ title: "text", bodyText: "text" }); // for full-text search

// Unique contstraints, each author can only use title and slug once
NoteSchema.index({ author: 1, title: 1 }, { unique: true });
NoteSchema.index({ author: 1, slug: 1 }, { unique: true });

const Note = mongoose.model("Note", NoteSchema);
export default Note;
