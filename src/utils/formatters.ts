import { Card, Column } from "@/types/common";

// Capitalize the first letter of a string
const capitalizeFirstLetter = (val: string): string => {
  if (!val) return "";
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};

const generatePlaceholderCard = (column: Column): Card => {
  return {
    id: `${column.id}-placeholder-card`,
    projectId: column.projectId,
    columnId: column.id,
    title: "",
    description: "",
    cover: "",
    comments: [],
    checklist: [],
    memberIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deadlineDate: undefined,
    _destroy: false,
    FE_PlaceholderCard: true,
  } as Card;
};

export { capitalizeFirstLetter, generatePlaceholderCard };
