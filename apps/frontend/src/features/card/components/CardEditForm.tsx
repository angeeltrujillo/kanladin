import { FC, useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

interface CardEditFormProps {
  id: string;
  initialTitle: string;
  initialDescription: string;
  onSave: (id: string, title: string, description: string) => void;
  onCancel: () => void;
}

/**
 * Form component for editing a card's title and description
*/
export const CardEditForm: FC<CardEditFormProps> = ({
  id,
  initialTitle,
  initialDescription,
  onSave,
  onCancel
}) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [description, setDescription] = useState<string>(initialDescription);

  const handleSave = () => {
    onSave(id, title, description);
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          // Prevent space key and other keys from triggering other events
          e.stopPropagation();
          // Cancel editing on Escape key
          if (e.key === 'Escape') {
            onCancel();
          }
          // Save on Enter key
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent default Enter behavior
            handleSave();
          }
        }}
        className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
        placeholder="Card title"
        autoFocus
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={(e) => {
          // Prevent all keyboard events from bubbling up
          e.stopPropagation();
          // Cancel editing on Escape key
          if (e.key === 'Escape') {
            onCancel();
          }
          // Allow Enter key for new lines, but Ctrl+Enter to save
          if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault(); // Prevent default Enter behavior
            handleSave();
          }
        }}
        className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[80px] resize-none"
        placeholder="Add a description..."
      />
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <CheckIcon className="w-4 h-4 mr-1" />
          Save
        </button>
      </div>
    </div>
  );
};
