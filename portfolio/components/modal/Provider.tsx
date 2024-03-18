"use client";

import { useEffect, useState } from "react";

import { UseProjectModal } from "./UseProjectModal";
import ProjectModal from "./Modal";

export const ProjectsModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const projectModal = UseProjectModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProjectModal initProject={projectModal.project!} />
    </>
  );
};
