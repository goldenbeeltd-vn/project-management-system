import { useState, useCallback } from "react";

export function useSidebar(initialCollapsed = false) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const collapseSidebar = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  const expandSidebar = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  return {
    isCollapsed,
    setIsCollapsed,
    toggleSidebar,
    collapseSidebar,
    expandSidebar,
  };
}
