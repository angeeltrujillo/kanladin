import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Board } from './features/board';
import { Card, CardProps } from './features/card';
import { ColumnProps } from './features/column';
import { DndContext, closestCenter, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { GET_BOARDS } from './apollo/queries';
import { CREATE_CARD, UPDATE_CARD, DELETE_CARD, MOVE_CARD, UPDATE_CARD_ORDER, CREATE_COLUMN, UPDATE_COLUMN, DELETE_COLUMN, UPDATE_MULTIPLE_COLUMN_ORDERS } from './apollo/mutations';
import { BoardsData } from './types/graphql';

// Empty columns array for initialization
const emptyColumns: ColumnProps[] = [];

function App() {
  const { loading, error, data, refetch } = useQuery<BoardsData>(GET_BOARDS);
  
  const convertToColumnProps = (data?: BoardsData): ColumnProps[] => {
    if (!data || !data.boards || data.boards.length === 0) {
      return emptyColumns;
    }
    
    // Use the first board (we only have one in our demo)
    const board = data.boards[0];
    
    return board.columns.map(column => ({
      id: column.id,
      title: column.title,
      cards: column.cards.map(card => ({
        id: card.id,
        title: card.title,
        description: card.description,
        columnId: card.columnId
      }))
    }));
  };
  
  // Initialize state with data from API or fallback data
  const [columns, setColumns] = useState<ColumnProps[]>(convertToColumnProps(data));
  const [activeCard, setActiveCard] = useState<CardProps | null>(null);
  
  // Update columns when data is loaded from the API
  useEffect(() => {
    if (data) {
      setColumns(convertToColumnProps(data));
    }
  }, [data]);

  // Setup mutation hooks
  const [createColumnMutation] = useMutation(CREATE_COLUMN, {
    onCompleted: () => refetch(),
    onError: (error) => console.error('Error creating column:', error)
  });
  
  const [updateColumnMutation] = useMutation(UPDATE_COLUMN, {
    onCompleted: () => refetch(),
    onError: (error) => console.error('Error updating column:', error)
  });
  
  const [deleteColumnMutation] = useMutation(DELETE_COLUMN, {
    onCompleted: () => refetch(),
    onError: (error) => console.error('Error deleting column:', error)
  });
  
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
  

  const [updateMultipleColumnOrdersMutation] = useMutation(UPDATE_MULTIPLE_COLUMN_ORDERS, {
    onCompleted: () => refetch(),
    onError: (error) => console.error('Error updating multiple column orders:', error)
  });

  // Setup sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum distance required before activating
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Column handlers
  const handleAddColumn = () => {
    // Get board ID from data (we only have one board in our demo)
    const boardId = data?.boards[0].id;
    if (!boardId) return;
    
    // Calculate new column order (max order + 1)
    // Use timestamp to ensure uniqueness in case of rapid column creation
    const maxOrder = columns.reduce((max, col) => Math.max(max, col.order || 0), -1);
    const timestamp = Date.now();
    const newOrder = maxOrder + 1 + (timestamp % 1000) / 1000;
    
    // Optimistically update UI
    const newColumn: ColumnProps = {
      id: `temp-${timestamp}`, // Temporary ID until we get the real one from the server
      title: `New Column`,
      order: newOrder,
      cards: []
    };
    setColumns([...columns, newColumn]);
    
    // Call mutation
    createColumnMutation({
      variables: {
        title: 'New Column',
        boardId,
        order: newOrder
      }
    });
  };

  const handleEditColumn = (columnId: string, title: string) => {
    // Optimistically update UI
    setColumns(columns.map(column => 
      column.id === columnId ? { ...column, title } : column
    ));
    
    // Call mutation
    updateColumnMutation({
      variables: {
        id: columnId,
        title
      }
    });
  };

  const handleDeleteColumn = (columnId: string) => {
    // Optimistically update UI
    setColumns(columns.filter(column => column.id !== columnId));
    
    // Call mutation
    deleteColumnMutation({
      variables: {
        id: columnId
      }
    });
  };

  // Card handlers
  const handleAddCard = (columnId: string) => {
    // Optimistically update UI
    const tempId = `temp-${Date.now()}`;
    const newCard: CardProps = {
      id: tempId,
      title: 'New Task',
      description: '',
      columnId: columnId
    };
    
    setColumns(columns.map(column => 
      column.id === columnId 
        ? { ...column, cards: [...column.cards, newCard] } 
        : column
    ));
    
    // Call mutation
    createCardMutation({
      variables: {
        title: 'New Task',
        description: '',
        columnId: columnId
      }
    });
  };

  const handleEditCard = (cardId: string, title: string, description: string) => {
    // Optimistically update UI
    setColumns(columns.map(column => ({
      ...column,
      cards: column.cards.map(card => 
        card.id === cardId ? { ...card, title, description } : card
      )
    })));
    
    // Call mutation
    updateCardMutation({
      variables: {
        id: cardId,
        title,
        description
      }
    });
  };

  const handleDeleteCard = (cardId: string) => {
    // Optimistically update UI
    setColumns(columns.map(column => ({
      ...column,
      cards: column.cards.filter(card => card.id !== cardId)
    })));
    
    // Call mutation
    deleteCardMutation({
      variables: {
        id: cardId
      }
    });
  };

  // Handle drag start event to set the active card
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeData = active.data.current;
    
    // Only set active card if we're dragging a card (not a column)
    if (activeData?.type === 'card') {
      // Find the card in the columns
      columns.forEach(column => {
        const foundCard = column.cards.find(card => card.id === active.id);
        if (foundCard) {
          setActiveCard({...foundCard, columnId: column.id});
        }
      });
    }
  };

  // Handle drag end event for cards and columns
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // Reset active card when drag ends
    setActiveCard(null);
    
    if (!over) return;
    
    // Get data from active and over elements
    const activeData = active.data.current;
    const overData = over.data.current;
    
    // Handle column reordering
    if (activeData?.type === 'column' && overData?.type === 'column') {
      const activeColumnId = active.id;
      const overColumnId = over.id;
      
      if (activeColumnId !== overColumnId) {
        const oldIndex = columns.findIndex(col => col.id === activeColumnId);
        const newIndex = columns.findIndex(col => col.id === overColumnId);
        
        if (oldIndex !== -1 && newIndex !== -1) {
          // Reorder columns
          const reorderedColumns = arrayMove(columns, oldIndex, newIndex);
          
          // Update order property for all columns
          const updatedColumns = reorderedColumns.map((col, index) => ({
            ...col,
            order: index
          }));
          
          // Call the handleReorderColumns function to update the backend
          handleReorderColumns(updatedColumns);
        }
      }
      return; // Exit early after handling column reordering
    }
    
    // Handle card movement
    if (activeData?.type === 'card') {
      // If we're dropping on another card (same or different column)
      if (over.id.toString().includes('card')) {
        // Find source column (where the card is coming from)
        const sourceColumn = columns.find(column => 
          column.cards.some(card => card.id === active.id)
        );
        
        if (!sourceColumn) return;
        
        // Find the card we're dropping onto
        let targetColumnId: string | undefined;
        let targetCard: CardProps | undefined;
        
        // Look through all columns to find the target card
        columns.forEach(column => {
          const foundCard = column.cards.find(card => card.id === over.id);
          if (foundCard) {
            targetColumnId = column.id;
            targetCard = foundCard;
          }
        });
        
        if (!targetColumnId || !targetCard) return;
        
        // If same column, just reorder
        if (sourceColumn.id === targetColumnId) {
          // Find the indices for reordering
          const oldIndex = sourceColumn.cards.findIndex(card => card.id === active.id);
          const newIndex = sourceColumn.cards.findIndex(card => card.id === over.id);
          
          // Create a new array of cards in the new order
          const reorderedCards = arrayMove(sourceColumn.cards, oldIndex, newIndex);
          
          // Update the order property of each card based on its new position
          const updatedCards = reorderedCards.map((card, index) => ({
            ...card,
            order: index
          }));
          
          // Update the UI optimistically
          setColumns(columns.map(column => {
            if (column.id === sourceColumn.id) {
              return {
                ...column,
                cards: updatedCards
              };
            }
            return column;
          }));
          
          // Call the mutation to update the card order in the database
          updateCardOrderMutation({
            variables: {
              id: active.id.toString(),
              order: newIndex
            }
          });
        } 
        // If different column, move card between columns
        else {
          const updatedColumns = columns.map(column => {
            // Remove from source column
            if (column.id === sourceColumn.id) {
              return {
                ...column,
                cards: column.cards.filter(card => card.id !== active.id)
              };
            }
            // Add to target column
            if (column.id === targetColumnId) {
              const newIndex = column.cards.findIndex(card => card.id === over.id);
              const draggedCard = sourceColumn.cards.find(card => card.id === active.id);
              
              if (!draggedCard) return column;
              
              // Insert the card at the new position with updated column ID and order
              const newCards = [...column.cards];
              newCards.splice(newIndex, 0, {
                ...draggedCard, 
                columnId: targetColumnId,
                order: newIndex
              });
              
              // Update order for all cards in the target column
              const updatedCards = newCards.map((card, index) => ({
                ...card,
                order: index
              }));
              
              return {
                ...column,
                cards: updatedCards
              };
            }
            return column;
          });
          
          // Update UI optimistically
          setColumns(updatedColumns);
          
          // Get the index where the card was inserted
          const targetColumn = columns.find(col => col.id === targetColumnId);
          const insertIndex = targetColumn?.cards.findIndex(card => card.id === over.id) || 0;
          
          // Call mutation to update the card's column in the database
          moveCardMutation({
            variables: {
              id: active.id.toString(),
              columnId: targetColumnId,
              order: insertIndex
            }
          });
        }
      }
      // If we're dropping directly on a column
      else if (overData?.type === 'column') {
        const sourceColumn = columns.find(column => 
          column.cards.some(card => card.id === active.id)
        );
        
        if (!sourceColumn) return;
        
        // Get target column id from the droppable id (format: droppable-col-1)
        const targetColumnId = overData.id;
        
        // Don't do anything if same column
        if (sourceColumn.id === targetColumnId) return;
        
        // Move card between columns
        const updatedColumns = columns.map(column => {
          // Remove from source column
          if (column.id === sourceColumn.id) {
            return {
              ...column,
              cards: column.cards.filter(card => card.id !== active.id)
            };
          }
          // Add to target column
          if (column.id === targetColumnId) {
            const draggedCard = sourceColumn.cards.find(card => card.id === active.id);
            
            if (!draggedCard) return column;
            
            // Calculate the order for the new card (at the end of the column)
            const newOrder = column.cards.length;
            
            // Add the card to the end of the column with updated columnId and order
            const updatedCards = [
              ...column.cards, 
              {...draggedCard, columnId: targetColumnId, order: newOrder}
            ];
            
            return {
              ...column,
              cards: updatedCards
            };
          }
          return column;
        });
        
        // Update UI optimistically
        setColumns(updatedColumns);
        
        // Call mutation to update the card's column in the database
        // Get the target column and calculate the order (at the end of the column)
        const targetColumn = columns.find(col => col.id === targetColumnId);
        const newOrder = targetColumn ? targetColumn.cards.length : 0;
        
        moveCardMutation({
          variables: {
            id: active.id.toString(),
            columnId: targetColumnId,
            order: newOrder
          }
        });
      }
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Kanban Board...</h2>
          <p className="text-gray-500 mt-2">Fetching your boards and tasks from the server</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Error Loading Data</h2>
          <p className="text-gray-500 mt-2">
            {error.message || 'There was an error connecting to the server. Please try again later.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Handle column reordering
  const handleReorderColumns = (reorderedColumns: ColumnProps[]) => {
    // Get the column IDs in their new order
    const columnIds = reorderedColumns.map(column => column.id);
    
    // Update all column orders in a single mutation
    updateMultipleColumnOrdersMutation({
      variables: {
        columns: columnIds
      }
    });
    
    // Update the local state optimistically
    setColumns(reorderedColumns);
  };
  
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col">
        <Board
          id="board-1"
          title={data?.boards[0].title || "Kanladin Project Board 1"}
          columns={columns}
          onAddColumn={handleAddColumn}
          onEditColumn={handleEditColumn}
          onDeleteColumn={handleDeleteColumn}
          onAddCard={handleAddCard}
          onEditCard={handleEditCard}
          onDeleteCard={handleDeleteCard}
          onReorderColumns={handleReorderColumns}
        />
      </div>
      
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
    </DndContext>
  );
}

export default App;
