import { ColumnProps } from '../../../components/Column';

/**
 * Type definitions for the Board feature
 */
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
