import { FC } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface CardActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * Component for card action buttons (edit and delete)
*/
export const CardActions: FC<CardActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex space-x-1">
      <button
        onClick={onEdit}
        className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        aria-label="Edit card"
      >
        <PencilIcon className="w-4 h-4" />
      </button>
      <button
        onClick={onDelete}
        className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
        aria-label="Delete card"
      >
        <TrashIcon className="w-4 h-4" />
      </button>
    </div>
  );
};
