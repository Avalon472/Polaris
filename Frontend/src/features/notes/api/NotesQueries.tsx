import api from "@/lib/axios";
import type { Note, NoteListItem, NoteQueryType } from "@/types/notes";
import { useQuery } from "@tanstack/react-query";

export const useGetAllNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data } = await api.get("/notes/getAll");
      return data as NoteListItem[];
    },
  });
};

//Works for ID, tags, slugs
export const useGetNotesByParam = (
  param: NoteQueryType,
  value: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ["notes", param, value],
    queryFn: async () => {
      if (value !== "null" && enabled) {
        const { data } = await api.get(`/notes/${param}/${value}`);
        return data as Note[];
      } else {
        return [];
      }
    },
    //Ensures param exists before firing query
    enabled: Boolean(value),
  });
};

export const useGetTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await api.get("/notes/getTags");
      return data as string[];
    },
  });
};
