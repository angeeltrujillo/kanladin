import { useState } from 'react';
import { Board } from './components/Board';
import { Card, CardProps } from './components/Card';
import { ColumnProps } from './components/Column';
import { DndContext, closestCenter, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

// Initial demo data
const initialColumns: ColumnProps[] = [
  {
    id: 'col-1',
    title: 'To Do',
    cards: [
      { id: 'card-1', title: 'Research API options', description: 'Compare REST vs GraphQL for our backend' },
      { id: 'card-2', title: 'Design database schema', description: 'Create initial schema for DynamoDB' },
      { id: 'card-3', title: 'Setup project structure', description: '' },
    ]
  },
  {
    id: 'col-2',
    title: 'In Progress',
    cards: [
      { id: 'card-4', title: 'Create UI components', description: 'Build Card and Column components with Tailwind' },
      { id: 'card-5', title: 'Implement drag and drop', description: 'Use Pragmatic Drag and Drop library' },
    ]
  },
  {
    id: 'col-3',
    title: 'Done',
    cards: [
      { id: 'card-6', title: 'Project setup', description: 'Initialize repository and configure tools' },
    ]
  }
];

function App() {
  const [columns, setColumns] = useState<ColumnProps[]>(initialColumns);
  const [nextCardId, setNextCardId] = useState(7);
  const [nextColumnId, setNextColumnId] = useState(4);
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
          title="Kanladin Project Board"
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
