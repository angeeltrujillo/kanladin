import { useState } from 'react';
import { DragEndEvent, DragStartEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { CardProps } from '../../card';
import { ColumnProps } from '../../column';
import { useCard } from '../../card/hooks/useCardContext';
import { useColumn } from '../../column/hooks/useColumnContext';

/**
 * Hook for managing drag and drop functionality
 */
export const useDragAndDrop = (columns: ColumnProps[], setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>) => {
  // Get card and column operations from context
  const { handleMoveCard } = useCard();
  const { handleReorderColumns } = useColumn();
  // Active card state for drag overlay
  const [activeCard, setActiveCard] = useState<CardProps | null>(null);

  // Setup sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum distance required before activating
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Handle drag start event
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = active.id as string;

    // Find the active card
    for (const column of columns) {
      const card = column.cards.find(card => card.id === activeId);
      if (card) {
        setActiveCard(card);
        break;
      }
    }
  };

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveCard(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) {
      setActiveCard(null);
      return;
    }

    // Check if we're dragging a card
    const isCardDrag = active.data.current?.type === 'card';
    
    if (isCardDrag) {
      handleCardDragEnd(activeId, overId);
    } else {
      handleColumnDragEnd(activeId, overId);
    }

    setActiveCard(null);
  };

  // Handle card drag end
  const handleCardDragEnd = (activeId: string, overId: string) => {
    // Find source column and card index
    let sourceColumnIndex = -1;
    let sourceCardIndex = -1;
    let targetColumnIndex = -1;
    let targetCardIndex = -1;

    // Find the source column and card
    for (let i = 0; i < columns.length; i++) {
      const cardIndex = columns[i].cards.findIndex(card => card.id === activeId);
      if (cardIndex !== -1) {
        sourceColumnIndex = i;
        sourceCardIndex = cardIndex;
        break;
      }
    }

    if (sourceColumnIndex === -1) return;

    // Check if we're dropping on a card or a column
    const isOverCard = columns.some(column => column.cards.some(card => card.id === overId));

    if (isOverCard) {
      // Find the target column and card
      for (let i = 0; i < columns.length; i++) {
        const cardIndex = columns[i].cards.findIndex(card => card.id === overId);
        if (cardIndex !== -1) {
          targetColumnIndex = i;
          targetCardIndex = cardIndex;
          break;
        }
      }

      if (targetColumnIndex === -1) return;

      // Create a new columns array to update state
      const newColumns = [...columns];
      const sourceColumn = newColumns[sourceColumnIndex];
      const targetColumn = newColumns[targetColumnIndex];

      // Get the card we're moving
      const card = sourceColumn.cards[sourceCardIndex];

      // Remove card from source column
      sourceColumn.cards.splice(sourceCardIndex, 1);

      // Add card to target column
      const newOrder = targetCardIndex;
      targetColumn.cards.splice(targetCardIndex, 0, {
        ...card,
        columnId: targetColumn.id,
        order: newOrder
      });

      setColumns(newColumns);
      
      // Call the mutation to update the backend
      handleMoveCard(card.id, targetColumn.id, newOrder);
    } else {
      // We're dropping directly on a column
      // Find the target column
      targetColumnIndex = columns.findIndex(column => column.id === overId);
      if (targetColumnIndex === -1) return;

      // Create a new columns array to update state
      const newColumns = [...columns];
      const sourceColumn = newColumns[sourceColumnIndex];
      const targetColumn = newColumns[targetColumnIndex];

      // Get the card we're moving
      const card = sourceColumn.cards[sourceCardIndex];

      // Remove card from source column
      sourceColumn.cards.splice(sourceCardIndex, 1);

      // Add card to target column at the end
      const newOrder = targetColumn.cards.length;
      targetColumn.cards.push({
        ...card,
        columnId: targetColumn.id,
        order: newOrder
      });

      setColumns(newColumns);
      
      // Call the mutation to update the backend
      handleMoveCard(card.id, targetColumn.id, newOrder);
    }
  };

  // Handle column drag end
  const handleColumnDragEnd = (activeId: string, overId: string) => {
    const oldIndex = columns.findIndex(column => column.id === activeId);
    const newIndex = columns.findIndex(column => column.id === overId);

    if (oldIndex === -1 || newIndex === -1) return;

    // Reorder columns using arrayMove
    const reorderedColumns = [...columns];
    const [removed] = reorderedColumns.splice(oldIndex, 1);
    reorderedColumns.splice(newIndex, 0, removed);

    setColumns(reorderedColumns);
    
    // Call the mutation to update the backend
    // Extract the column IDs in the new order
    const columnIds = reorderedColumns.map(column => column.id);
    handleReorderColumns(columnIds);
  };

  return {
    sensors,
    activeCard,
    handleDragStart,
    handleDragEnd
  };
};
