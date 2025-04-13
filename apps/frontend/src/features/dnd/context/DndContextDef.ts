import { createContext } from 'react';
import { CardProps } from '../../card';

export interface DndContextValue {
  activeCard: CardProps | null;
}

// Create context
export const DndContext = createContext<DndContextValue | undefined>(undefined);
