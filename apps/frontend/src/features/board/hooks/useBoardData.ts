import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOARDS } from '../graphql';
import { ColumnProps } from '../../column';
import { CardProps } from '../../card';
import { BoardsData } from '../../../types/graphql';

/**
 * Hook for fetching and managing board data
*/
export const useBoardData = () => {
  // Fetch board data
  const { loading, error, data, refetch } = useQuery<BoardsData>(GET_BOARDS);
  
  /**
   * Convert API data to column props
   */
  const convertToColumnProps = useCallback((data?: BoardsData): ColumnProps[] => {
    if (!data || !data.boards || data.boards.length === 0) {
      return [];
    }
    
    // Use the first board (we only have one in our demo)
    const board = data.boards[0];
    
    return board.columns.map(column => ({
      id: column.id,
      title: column.title,
      order: column.order,
      cards: column.cards.map((card): CardProps => ({
        id: card.id,
        title: card.title,
        description: card.description,
        columnId: card.columnId,
        order: card.order || 0 // Provide default value for order
      }))
    }));
  }, []);
  
  // Initialize state with data from API or fallback data
  const [columns, setColumns] = useState<ColumnProps[]>(convertToColumnProps(data));
  
  // Update columns when data is loaded from the API
  useEffect(() => {
    if (data) {
      setColumns(convertToColumnProps(data));
    }
  }, [data, convertToColumnProps]);
  
  return {
    loading,
    error,
    data,
    refetch,
    columns,
    setColumns,
    boardId: data?.boards[0]?.id,
    boardTitle: data?.boards[0]?.title || "Kanladin Project Board"
  };
};
