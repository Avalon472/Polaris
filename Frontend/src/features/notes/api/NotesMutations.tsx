import api from "@/lib/axios";
import type { NotePayload, UpdateNotePayload } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationFn: async (payload: NotePayload) => {
      const { data } = await api.post("/notes/create", payload);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success(`Your note: ${data.title} was created successfully!`);
      if (location.pathname !== "/notes/") {
        navigate(`/notes/`, { replace: true });
      }
    },
    onError: (error) => toast.error(error.message),
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationFn: async (noteId: string) => {
      const { data } = await api.delete(`/notes/${noteId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success(`Note deleted successfully!`);
      if (location.pathname !== "/notes/") {
        navigate(`/notes/`);
      }
    },
    onError: (error) => toast.error(error.message),
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationFn: async ({ _id, ...payload }: UpdateNotePayload) => {
      const { data } = await api.post(`/notes/edit/${_id}`, payload);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success(`Your note: ${data.title} was updated successfully!`);
      if (location.pathname !== "/notes/") {
        navigate(`/notes/`);
      }
    },
    onError: (error) => toast.error(error.message),
  });
};
