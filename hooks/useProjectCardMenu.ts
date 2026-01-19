import type React from "react";
import { useCallback, useId, useState } from "react";
import { useRouter } from "next/navigation";
import useProjectStore from "@/store/projectStore";
import useCloseOnOutside from "./useCloseOnOutside";
import { Project } from "@/types/project";

type UseProjectCardMenuResult = {
  isMenuOpen: boolean;
  isRemoveModalOpen: boolean;
  menuRef: ReturnType<typeof useCloseOnOutside<HTMLDivElement>>;
  menuId: string;
  toggleMenu: (event: React.MouseEvent) => void;
  handleToggleFavorite: () => void;
  handleEditProject: () => void;
  handleDeleteProject: () => void;
  openRemoveModal: () => void;
  closeRemoveModal: () => void;
};

export function useProjectCardMenu(project: Project): UseProjectCardMenuResult {
  const router = useRouter();
  const toggleFavorite = useProjectStore((state) => state.toggleFavorite);
  const deleteProject = useProjectStore((state) => state.deleteProject);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const menuRef = useCloseOnOutside<HTMLDivElement>(isMenuOpen, closeMenu);
  const menuId = useId();

  const handleToggleFavorite = () => {
    toggleFavorite(project.id);
  };

  const handleDeleteProject = () => {
    deleteProject(project.id);
    setIsRemoveModalOpen(false);
  };

  const handleEditProject = () => {
    setIsMenuOpen(false);
    router.push(`/projects/edit/${project.id}`);
  };

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsMenuOpen((prevState) => !prevState);
  };

  const openRemoveModal = () => {
    setIsMenuOpen(false);
    setIsRemoveModalOpen(true);
  };

  const closeRemoveModal = () => setIsRemoveModalOpen(false);

  return {
    isMenuOpen,
    isRemoveModalOpen,
    menuRef,
    menuId,
    toggleMenu,
    handleToggleFavorite,
    handleEditProject,
    handleDeleteProject,
    openRemoveModal,
    closeRemoveModal,
  };
}
