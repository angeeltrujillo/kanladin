import { FC } from 'react';
import { Column, ColumnProps } from '../../column';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { AddColumnButton } from './AddColumnButton';

interface BoardContentProps {
  columnIds: string[];
  sortedColumns: ColumnProps[];
  onEditColumn?: (columnId: string, title: string) => void;
  onDeleteColumn?: (columnId: string) => void;
  onAddCard?: (columnId: string) => void;
  onEditCard?: (cardId: string, title: string, description: string) => void;
  onDeleteCard?: (cardId: string) => void;
  onAddColumn: () => void;
}

/**
 * Content component for the board, containing columns and add column button
 */
export const BoardContent: FC<BoardContentProps> = ({
  columnIds,
  sortedColumns,
  onEditColumn,
  onDeleteColumn,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onAddColumn,
}) => {
  return (
    <div className="flex-1 bg-gray-50 overflow-x-auto p-4">
      <div className="flex h-full items-start">
        <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
          {sortedColumns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              cards={column.cards}
              order={column.order}
              onEditColumn={onEditColumn}
              onDeleteColumn={onDeleteColumn}
              onAddCard={onAddCard}
              onEditCard={onEditCard}
              onDeleteCard={onDeleteCard}
            />
          ))}
        </SortableContext>
        <AddColumnButton onAddColumn={onAddColumn} />
      </div>
    </div>
  );
};
