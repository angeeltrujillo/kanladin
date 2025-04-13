import React, { ReactNode } from 'react';
import { DndContext as DndKitContext, closestCenter } from '@dnd-kit/core';
import { DragOverlay } from '@dnd-kit/core';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { ColumnProps } from '../../column';
import { Card } from '../../card';
import { DndContext } from './DndContextDef';

interface DndContextProps {
  children: ReactNode;
  columns: ColumnProps[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>;
}

// Provider component
export const DndProvider: React.FC<DndContextProps> = ({ children, columns, setColumns }) => {
  const { sensors, activeCard, handleDragStart, handleDragEnd } = useDragAndDrop(columns, setColumns);

  const value = {
    activeCard
  };

  return (
    <DndContext.Provider value={value}>
      <DndKitContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {children}
        
        {/* Drag overlay for floating card effect */}
        <DragOverlay>
          {activeCard && (
            <Card
              id={activeCard.id}
              title={activeCard.title}
              description={activeCard.description}
              columnId={activeCard.columnId}
            />
          )}
        </DragOverlay>
      </DndKitContext>
    </DndContext.Provider>
  );
};
