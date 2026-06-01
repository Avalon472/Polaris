import mongoose, { Schema } from "mongoose";

const NoteSchema = new Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    body: { type: String, required: true }, // raw markdown/HTML from editor
    bodyText: { type: String }, // plain text strip for search
    description: { type: String }, // brief Github-style summary

    author: { type: Schema.Types.ObjectId, ref: "User", required: true },

    // Bidirectional linking
    references: [{ type: Schema.Types.ObjectId, ref: "Note" }],
    referencedBy: [{ type: Schema.Types.ObjectId, ref: "Note" }],

    // Wikipedia-style hover card
    notecard: {
      summary: { type: String, maxlength: 280 },
      coverIcon: { type: String },
      tags: [String],
    },

    tags: [{ type: String, lowercase: true }],
    type: {
      type: String,
      enum: ["general", "framework", "tool", "project-spec"],
      default: "general",
    },

    // Soft delete
    archivedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

// Indexes
NoteSchema.index({ tags: 1 });
NoteSchema.index({ title: "text", bodyText: "text" }); // for full-text search

const Note = mongoose.model("Note", NoteSchema);
export default Note;
