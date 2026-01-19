import Image from "next/image";
import { RefObject } from "react";

interface ProjectCardMenuProps {
  isOpen: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  menuId: string;
  onToggle: (e: React.MouseEvent) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProjectCardMenu({
  isOpen,
  menuRef,
  menuId,
  onToggle,
  onEdit,
  onDelete,
}: ProjectCardMenuProps) {
  return (
    <div ref={menuRef}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? "Fechar menu do card" : "Abrir menu do card"}
        className="absolute right-4 bottom-4 w-9 h-9 cursor-pointer bg-transparent p-0 border-0"
        onClick={onToggle}
      >
        <Image src="/images/menu.svg" alt="" fill className="object-cover hover-zoom" />
      </button>
      {isOpen && (
        <div id={menuId}>
          <div className="absolute right-[26px] bottom-0 bg-white rounded-[2px] h-4 w-4 border-0 rotate-45"></div>
          <div className="absolute right-4 bottom-[-95px] bg-white rounded-lg min-w-[120px] z-10 overflow-hidden shadow-[var(--shadow-strong)]">
            <button
              type="button"
              className="cursor-pointer w-full text-left px-5 py-[14px] hover:bg-gray-100 font-normal text-base leading-4 text-accent border-b border-line"
              onClick={onEdit}
            >
              <div className="flex items-center gap-3">
                <Image src="/images/edit.svg" alt="" width={24} height={24} />
                <span>Editar</span>
              </div>
            </button>
            <button
              type="button"
              className="cursor-pointer w-full text-left px-5 py-[14px] hover:bg-gray-100 font-normal text-base leading-4 text-accent"
              onClick={onDelete}
            >
              <div className="flex items-center gap-3">
                <Image src="/images/trash.svg" alt="" width={24} height={24} />
                <span>Remover</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
