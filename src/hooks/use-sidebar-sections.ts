import { useState, useCallback } from "react";

export function useSidebarSections(initialExpanded: string[] = []) {
  const [expandedSections, setExpandedSections] =
    useState<string[]>(initialExpanded);

  const toggleSection = useCallback((section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  }, []);

  const expandSection = useCallback((section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev : [...prev, section]
    );
  }, []);

  const collapseSection = useCallback((section: string) => {
    setExpandedSections((prev) => prev.filter((s) => s !== section));
  }, []);

  const isExpanded = useCallback(
    (section: string) => {
      return expandedSections.includes(section);
    },
    [expandedSections]
  );

  const expandAll = useCallback((sections: string[]) => {
    setExpandedSections(sections);
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedSections([]);
  }, []);

  return {
    expandedSections,
    toggleSection,
    expandSection,
    collapseSection,
    isExpanded,
    expandAll,
    collapseAll,
  };
}
