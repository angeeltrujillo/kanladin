import React, { ReactNode } from 'react';
import { useCardOperations } from '../hooks/useCardOperations';
import { useBoard } from '../../board';
import { CardContext } from './CardContextDef';

interface CardContextProps {
  children: ReactNode;
}

// Provider component
export const CardProvider: React.FC<CardContextProps> = ({ children }) => {
  const { refetch, columns, setColumns } = useBoard();
  const { 
    handleAddCard: addCard, 
    handleEditCard: editCard, 
    handleDeleteCard: deleteCard,
    handleMoveCard: moveCard,
    handleUpdateCardOrder: updateCardOrder
  } = useCardOperations(refetch);

  // Wrap the operations to provide the necessary context
  const handleAddCard = (columnId: string) => {
    addCard(columnId, columns, setColumns);
  };

  const handleEditCard = (cardId: string, title: string, description: string) => {
    editCard(cardId, title, description, columns, setColumns);
  };

  const handleDeleteCard = (cardId: string) => {
    deleteCard(cardId, columns, setColumns);
  };

  const handleMoveCard = (cardId: string, targetColumnId: string, newOrder: number) => {
    moveCard(cardId, targetColumnId, newOrder);
  };

  const handleUpdateCardOrder = (cardId: string, newOrder: number) => {
    updateCardOrder(cardId, newOrder);
  };

  const value = {
    handleAddCard,
    handleEditCard,
    handleDeleteCard,
    handleMoveCard,
    handleUpdateCardOrder
  };

  return (
    <CardContext.Provider value={value}>
      {children}
    </CardContext.Provider>
  );
};
