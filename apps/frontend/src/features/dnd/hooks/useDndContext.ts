import { useContext } from 'react';
import { DndContext } from '../context/DndContextDef';

/**
 * Custom hook to use the DnD context
 */
export const useDnd = () => {
  const context = useContext(DndContext);
  if (context === undefined) {
    throw new Error('useDnd must be used within a DndProvider');
  }
  return context;
};
