import { createContext } from 'react';

export interface CardContextValue {
  handleAddCard: (columnId: string) => void;
  handleEditCard: (cardId: string, title: string, description: string) => void;
  handleDeleteCard: (cardId: string) => void;
  handleMoveCard: (cardId: string, targetColumnId: string, newOrder: number) => void;
  handleUpdateCardOrder: (cardId: string, newOrder: number) => void;
}

// Create context
export const CardContext = createContext<CardContextValue | undefined>(undefined);
