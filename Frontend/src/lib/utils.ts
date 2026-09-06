import { type NoteFileNode, type NoteListItem } from "@/types/notes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createDescription = (noteBody: string) => {
  if (noteBody.length < 100) {
    return noteBody;
  } else {
    return noteBody.slice(0, 100).trimEnd() + "...";
  }
};

export const createFileTree = (noteList: NoteListItem[]): NoteFileNode[] => {
  const root: NoteFileNode[] = [];

  for (const note of noteList) {
    const notePath = note.path ?? "/";
    const noteSegments = notePath.split("/").filter(Boolean); // Ignores leading '/'

    if (noteSegments.length === 0) {
      // Root-level note
      root.push({
        type: "note",
        name: note.title,
        path: "/",
        noteSlug: note.slug,
        noteType: note.type ?? "general",
      });
    } else {
      // Sibling nodes, or empty list if the folder hasn't been created yet
      const childrenNodes = findCreateFolder(
        noteSegments,
        root,
        `/${noteSegments[0]}`,
      );
      childrenNodes.push({
        type: "note",
        name: note.title,
        path: notePath,
        noteSlug: note.slug,
        noteType: note.type ?? "general",
      });
    }
  }

  return sortNodes(root);
};

const findCreateFolder = (
  segments: string[],
  nodes: NoteFileNode[],
  fullPath: string,
): NoteFileNode[] => {
  if (segments.length === 0) return nodes;

  // Pull out first segment of remaining path
  const [headSegment, ...rest] = segments;

  // Check if a folder already exists
  // If not, creates a new one
  let folder = nodes.find(
    (node) => node.type === "folder" && node.name === headSegment,
  );
  if (!folder) {
    folder = {
      type: "folder",
      name: headSegment,
      path: fullPath,
      children: [],
    };
    nodes.push(folder);
  }

  // Recurse to get deepest existing path
  return findCreateFolder(
    rest,
    folder.children!,
    `${fullPath}/${rest[0] ?? ""}`,
  );
};

const sortNodes = (nodes: NoteFileNode[]): NoteFileNode[] => {
  return nodes
    .sort((a, b) => {
      // Ensures folders come first in the list
      if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
      // Same comparison kind but for strings, alphebetical sort
      return a.name.localeCompare(b.name);
    })
    .map((node) =>
      node.type === "folder"
        ? // Recursive sorting of all folders' children
          { ...node, children: sortNodes(node.children!) }
        : node,
    );
};

export const sortNodeLayer = (nodes: NoteFileNode[]): NoteFileNode[] => {
  // Same sort algorithm but avoids recursive sorting for folders
  return nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
};
