import api from "@/lib/axios";
import type { NotePayload, UpdateNotePayload } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: NotePayload) => {
      const { data } = await api.post("/notes/create", payload);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success(`Your note: ${data.title} was created successfully!`);
      navigate(`/notes/${data.slug}`, { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (noteId: string) => {
      const { data } = await api.delete(`/notes/${noteId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success(`Note deleted successfully!`);
      navigate("/notes/");
    },
    onError: (error) => toast.error(error.message),
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ _id, ...payload }: UpdateNotePayload) => {
      const { data } = await api.post(`/notes/edit/${_id}`, payload);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success(`Your note: ${data.title} was updated successfully!`);
      navigate("/notes/");
    },
    onError: (error) => toast.error(error.message),
  });
};
