import React, { ReactNode } from 'react';
import { useBoardData } from '../hooks/useBoardData';
import { BoardContext } from './BoardContextDef';

interface BoardContextProps {
  children: ReactNode;
}

// Provider component
export const BoardProvider: React.FC<BoardContextProps> = ({ children }) => {
  const boardData = useBoardData();

  const value = {
    loading: boardData.loading,
    error: boardData.error,
    data: boardData.data,
    refetch: boardData.refetch,
    columns: boardData.columns,
    setColumns: boardData.setColumns,
    boardId: boardData.boardId,
    boardTitle: boardData.boardTitle
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
};
