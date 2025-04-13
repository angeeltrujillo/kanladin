import React, { ReactNode } from 'react';
import { useColumnOperations } from '../hooks/useColumnOperations';
import { useBoard } from '../../board';
import { ColumnContext } from './ColumnContextDef';

interface ColumnContextProps {
  children: ReactNode;
}

// Provider component
export const ColumnProvider: React.FC<ColumnContextProps> = ({ children }) => {
  const { refetch, columns, setColumns, boardId } = useBoard();
  const { handleAddColumn: addColumn, handleEditColumn: editColumn, handleDeleteColumn: deleteColumn, handleReorderColumns: reorderColumns } = useColumnOperations(refetch);

  // Wrap the operations to provide the necessary context
  const handleAddColumn = () => {
    if (boardId) {
      addColumn(boardId, columns, setColumns);
    }
  };

  const handleEditColumn = (columnId: string, title: string) => {
    editColumn(columnId, title, columns, setColumns);
  };

  const handleDeleteColumn = (columnId: string) => {
    deleteColumn(columnId, columns, setColumns);
  };

  const handleReorderColumns = (columnIds: string[]) => {
    reorderColumns(columnIds, columns, setColumns);
  };

  const value = {
    handleAddColumn,
    handleEditColumn,
    handleDeleteColumn,
    handleReorderColumns
  };

  return (
    <ColumnContext.Provider value={value}>
      {children}
    </ColumnContext.Provider>
  );
};
