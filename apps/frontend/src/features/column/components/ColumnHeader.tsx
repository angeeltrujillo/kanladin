import { FC } from 'react';
import { PencilIcon, TrashIcon, CheckIcon, Bars3Icon } from '@heroicons/react/24/outline';
import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

interface ColumnHeaderProps {
  id: string;
  title: string;
  cardsCount: number;
  isEditing: boolean;
  editedTitle: string;
  setEditedTitle: (title: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onDelete: () => void;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
}

/**
 * Header component for a column
 */
export const ColumnHeader: FC<ColumnHeaderProps> = ({
  title,
  cardsCount,
  isEditing,
  editedTitle,
  setEditedTitle,
  onEdit,
  onSave,
  onDelete,
  attributes,
  listeners
}) => {
  return (
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
            onClick={onSave}
            className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            aria-label="Save column title"
          >
            <CheckIcon className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Prominent drag handle for column reordering */}
            <div
              {...attributes}
              {...listeners}
              className="mr-2 p-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-200 cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              aria-label="Drag column"
            >
              <Bars3Icon className="w-5 h-5" />
            </div>
            <h2 className="text-gray-800 font-semibold text-sm uppercase tracking-wide">
              {title} <span className="text-gray-500 font-normal">({cardsCount})</span>
            </h2>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={onEdit}
              className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              aria-label="Edit column"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              aria-label="Delete column"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
