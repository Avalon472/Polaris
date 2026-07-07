import api from "@/lib/axios";
import type {
  Note,
  NoteListItem,
  NoteQueryType,
  NoteType,
} from "@/types/notes";
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
export const useGetNotesByParam = (param: NoteQueryType, value: string) => {
  return useQuery({
    queryKey: ["notes", value],
    queryFn: async () => {
      const { data } = await api.get(`/notes/${param}/${value}`);
      return data as Note[];
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

// Filters the cached primary note request
export const useNotesByType = (type: NoteType) => {
  const { data: notes, ...rest } = useGetAllNotes();
  return {
    ...rest,
    data: notes?.filter((note) => note.type === type) ?? [],
  };
};

export const usePinnedNotes = () => {
  const { data: notes, ...rest } = useGetAllNotes();
  return {
    ...rest,
    data: notes?.filter((note) => note.pinned) ?? [],
  };
};

export const useRecentNotes = (limit = 10) => {
  const { data: notes, ...rest } = useGetAllNotes();
  return {
    ...rest,
    data:
      notes
        ?.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        )
        .slice(0, limit) ?? [],
  };
};
