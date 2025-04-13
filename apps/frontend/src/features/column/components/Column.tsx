import { FC, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ColumnProps } from '../types/column.types';
import { sortCards, getCardIds } from '../utils/columnUtils';
import { ColumnHeader } from './ColumnHeader';
import { ColumnContent } from './ColumnContent';
import { AddCardButton } from './AddCardButton';

/**
 * Column component for displaying and managing a column in a Kanban board
*/

export const Column: FC<ColumnProps> = ({
  id,
  title,
  cards = [],
  order,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onEditColumn,
  onDeleteColumn,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(title);

  // Sort cards by their order property
  const sortedCards = sortCards(cards);
  
  // Get card IDs for the sortable context
  const cardIds = getCardIds(sortedCards);

  // Make the column sortable (for column reordering) with a specific drag handle
  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id,
    data: {
      type: 'column',
      id,
      order
    }
  });
  
  // Style for the sortable column
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 1,
  };
  
  // We still need the droppable functionality for cards
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `droppable-${id}`,
    data: {
      type: 'column',
      id
    }
  });

  const handleEditColumn = () => {
    setIsEditing(true);
  };

  const handleSaveColumn = () => {
    if (onEditColumn) {
      onEditColumn(id, editedTitle);
    }
    setIsEditing(false);
  };

  const handleDeleteColumn = () => {
    if (onDeleteColumn) {
      onDeleteColumn(id);
    }
  };

  const handleAddCard = () => {
    if (onAddCard) {
      onAddCard(id);
    }
  };

  // Use a single ref for the column
  const setColumnRef = (node: HTMLElement | null) => {
    setSortableRef(node);
    setDroppableRef(node);
  };
  
  return (
    <div 
      ref={setColumnRef}
      style={style}
      className={`bg-gray-100 rounded-lg shadow-sm w-72 flex flex-col h-[90vh] mx-2 ${isOver ? 'ring-2 ring-blue-400' : ''} ${isDragging ? 'shadow-xl' : ''}`}
    >
      <ColumnHeader
        id={id}
        title={title}
        cardsCount={sortedCards.length}
        isEditing={isEditing}
        editedTitle={editedTitle}
        setEditedTitle={setEditedTitle}
        onEdit={handleEditColumn}
        onSave={handleSaveColumn}
        onDelete={handleDeleteColumn}
        attributes={attributes}
        listeners={listeners}
      />
      
      <ColumnContent
        id={id}
        cardIds={cardIds}
        sortedCards={sortedCards}
        onEditCard={onEditCard}
        onDeleteCard={onDeleteCard}
      />
      
      <AddCardButton onAddCard={handleAddCard} />
    </div>
  );
};
