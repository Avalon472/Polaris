import api from "@/lib/axios";
import type {
  Note,
  NoteListItem,
  NotePayload,
  NoteQueryType,
  UpdateNotePayload,
} from "@/types/notes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: NotePayload) => {
      const { data } = await api.post("/notes/create", payload);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success(`Your note: ${data.title} was created successfully!`);
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (noteId: string) => {
      const { data } = await api.delete(`/notes/${noteId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success(`Note deleted successfully!`);
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ _id, ...payload }: UpdateNotePayload) => {
      const { data } = await api.post(`/notes/edit/${_id}`, payload);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success(`Your note: ${data.title} was updated successfully!`);
    },
  });
};
