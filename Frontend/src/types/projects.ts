import type { Note } from "./notes";

export const ProjectStatus = {
  NOT_STARTED: "not started",
  IN_PROGRESS: "in progress",
  TESTING: "testing",
  ON_HOLD: "on hold",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};
type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];

export const ProjectPriority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
};
type ProjectPriority = (typeof ProjectPriority)[keyof typeof ProjectPriority];

export const ProjectClass = {
  BUG: "bug",
  TASK: "task",
  SUBTASK: "subtask",
  FEATURE: "feature",
  EPIC: "epic",
};
type ProjectClass = (typeof ProjectClass)[keyof typeof ProjectClass];

export interface ProjectHeader {
  _id: string;
  parentID: string;
  title: string;
  itemDescription: Note;
  status: ProjectStatus;
  priority: ProjectPriority;
  classification: ProjectClass;
  children: ProjectChild[];
  dueDate?: string;
  completedAt?: string;
  updatedAt: string;
}

export interface ProjectChild {
  _id: string;
  title: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  classification: ProjectClass;
}
