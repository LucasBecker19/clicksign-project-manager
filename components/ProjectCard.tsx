"use client";

import Image from "next/image";
import { useCallback, useId, useState } from "react";

import useCloseOnOutside from "@/hooks/useCloseOnOutside";

export default function ProjectCard() {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);
    const menuRef = useCloseOnOutside<HTMLDivElement>(isMenuOpen, closeMenu);
    const menuId = useId();

    const toggleFavorite = () => {
        setIsFavorite((prevState) => !prevState);
    };

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen((prevState) => !prevState);
    };

    return (
        <div className="flex flex-col w-fit">
            <div className="rounded-tr-2xl rounded-tl-2xl relative">
                <Image src="/images/project-card-placeholder.svg" alt="Project Card Placeholder" width={346} height={231} />
                <button
                    type="button"
                    aria-pressed={isFavorite}
                    aria-label={isFavorite ? "Desfavoritar projeto" : "Favoritar projeto"}
                    className="absolute right-[72px] bottom-5 w-7 h-7 cursor-pointer bg-transparent p-0 border-0"
                    onClick={toggleFavorite}
                >
                    <Image
                        src={isFavorite ? "/images/favorite.svg" : "/images/favorite-outline.svg"}
                        alt=""
                        fill
                        className="object-cover hover-zoom"
                    />
                </button>
                <div ref={menuRef}>
                    <button
                        type="button"
                        aria-expanded={isMenuOpen}
                        aria-controls={menuId}
                        aria-label={isMenuOpen ? "Fechar menu do card" : "Abrir menu do card"}
                        className="absolute right-4 bottom-4 w-9 h-9 cursor-pointer bg-transparent p-0 border-0"
                        onClick={toggleMenu}
                    >
                        <Image src="/images/menu.svg" alt="" fill className="object-cover hover-zoom" />
                    </button>
                    {isMenuOpen && (
                        <div id={menuId}>
                            <div className="absolute right-[26px] bottom-0 bg-white rounded-[2px] h-4 w-4 border-0 rotate-45"></div>
                            <div className="absolute right-4 bottom-[-95px] bg-white rounded-lg min-w-[120px] z-10 overflow-hidden shadow-[0px_4px_4px_0px_#00000040]">
                                <button type="button" className="cursor-pointer w-full text-left px-5 py-[14px] hover:bg-gray-100 font-normal text-base leading-4 text-accent border-b border-line">
                                    <div className="flex items-center gap-3">
                                        <Image src="/images/edit.svg" alt="" width={24} height={24} />
                                        <span>Editar</span>
                                    </div>
                                </button>
                                <button type="button" className="cursor-pointer w-full text-left px-5 py-[14px] hover:bg-gray-100 font-normal text-base leading-4 text-accent">
                                    <div className="flex items-center gap-3">
                                        <Image src="/images/trash.svg" alt="" width={24} height={24} />
                                        <span>Remover</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="rounded-br-2xl rounded-bl-2xl flex flex-col gap-4 p-6 border border-[#DCDCDC] bg-white">
                <div className="flex flex-col gap-3 border-b-1 border-line pb-4">
                    <p className="font-bold text-xl leading-none text-title">Projeto 01</p>
                    <div className="flex items-center">
                        <span className="mr-2 font-bold text-base leading-none text-description">Cliente:</span>
                        <span className="font-normal text-base leading-none text-description">Clicksign</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Image src="/images/calendar-day-light.svg" alt="Calendar day light icon" width={24} height={24} />
                        <span>01 de setembro de 2024</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Image src="/images/calendar-check-light.svg" alt="Calendar check light icon" width={24} height={24} />
                        <span>12 de dezembro de 2024</span>
                    </div>
                </div>
            </div>
        </div>
    );
}