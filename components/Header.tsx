"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };

        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsSearchOpen(false);
            }
        };

        if (isSearchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscKey);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [isSearchOpen]);

    return (
        <header className="bg-dark px-16 flex justify-between items-center shadow-header">
            <div></div>

            <Link href="/">
                <Image src="/images/logo.svg" alt="Clicksign Project Manager" width={193} height={72} className="my-1" />
            </Link>
            
            <button 
                type="button" 
                aria-label="Buscar" 
                className="hover-zoom bg-transparent border-0 p-0"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
                <Image src="/images/search.svg" alt="" width={18} height={18} className="my-1" />
            </button>

            {isSearchOpen && (
                <div ref={searchRef} className="absolute top-0 left-0 right-0 bg-white flex flex-col z-50 border-2 border-accent rounded-2xl">
                    <div className="flex items-center gap-3 px-6 py-8">
                        <Image src="/images/purple-search.svg" alt="Search icon" width={18} height={18} />
                        <input 
                            type="text" 
                            placeholder="Digite o nome do projeto..." 
                            className="flex-1 bg-transparent text-text placeholder-text-secondary outline-none"
                            autoFocus
                        />
                    </div>

                    <div className="flex flex-col">
                        {/** Não preciso componentizar, terá um forEach aqui */}
                        <div className="border-t-1 border-line justify-between flex gap-20">
                            <div className="flex items-center gap-4 py-[18px] px-6 cursor-pointer w-full">
                                <Image src="/images/history.svg" alt="History icon" width={16} height={16} />
                                <span className="font-normal text-base leading-4 text-description">Projeto 1</span>
                            </div>

                            <div className="py-[18px] px-6">
                                <Image src="/images/remove.svg" alt="Remove icon" className="hover-zoom" width={16} height={16} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}