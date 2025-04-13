import { useContext } from 'react';
import { ColumnContext } from '../context/ColumnContextDef';

/**
 * Custom hook to use the column context
 */
export const useColumn = () => {
  const context = useContext(ColumnContext);
  if (context === undefined) {
    throw new Error('useColumn must be used within a ColumnProvider');
  }
  return context;
};
