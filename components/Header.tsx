"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearch } from "@/hooks/useSearch";

export default function Header() {
    const {
        searchInput,
        setSearchInput,
        isSearchOpen,
        toggleSearch,
        closeSearch,
        searchRef,
        filteredSearchHistory,
        removeFromSearchHistory,
        setSearchQuery,
    } = useSearch();

    return (
        <header className="sticky top-0 z-40 bg-dark px-16 flex justify-between items-center shadow-header">
            <div></div>

            <Link href="/">
                <Image src="/images/logo.svg" alt="Clicksign Project Manager" width={193} height={72} className="my-1" />
            </Link>
            
            <button 
                type="button" 
                aria-label="Buscar" 
                className="hover-zoom bg-transparent border-0 p-0"
                onClick={toggleSearch}
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
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>

                    {filteredSearchHistory.length > 0 && (
                        <div className="flex flex-col">
                            {filteredSearchHistory.map((historyItem, index) => (
                                <div key={index} className="border-t-1 border-line justify-between flex gap-20">
                                    <div 
                                        className="flex items-center gap-4 py-[18px] px-6 cursor-pointer w-full"
                                        onClick={() => {
                                            setSearchInput(historyItem);
                                            setSearchQuery(historyItem);
                                        }}
                                    >
                                        <Image src="/images/history.svg" alt="History icon" width={16} height={16} />
                                        <span className="font-normal text-base leading-4 text-description">{historyItem}</span>
                                    </div>

                                    <button
                                        type="button"
                                        className="py-[18px] px-6 bg-transparent border-0 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFromSearchHistory(historyItem);
                                        }}
                                        aria-label="Remover busca do histórico"
                                    >
                                        <Image src="/images/remove.svg" alt="Remove icon" className="hover-zoom" width={16} height={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}