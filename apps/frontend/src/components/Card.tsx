import { useState } from 'react';
import { PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';

export interface CardProps {
  id: string;
  title: string;
  description: string;
  onEdit?: (id: string, title: string, description: string) => void;
  onDelete?: (id: string) => void;
}

export const Card = ({ 
  id, 
  title = "New task", 
  description = "", 
  onEdit, 
  onDelete 
}: CardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onEdit) {
      onEdit(id, editedTitle, editedDescription);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200">
      {isEditing ? (
        // Edit mode
        <div className="space-y-3">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
            placeholder="Card title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
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
      ) : (
        // View mode
        <>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-md font-semibold text-gray-800 break-words pr-2">{title}</h3>
            <Menu as="div" className="relative inline-block text-left">
              <div className="flex space-x-1">
                <button
                  onClick={handleEdit}
                  className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  aria-label="Edit card"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  aria-label="Delete card"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </Menu>
          </div>
          {description && (
            <p className="text-sm text-gray-600 break-words whitespace-pre-wrap">{description}</p>
          )}
        </>
      )}
    </div>
  );
};