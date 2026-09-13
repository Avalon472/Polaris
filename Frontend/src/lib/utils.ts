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
        "/",
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
  currentPath: string,
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
      path: currentPath,
      children: [],
    };
    nodes.push(folder);
  }

  const nextPath = `${fullPath}/${rest[0] ?? ""}`.replace(/\/$/, "");
  // Recurse to get deepest existing path
  return findCreateFolder(rest, folder.children!, `${fullPath}/`, nextPath);
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

export const findLayerParent = (
  nodes: NoteFileNode[],
  currentFolderPath: string,
): NoteFileNode[] => {
  const parentSegments = currentFolderPath
    .split("/")
    .filter(Boolean)
    .slice(0, -1);
  const parentPath =
    parentSegments.length === 0 ? "/" : `/${parentSegments.join("/")}/`;

  // Check if parent or self is root level
  if (parentPath === "/" || currentFolderPath === "/") {
    return nodes;
  }

  let currentLayer = nodes;
  for (const segment of parentSegments) {
    const folder = currentLayer.find(
      (node) => node.type === "folder" && node.name === segment,
    );
    // Jump back to root if a segment or its child nodes can't be located
    if (!folder || !folder.children) {
      return nodes;
    }
    currentLayer = folder.children!;
  }

  return currentLayer;
};

export const findLayerByPath = (
  tree: NoteFileNode[],
  targetPath: string,
): NoteFileNode[] => {
  // Guard against calling on root level
  if (targetPath === "/") return tree.filter((node) => node.path === "/");

  // Split path into segments to navigate the tree
  const segments = targetPath.split("/").filter(Boolean);

  let currentNodes = tree;

  for (const segment of segments) {
    const folder = currentNodes.find(
      (n) => n.type === "folder" && n.name === segment,
    );
    if (!folder || !folder.children) return [];
    currentNodes = folder.children;
  }

  // Returns the children of the deepest matched folder
  return currentNodes;
};
