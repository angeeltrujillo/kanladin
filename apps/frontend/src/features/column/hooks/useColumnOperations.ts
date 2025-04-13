import { useMutation } from '@apollo/client';
import { CREATE_COLUMN, UPDATE_COLUMN, DELETE_COLUMN, UPDATE_MULTIPLE_COLUMN_ORDERS } from '../graphql';
import { ColumnProps } from '../types/column.types';

/**
 * Hook for managing column operations
 */
export const useColumnOperations = (refetch: () => void) => {
  // Setup mutation hooks
  const [createColumnMutation] = useMutation(CREATE_COLUMN, {
    onCompleted: () => refetch(),
    onError: (error) => console.error('Error creating column:', error)
  });
  
  const [updateColumnMutation] = useMutation(UPDATE_COLUMN, {
    onCompleted: () => refetch(),
    onError: (error) => console.error('Error updating column:', error)
  });
  
  const [deleteColumnMutation] = useMutation(DELETE_COLUMN, {
    onCompleted: () => refetch(),
    onError: (error) => console.error('Error deleting column:', error)
  });
  
  const [updateMultipleColumnOrdersMutation] = useMutation(UPDATE_MULTIPLE_COLUMN_ORDERS, {
    onCompleted: () => refetch(),
    onError: (error) => console.error('Error updating multiple column orders:', error)
  });

  /**
   * Handle adding a new column
   */
  const handleAddColumn = (
    boardId: string | undefined,
    columns: ColumnProps[],
    setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>
  ) => {
    if (!boardId) return;
    
    // Calculate new column order (max order + 1)
    const maxOrder = columns.reduce((max, col) => Math.max(max, col.order || 0), -1);
    const timestamp = Date.now();
    const newOrder = maxOrder + 1;
    
    // Optimistically update UI
    const newColumn: ColumnProps = {
      id: `temp-${timestamp}`, // Temporary ID until we get the real one from the server
      title: `New Column`,
      order: newOrder,
      cards: []
    };
    setColumns([...columns, newColumn]);
    
    // Call mutation
    createColumnMutation({
      variables: {
        title: 'New Column',
        boardId,
        order: newOrder
      }
    });
  };

  /**
   * Handle editing a column
   */
  const handleEditColumn = (
    columnId: string,
    title: string,
    columns: ColumnProps[],
    setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>
  ) => {
    // Optimistically update UI
    setColumns(columns.map(column => 
      column.id === columnId ? { ...column, title } : column
    ));
    
    // Call mutation
    updateColumnMutation({
      variables: {
        id: columnId,
        title
      }
    });
  };

  /**
   * Handle deleting a column
   */
  const handleDeleteColumn = (
    columnId: string,
    columns: ColumnProps[],
    setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>
  ) => {
    // Optimistically update UI
    setColumns(columns.filter(column => column.id !== columnId));
    
    // Call mutation
    deleteColumnMutation({
      variables: {
        id: columnId
      }
    });
  };

  /**
   * Handle reordering columns
   */
  const handleReorderColumns = (
    columnIds: string[]
  ) => {
    // Optimistically update UI
    // We don't need to do anything here as the DnD context already updates the UI
    
    // Call mutation
    updateMultipleColumnOrdersMutation({
      variables: {
        columns: columnIds
      }
    });
  };

  return {
    handleAddColumn,
    handleEditColumn,
    handleDeleteColumn,
    handleReorderColumns
  };
};
