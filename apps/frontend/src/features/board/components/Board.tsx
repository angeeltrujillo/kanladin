import { FC } from 'react';
import { BoardProps } from '../types/board.types';
import { sortColumns, getColumnIds } from '../utils/boardUtils';
import { BoardHeader } from './BoardHeader';
import { BoardContent } from './BoardContent';

/**
 * Board component for displaying and managing a Kanban board
 */
export const Board: FC<BoardProps> = ({
  id,
  title,
  columns = [],
  onAddColumn,
  onEditColumn,
  onDeleteColumn,
  onAddCard,
  onEditCard,
  onDeleteCard,
}) => {
  const handleAddColumn = () => {
    if (onAddColumn) {
      onAddColumn(id);
    }
  };
  
  // Sort columns by their order property
  const sortedColumns = sortColumns(columns);
  
  // Get column IDs for the sortable context
  const columnIds = getColumnIds(sortedColumns);

  return (
    <div className="flex flex-col h-full border boder-5 border-red-200">
      <BoardHeader title={title} />
      <BoardContent
        columnIds={columnIds}
        sortedColumns={sortedColumns}
        onEditColumn={onEditColumn}
        onDeleteColumn={onDeleteColumn}
        onAddCard={onAddCard}
        onEditCard={onEditCard}
        onDeleteCard={onDeleteCard}
        onAddColumn={handleAddColumn}
      />
    </div>
  );
};
