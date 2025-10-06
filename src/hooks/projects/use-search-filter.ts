import { useState, useCallback, useMemo } from "react";
import { useDebounce } from "../use-debounce";

export function useSearchFilter(initialValue = "", delay = 300) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  const updateSearchTerm = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const hasSearchTerm = useMemo(() => {
    return debouncedSearchTerm.trim().length > 0;
  }, [debouncedSearchTerm]);

  return {
    searchTerm,
    debouncedSearchTerm,
    updateSearchTerm,
    clearSearch,
    hasSearchTerm,
  };
}
