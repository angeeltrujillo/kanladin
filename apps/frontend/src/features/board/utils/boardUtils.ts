import { ColumnProps } from '../../../components/Column';

/**
 * Sort columns by their order property
 */
export const sortColumns = (columns: ColumnProps[]): ColumnProps[] => {
  return [...columns].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return 0;
  });
};

/**
 * Extract column IDs from column objects
 */
export const getColumnIds = (columns: ColumnProps[]): string[] => {
  return columns.map(column => column.id);
};
