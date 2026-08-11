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
