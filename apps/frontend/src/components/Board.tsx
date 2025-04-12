import { PlusIcon } from '@heroicons/react/24/outline';
import { Column, ColumnProps } from './Column';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

export interface BoardProps {
  id: string;
  title: string;
  columns: ColumnProps[];
  onAddColumn?: (boardId: string) => void;
  onEditColumn?: (columnId: string, title: string) => void;
  onDeleteColumn?: (columnId: string) => void;
  onAddCard?: (columnId: string) => void;
  onEditCard?: (cardId: string, title: string, description: string) => void;
  onDeleteCard?: (cardId: string) => void;
  onReorderColumns?: (columns: ColumnProps[]) => void;
}

export const Board = ({
  id,
  title,
  columns = [],
  onAddColumn,
  onEditColumn,
  onDeleteColumn,
  onAddCard,
  onEditCard,
  onDeleteCard,
}: BoardProps) => {
  const handleAddColumn = () => {
    if (onAddColumn) {
      onAddColumn(id);
    }
  };
  
  // Sort columns by their order property
  const sortedColumns = [...columns].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return 0;
  });
  
  // Get column IDs for the sortable context
  const columnIds = sortedColumns.map(column => column.id);
  
  // Note: Column reordering is now handled in the parent App component
  // This is to avoid conflicts between nested DndContext components

  return (
    <div className="flex flex-col h-full border boder-5 border-red-200">
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm z-10">
        <div className="flex justify-between items-center max-w-7xl pl-3">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>
      </div>
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
          <div className="bg-gray-100 rounded-lg shadow-sm w-72 h-min mx-2 overflow-hidden">
            <button
              onClick={handleAddColumn}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium flex items-center justify-center space-x-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add Column</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
