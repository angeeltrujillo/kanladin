import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Board } from './components/Board';
import { Card, CardProps } from './components/Card';
import { ColumnProps } from './components/Column';
import { DndContext, closestCenter, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { GET_BOARDS } from './apollo/queries';
import { BoardsData } from './types/graphql';

// Empty columns array for initialization
const emptyColumns: ColumnProps[] = [];

function App() {
  const { loading, error, data } = useQuery<BoardsData>(GET_BOARDS);
  
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
  const [nextCardId, setNextCardId] = useState(7);
  const [nextColumnId, setNextColumnId] = useState(4);
  const [activeCard, setActiveCard] = useState<CardProps | null>(null);
  
  // Update columns when data is loaded from the API
  useEffect(() => {
    if (data) {
      setColumns(convertToColumnProps(data));
    }
  }, [data]);

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
    const newColumn: ColumnProps = {
      id: `col-${nextColumnId}`,
      title: `New Column`,
      cards: []
    };
    setColumns([...columns, newColumn]);
    setNextColumnId(nextColumnId + 1);
  };

  const handleEditColumn = (columnId: string, title: string) => {
    setColumns(columns.map(column => 
      column.id === columnId ? { ...column, title } : column
    ));
  };

  const handleDeleteColumn = (columnId: string) => {
    setColumns(columns.filter(column => column.id !== columnId));
  };

  // Card handlers
  const handleAddCard = (columnId: string) => {
    const newCard: CardProps = {
      id: `card-${nextCardId}`,
      title: 'New Task',
      description: ''
    };
    setColumns(columns.map(column => 
      column.id === columnId 
        ? { ...column, cards: [...column.cards, newCard] } 
        : column
    ));
    setNextCardId(nextCardId + 1);
  };

  const handleEditCard = (cardId: string, title: string, description: string) => {
    setColumns(columns.map(column => ({
      ...column,
      cards: column.cards.map(card => 
        card.id === cardId ? { ...card, title, description } : card
      )
    })));
  };

  const handleDeleteCard = (cardId: string) => {
    setColumns(columns.map(column => ({
      ...column,
      cards: column.cards.filter(card => card.id !== cardId)
    })));
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

  // Handle drag end event for cards
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // Reset active card when drag ends
    setActiveCard(null);
    
    if (!over) return;
    
    // Get data from active and over elements
    const activeData = active.data.current;
    const overData = over.data.current;
    
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
          setColumns(columns.map(column => {
            if (column.id === sourceColumn.id) {
              const oldIndex = column.cards.findIndex(card => card.id === active.id);
              const newIndex = column.cards.findIndex(card => card.id === over.id);
              
              return {
                ...column,
                cards: arrayMove(column.cards, oldIndex, newIndex)
              };
            }
            return column;
          }));
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
              
              const newCards = [...column.cards];
              newCards.splice(newIndex, 0, {...draggedCard, columnId: targetColumnId});
              
              return {
                ...column,
                cards: newCards
              };
            }
            return column;
          });
          
          setColumns(updatedColumns);
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
            
            return {
              ...column,
              cards: [...column.cards, {...draggedCard, columnId: targetColumnId}]
            };
          }
          return column;
        });
        
        setColumns(updatedColumns);
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
