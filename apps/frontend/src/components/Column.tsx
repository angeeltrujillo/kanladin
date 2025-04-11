import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Card, CardProps } from './Card';

export interface ColumnProps {
  id: string;
  title: string;
  cards: CardProps[];
  onAddCard?: (columnId: string) => void;
  onEditCard?: (cardId: string, title: string, description: string) => void;
  onDeleteCard?: (cardId: string) => void;
  onEditColumn?: (columnId: string, title: string) => void;
  onDeleteColumn?: (columnId: string) => void;
}

export const Column = ({
  id,
  title,
  cards = [],
  onAddCard,
  onEditCard,
  onDeleteCard,
  onEditColumn,
  onDeleteColumn,
}: ColumnProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

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

  return (
    <div className="bg-gray-100 rounded-lg shadow-sm w-72 flex flex-col max-h-[calc(100vh-2rem)] mx-2">
      {/* Column Header */}
      <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-1 px-2 py-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
              placeholder="Column title"
            />
            <button
              onClick={handleSaveColumn}
              className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              aria-label="Save column title"
            >
              <CheckIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <h2 className="text-gray-800 font-semibold text-sm uppercase tracking-wide">
              {title} <span className="text-gray-500 font-normal">({cards.length})</span>
            </h2>
            <div className="flex space-x-1">
              <button
                onClick={handleEditColumn}
                className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                aria-label="Edit column"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
              <button
                onClick={handleDeleteColumn}
                className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                aria-label="Delete column"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cards Container */}
      <div className="p-2 flex-1 overflow-y-auto space-y-2">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            onEdit={onEditCard}
            onDelete={onDeleteCard}
          />
        ))}
      </div>

      {/* Add Card Button */}
      <div className="p-2 border-t border-gray-200">
        <button
          onClick={handleAddCard}
          className="w-full py-2 px-3 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md border border-gray-300 shadow-sm flex items-center justify-center space-x-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add a card</span>
        </button>
      </div>
    </div>
  );
};
