import { useState, FC } from 'react';
import { CardContainer } from './CardContainer';
import { CardEditForm } from './CardEditForm';
import { CardViewMode } from './CardViewMode';
import { CardProps } from '../types/card.types';

/**
 * Card component for displaying and managing individual task cards
*/

export const Card: FC<CardProps> = ({ 
  id, 
  title = "New task", 
  description = "", 
  columnId,
  onEdit, 
  onDelete 
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (cardId: string, newTitle: string, newDescription: string) => {
    if (onEdit) {
      onEdit(cardId, newTitle, newDescription);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <CardContainer id={id} columnId={columnId}>
      {isEditing ? (
        <CardEditForm
          id={id}
          initialTitle={title}
          initialDescription={description}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <CardViewMode
          title={title}
          description={description}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </CardContainer>
  );
};
