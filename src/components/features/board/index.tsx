"use client";

import { mockProjects } from "@/constants/mock-data";
import { clearCurrentActiveCard } from "@/store/activeCard/activeCardSlice";
import { setActiveProject } from "@/store/activeProject/activeProjectSlice";
import { RootState } from "@/store/store";
import { Card as CardType, Column as ColumnType } from "@/types/common";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActiveCardModal from "./active-card";
import BoardBar from "./board-bar";
import BoardContent from "./board-content";

const Board = () => {
  // Lấy state từ redux-toolkit
  const dispatch = useDispatch();
  const activeProject = useSelector(
    (state: RootState) => state.activeProject.activeProject,
  );
  const isShowModalActiveCard = useSelector(
    (state: RootState) => state.activeCard.isShowModalActiveCard,
  );

  // Khởi tạo project mặc định nếu chưa có
  // (Chỉ chạy 1 lần khi mount)
  useEffect(() => {
    if (!activeProject) dispatch(setActiveProject(mockProjects[0]));
  }, [activeProject, dispatch]);

  const moveColumns = (dndOrderedColumns: ColumnType[]) => {
    if (!activeProject) return;
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column.id);
    const newProject = structuredClone(activeProject);
    newProject.columns = dndOrderedColumns;
    newProject.columnOrderIds = dndOrderedColumnsIds;
    dispatch(setActiveProject(newProject));
  };

  // Kéo thả sắp xếp lại cards trong cùng column
  const moveCardInSameColumn = (
    dndOrderedCards: CardType[],
    dndOrderedCardIds: string[],
    columnId: string,
  ) => {
    if (!activeProject) return;
    const newProject = structuredClone(activeProject);
    const columnUpdate = newProject.columns.find(
      (column) => column.id === columnId,
    );
    if (columnUpdate) {
      columnUpdate.cards = dndOrderedCards;
      columnUpdate.cardOrderIds = dndOrderedCardIds;
    }
    dispatch(setActiveProject(newProject));
  };

  // Kéo thả card sang column khác
  const moveCardToDifferentColumn = (
    cardId: string,
    prevColumnId: string,
    nextColumnId: string,
    dndOrderedColumns: ColumnType[],
  ) => {
    if (!activeProject) return;
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column.id);
    const newProject = structuredClone(activeProject);
    newProject.columns = dndOrderedColumns;
    newProject.columnOrderIds = dndOrderedColumnsIds;
    dispatch(setActiveProject(newProject));
  };

  return (
    <>
      <BoardBar
        projects={mockProjects}
        activeProject={activeProject}
        setActiveProject={(project) => dispatch(setActiveProject(project))}
      />
      <BoardContent
        project={activeProject}
        moveColumns={moveColumns}
        moveCardInSameColumn={moveCardInSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
      <ActiveCardModal
        open={isShowModalActiveCard}
        onClose={() => dispatch(clearCurrentActiveCard())}
      />
    </>
  );
};

export default Board;
