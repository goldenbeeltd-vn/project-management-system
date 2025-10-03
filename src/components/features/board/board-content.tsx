/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseSensor, TouchSensor } from "@/lib/DndKitSensors";
import { Card, Column, Project } from "@/types/common";
import { generatePlaceholderCard } from "@/utils/formatters";
import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { cloneDeep, isEmpty } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import CardComponent from "./card/card";
import ColumnComponent from "./column/column";
import ListColumn from "./column/list-column";

interface BoardContentProps {
  project: Project | null;
  moveColumns: (dndOrderedColumns: Column[]) => void;
  moveCardInSameColumn: (
    dndOrderedCards: Card[],
    dndOrderedCardIds: string[],
    columnId: string,
  ) => void;
  moveCardToDifferentColumn: (
    cardId: string,
    prevColumnId: string,
    nextColumnId: string,
    dndOrderedColumns: Column[],
  ) => void;
}

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "COLUMN",
  CARD: "CARD",
};

const BoardContent = ({
  project,
  moveColumns,
  moveCardInSameColumn,
  moveCardToDifferentColumn,
}: BoardContentProps) => {
  // DndKit sensors
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  // State
  const [orderedColumns, setOrderedColumns] = useState<Column[]>([]);
  const [activeDragItemId, setActiveDragItemId] = useState<string | null>(null);
  const [activeDragItemType, setActiveDragItemType] = useState<string | null>(
    null,
  );
  const [activeDragItemData, setActiveDragItemData] = useState<any>(null);
  const [oldColumn, setOldColumn] = useState<Column | null>(null);
  const [pendingMoveCard, setPendingMoveCard] = useState<{
    cardId: string;
    prevColumnId: string;
    nextColumnId: string;
    nextColumns: Column[];
  } | null>(null);
  const lastOverId = useRef<string | null>(null);

  useEffect(() => {
    setOrderedColumns(project?.columns || []);
  }, [project]);

  // Thực hiện moveCardToDifferentColumn sau render
  useEffect(() => {
    if (pendingMoveCard) {
      moveCardToDifferentColumn(
        pendingMoveCard.cardId,
        pendingMoveCard.prevColumnId,
        pendingMoveCard.nextColumnId,
        pendingMoveCard.nextColumns,
      );
      setPendingMoveCard(null);
    }
  }, [pendingMoveCard, moveCardToDifferentColumn]);

  // Tìm column theo cardId
  const findColumnByCardId = (cardId: string) => {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card.id).includes(cardId),
    );
  };

  // Di chuyển card giữa các column
  const moveCardBetweenDifferentColumns = (
    overColumn: Column,
    overCardId: string,
    activeColumn: Column,
    activeCardId: string,
    active: any,
    over: any,
    activeCardData: Card,
    triggerFrom: string,
  ) => {
    setOrderedColumns((prevColumns) => {
      const overCardIndex = overColumn.cards.findIndex(
        (card) => card.id === overCardId,
      );
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;
      const newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn.cards.length + 1;

      const nextColumns = cloneDeep(prevColumns);
      const nextActiveColumn = nextColumns.find(
        (col) => col.id === activeColumn.id,
      );
      const nextOverColumn = nextColumns.find(
        (col) => col.id === overColumn.id,
      );

      if (nextActiveColumn) {
        // Xóa card khỏi column đang kéo
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card.id !== activeCardId,
        );

        // Thêm Placeholder card nếu column đang kéo là rỗng
        if (isEmpty(nextActiveColumn.cards)) {
          // Tạo placeholder card cho column rỗng
          const placeholder = generatePlaceholderCard(
            nextActiveColumn,
          ) as unknown as Card;
          nextActiveColumn.cards = [placeholder];
          nextActiveColumn.cardOrderIds = [placeholder.id];
        } else {
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card) => card.id,
          );
        }
      }

      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card.id !== activeCardId,
        );
        nextOverColumn.cards = [
          ...nextOverColumn.cards.slice(0, newCardIndex),
          { ...activeCardData, columnId: nextOverColumn.id },
          ...nextOverColumn.cards.slice(newCardIndex),
        ];
        // Xóa Placeholder card nếu column đang kéo qua có placeholder card
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !(card as any).FE_PlaceholderCard,
        );
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card.id,
        );
      }

      if (triggerFrom === "handleDragEnd") {
        setPendingMoveCard({
          cardId: activeDragItemId!,
          prevColumnId: oldColumn!.id,
          nextColumnId: nextOverColumn!.id,
          nextColumns,
        });
      }

      return nextColumns;
    });
  };

  // DndKit event handlers
  const handleDragStart = (event: any) => {
    const { active } = event;
    if (!active) return;
    setActiveDragItemId(active.id);
    setActiveDragItemType(
      active.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN,
    );
    setActiveDragItemData(active.data?.current);
    if (active.data?.current?.columnId) {
      setOldColumn(findColumnByCardId(active.id) ?? null);
    }
  };

  const handleDragOver = (event: any) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;
    const activeCardId = active.id;
    const overCardId = over.id;
    const activeColumn = findColumnByCardId(activeCardId);
    const overColumn = findColumnByCardId(overCardId);
    if (!activeColumn || !overColumn) return;
    if (activeColumn.id !== overColumn.id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        activeColumn,
        activeCardId,
        active,
        over,
        active.data.current,
        "handleDragOver",
      );
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!active || !over) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const activeCardId = active.id;
      const overCardId = over.id;
      const activeColumn = findColumnByCardId(activeCardId);
      const overColumn = findColumnByCardId(overCardId);
      if (!activeColumn || !overColumn) return;

      if (oldColumn && oldColumn.id !== overColumn.id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          activeColumn,
          activeCardId,
          active,
          over,
          active.data.current,
          "handleDragEnd",
        );
      } else {
        // Di chuyển trong cùng column
        const oldCardIndex = oldColumn?.cards.findIndex(
          (card) => card.id === activeDragItemId,
        );
        const newCardIndex = overColumn?.cards.findIndex(
          (card) => card.id === overCardId,
        );
        if (oldCardIndex !== undefined && newCardIndex !== undefined) {
          const dndOrderedCards = arrayMove(
            oldColumn!.cards,
            oldCardIndex,
            newCardIndex,
          );
          const dndOrderedCardIds = dndOrderedCards.map((card) => card.id);
          setOrderedColumns((prevColumns) => {
            const nextColumns = cloneDeep(prevColumns);
            const targetColumn = nextColumns.find(
              (col) => col.id === overColumn.id,
            );
            if (targetColumn) {
              targetColumn.cards = dndOrderedCards;
              targetColumn.cardOrderIds = dndOrderedCardIds;
            }
            return nextColumns;
          });
          moveCardInSameColumn(
            dndOrderedCards,
            dndOrderedCardIds,
            oldColumn!.id,
          );
        }
      }
    }

    if (
      activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
      active.id !== over.id
    ) {
      const oldColumnIndex = orderedColumns.findIndex(
        (col) => col.id === active.id,
      );
      const newColumnIndex = orderedColumns.findIndex(
        (col) => col.id === over.id,
      );
      if (oldColumnIndex !== -1 && newColumnIndex !== -1) {
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex,
        );
        setOrderedColumns(dndOrderedColumns);
        moveColumns(dndOrderedColumns);
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumn(null);
  };

  // DragOverlay animation
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  // Custom collisionDetection
  const collisionDetectionStrategy = useCallback(
    (args: any) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }
      const pointerIntersections = pointerWithin(args);
      if (!pointerIntersections?.length) return [];
      let overId = getFirstCollision(pointerIntersections, "id");
      if (overId) {
        const checkColumn = orderedColumns.find((col) => col.id === overId);
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container: any) =>
                container.id !== overId &&
                checkColumn?.cardOrderIds?.includes(container.id),
            ),
          })[0]?.id;
        }
        lastOverId.current =
          typeof overId === "string" ? overId : String(overId);
        return [{ id: overId }];
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColumns],
  );

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
    >
      <SortableContext
        items={orderedColumns.map((col) => col.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex-1 w-full relative">
          <ListColumn columns={orderedColumns} />
        </div>
      </SortableContext>
      <DragOverlay dropAnimation={dropAnimation}>
        {!activeDragItemType && null}
        {activeDragItemId &&
          activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <ColumnComponent column={activeDragItemData} />
          )}
        {activeDragItemId &&
          activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <CardComponent card={activeDragItemData} />
          )}
      </DragOverlay>
    </DndContext>
  );
};

export default BoardContent;
