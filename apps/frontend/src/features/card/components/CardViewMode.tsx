import { FC } from 'react';
import { Menu } from '@headlessui/react';
import { CardActions } from './CardActions';

interface CardViewModeProps {
  title: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * Component for displaying a card in view mode
*/
export const CardViewMode: FC<CardViewModeProps> = ({ 
  title, 
  description, 
  onEdit, 
  onDelete 
}) => {
  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-md font-semibold text-gray-800 break-words pr-2">{title}</h3>
        <Menu as="div" className="relative inline-block text-left">
          <CardActions onEdit={onEdit} onDelete={onDelete} />
        </Menu>
      </div>
      {description && (
        <p className="text-sm text-gray-600 break-words whitespace-pre-wrap">{description}</p>
      )}
    </>
  );
};
