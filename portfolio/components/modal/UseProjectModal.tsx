import { ProjectProp } from "@/types/project";
import { create } from "zustand";

interface UseProjectModalStore {
  isOpen: boolean;
  project: ProjectProp | null;
  onOpen: (project: ProjectProp | null) => void;
  onClose: () => void;
}

export const UseProjectModal = create<UseProjectModalStore>((set) => ({
  isOpen: false,
  project: null,
  onOpen: (project) => set({ isOpen: true, project }),
  onClose: () => set({ isOpen: false, project: null }),
}));
