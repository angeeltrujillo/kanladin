import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CardContainerProps {
  id: string;
  columnId?: string;
  children: React.ReactNode;
}

/**
 * Container component that handles drag and drop functionality for cards
 */
export const CardContainer: FC<CardContainerProps> = ({ 
  id, 
  columnId,
  children 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id,
    data: {
      type: 'card',
      columnId
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 1,
    boxShadow: isDragging ? '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)' : 'none',
  };

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
    >
      {children}
    </div>
  );
};
