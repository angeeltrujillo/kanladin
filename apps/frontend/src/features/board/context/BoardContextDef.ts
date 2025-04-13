import { createContext } from 'react';
import { ColumnProps } from '../../column';
import { BoardsData } from '../../../types/graphql';

export interface BoardContextValue {
  loading: boolean;
  error: Error | undefined;
  data: BoardsData | undefined;
  refetch: () => void;
  columns: ColumnProps[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>;
  boardId: string | undefined;
  boardTitle: string;
}

// Create context
export const BoardContext = createContext<BoardContextValue | undefined>(undefined);
