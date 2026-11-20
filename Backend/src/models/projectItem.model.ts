import mongoose, { Schema } from "mongoose";

const ProjectItemSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parentID: {
      type: Schema.Types.ObjectId,
      ref: "ProjectItem",
      required: false, // Has to be set to false to allow null as a value
      default: null,
    }, // Item with parent ID of null is the root item/epic for the project
    title: { type: String, required: true, unique: true, trim: true }, // Serves same purpose as note title, at higher level for easier access and searching

    itemDescription: {
      type: Schema.Types.ObjectId,
      ref: "Note",
      required: true,
    }, // Associated note to hold details for the item
    status: {
      type: String,
      enum: [
        "not started",
        "in progress",
        "testing",
        "on hold",
        "completed",
        "cancelled",
      ],
      required: true,
      default: "not started",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      required: false, // Won't be necessary for epic and maybe feature levels
      default: "medium",
    },
    classification: {
      type: String,
      enum: ["bug", "task", "subtask", "feature", "epic"],
      required: true,
    },

    // Slightly redundant but helps track and populate relationship
    children: [{ type: Schema.Types.ObjectId, ref: "ProjectItem" }],

    dueDate: { type: Date },
    completedAt: { type: Date },
  },
  { timestamps: true },
);

// TODO: Add indexes if necessary

const ProjectItem = mongoose.model("ProjectItem", ProjectItemSchema);
export default ProjectItem;
