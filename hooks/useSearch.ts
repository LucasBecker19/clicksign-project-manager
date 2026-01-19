"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useCloseOnOutside from "./useCloseOnOutside";
import useProjectStore from "@/store/projectStore";

const DEBOUNCE_MS = 300;
const MIN_SEARCH_LENGTH = 3;

export function useSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const setSearchQuery = useProjectStore((state) => state.setSearchQuery);
  const searchHistory = useProjectStore((state) => state.searchHistory);
  const addToSearchHistory = useProjectStore((state) => state.addToSearchHistory);
  const removeFromSearchHistory = useProjectStore((state) => state.removeFromSearchHistory);

  const closeSearch = useCallback(() => {
    if (searchInput.length >= MIN_SEARCH_LENGTH) {
      addToSearchHistory(searchInput);
    }
    setIsSearchOpen(false);
  }, [searchInput, addToSearchHistory]);

  const searchRef = useCloseOnOutside<HTMLDivElement>(isSearchOpen, closeSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.length >= MIN_SEARCH_LENGTH) {
        setSearchQuery(searchInput);
      } else if (searchInput.length === 0) {
        setSearchQuery("");
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchInput, setSearchQuery]);

  const filteredSearchHistory = useMemo(
    () => searchHistory.filter((item) => item.toLowerCase().includes(searchInput.toLowerCase())),
    [searchHistory, searchInput]
  );

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  return {
    searchInput,
    setSearchInput,
    isSearchOpen,
    toggleSearch,
    closeSearch,
    searchRef,
    filteredSearchHistory,
    removeFromSearchHistory,
    setSearchQuery,
  };
}
