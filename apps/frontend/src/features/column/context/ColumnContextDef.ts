import { createContext } from 'react';

export interface ColumnContextValue {
  handleAddColumn: () => void;
  handleEditColumn: (columnId: string, title: string) => void;
  handleDeleteColumn: (columnId: string) => void;
  handleReorderColumns: (columnIds: string[]) => void;
}

// Create context
export const ColumnContext = createContext<ColumnContextValue | undefined>(undefined);
