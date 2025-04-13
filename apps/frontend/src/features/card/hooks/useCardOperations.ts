import { useMutation } from '@apollo/client';
import { CREATE_CARD, UPDATE_CARD, DELETE_CARD, MOVE_CARD, UPDATE_CARD_ORDER } from '../graphql';
import { ColumnProps } from '../../column';

/**
 * Hook for managing card operations
 */
export const useCardOperations = (refetch: () => void) => {
  // Setup mutation hooks
  const [createCardMutation] = useMutation(CREATE_CARD, {
    onCompleted: () => refetch(),
    onError: (error) => console.error('Error creating card:', error)
  });
  
  const [updateCardMutation] = useMutation(UPDATE_CARD, {
    onCompleted: () => refetch(),
    onError: (error) => console.error('Error updating card:', error)
  });
  
  const [deleteCardMutation] = useMutation(DELETE_CARD, {
    onCompleted: () => refetch(),
    onError: (error) => console.error('Error deleting card:', error)
  });
  
  const [moveCardMutation] = useMutation(MOVE_CARD, {
    onCompleted: () => refetch(),
    onError: (error) => console.error('Error moving card:', error)
  });
  
  const [updateCardOrderMutation] = useMutation(UPDATE_CARD_ORDER, {
    onCompleted: () => refetch(),
    onError: (error) => console.error('Error updating card order:', error)
  });

  /**
   * Handle adding a new card
   */
  const handleAddCard = (
    columnId: string,
    columns: ColumnProps[],
    setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>
  ) => {
    // Find the column
    const columnIndex = columns.findIndex(col => col.id === columnId);
    if (columnIndex === -1) return;
    
    // Generate a temporary ID
    const tempId = `temp-${Date.now()}`;
    
    // Calculate card order
    const column = columns[columnIndex];
    const maxOrder = column.cards.reduce((max, card) => Math.max(max, card.order || 0), -1);
    const newOrder = maxOrder + 1;
    
    // Optimistically update UI
    const newCard = {
      id: tempId,
      title: 'New Card',
      description: '',
      columnId,
      order: newOrder
    };
    
    const newColumns = [...columns];
    newColumns[columnIndex] = {
      ...column,
      cards: [...column.cards, newCard]
    };
    
    setColumns(newColumns);
    
    // Call mutation
    createCardMutation({
      variables: {
        title: 'New Card',
        description: '',
        columnId,
        order: newOrder
      }
    });
  };

  /**
   * Handle editing a card
   */
  const handleEditCard = (
    cardId: string,
    title: string,
    description: string,
    columns: ColumnProps[],
    setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>
  ) => {
    // Find the card
    let foundCard = false;
    const newColumns = columns.map(column => {
      const cardIndex = column.cards.findIndex(card => card.id === cardId);
      if (cardIndex === -1) return column;
      
      foundCard = true;
      const updatedCards = [...column.cards];
      updatedCards[cardIndex] = {
        ...updatedCards[cardIndex],
        title,
        description
      };
      
      return {
        ...column,
        cards: updatedCards
      };
    });
    
    if (!foundCard) return;
    
    // Optimistically update UI
    setColumns(newColumns);
    
    // Call mutation
    updateCardMutation({
      variables: {
        id: cardId,
        title,
        description
      }
    });
  };

  /**
   * Handle deleting a card
   */
  const handleDeleteCard = (
    cardId: string,
    columns: ColumnProps[],
    setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>
  ) => {
    // Find the card
    let foundCard = false;
    const newColumns = columns.map(column => {
      const cardIndex = column.cards.findIndex(card => card.id === cardId);
      if (cardIndex === -1) return column;
      
      foundCard = true;
      const updatedCards = [...column.cards];
      updatedCards.splice(cardIndex, 1);
      
      return {
        ...column,
        cards: updatedCards
      };
    });
    
    if (!foundCard) return;
    
    // Optimistically update UI
    setColumns(newColumns);
    
    // Call mutation
    deleteCardMutation({
      variables: {
        id: cardId
      }
    });
  };

  /**
   * Handle moving a card between columns
   */
  const handleMoveCard = (
    cardId: string,
    targetColumnId: string,
    newOrder: number
  ) => {
    // The UI is already updated by the DnD context
    // We just need to call the mutation
    moveCardMutation({
      variables: {
        id: cardId,
        columnId: targetColumnId,
        order: newOrder
      }
    });
  };

  /**
   * Handle updating a card's order within a column
   */
  const handleUpdateCardOrder = (
    cardId: string,
    newOrder: number
  ) => {
    // The UI is already updated by the DnD context
    // We just need to call the mutation
    updateCardOrderMutation({
      variables: {
        id: cardId,
        order: newOrder
      }
    });
  };

  return {
    handleAddCard,
    handleEditCard,
    handleDeleteCard,
    handleMoveCard,
    handleUpdateCardOrder
  };
};
