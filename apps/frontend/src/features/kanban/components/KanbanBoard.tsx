import { FC } from 'react';
import { useBoard } from '../../board';
import { useColumn } from '../../column';
import { useCard } from '../../card';
import { Board } from '../../board';

/**
 * Main Kanban Board component that connects all the features
 */
export const KanbanBoard: FC = () => {
  const { boardId, boardTitle, columns } = useBoard();
  const { handleAddColumn, handleEditColumn, handleDeleteColumn, handleReorderColumns } = useColumn();
  const { handleAddCard, handleEditCard, handleDeleteCard } = useCard();

  if (!boardId) {
    return <div className="flex items-center justify-center h-screen">Loading board...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <Board
        id={boardId}
        title={boardTitle}
        columns={columns}
        onAddColumn={handleAddColumn}
        onEditColumn={handleEditColumn}
        onDeleteColumn={handleDeleteColumn}
        onAddCard={handleAddCard}
        onEditCard={handleEditCard}
        onDeleteCard={handleDeleteCard}
        onReorderColumns={(columns) => handleReorderColumns(columns.map(col => col.id))}
      />
    </div>
  );
};
