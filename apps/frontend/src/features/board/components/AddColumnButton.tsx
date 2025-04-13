import { FC } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface AddColumnButtonProps {
  onAddColumn: () => void;
}

/**
 * Button component for adding a new column
*/
export const AddColumnButton: FC<AddColumnButtonProps> = ({ onAddColumn }) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-sm w-72 h-min mx-2 overflow-hidden">
      <button
        onClick={onAddColumn}
        className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium flex items-center justify-center space-x-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Add Column</span>
      </button>
    </div>
  );
};
