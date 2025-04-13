import { FC } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardProps } from '../../card';

interface ColumnContentProps {
  id: string;
  cardIds: string[];
  sortedCards: CardProps[];
  onEditCard?: (cardId: string, title: string, description: string) => void;
  onDeleteCard?: (cardId: string) => void;
}

/**
 * Content component for a column, containing cards
 */
export const ColumnContent: FC<ColumnContentProps> = ({
  id,
  cardIds,
  sortedCards,
  onEditCard,
  onDeleteCard
}) => {
  return (
    <div className="p-2 flex-1 overflow-y-auto space-y-2">
      {sortedCards.length > 0 ? (
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {sortedCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              columnId={id}
              order={card.order}
              onEdit={onEditCard}
              onDelete={onDeleteCard}
            />
          ))}
        </SortableContext>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-sm">No tasks</p>
        </div>
      )}
    </div>
  );
};
