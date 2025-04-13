import { FC } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface AddCardButtonProps {
  onAddCard: () => void;
}

/**
 * Button component for adding a new card to a column
 */
export const AddCardButton: FC<AddCardButtonProps> = ({ onAddCard }) => {
  return (
    <div className="p-2 border-t border-gray-200">
      <button
        onClick={onAddCard}
        className="w-full py-2 px-3 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md border border-gray-300 shadow-sm flex items-center justify-center space-x-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon className="w-4 h-4" />
        <span>Add a card</span>
      </button>
    </div>
  );
};
