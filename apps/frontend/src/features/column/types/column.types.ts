import { CardProps } from '../../card';

/**
 * Type definitions for the Column feature
 */
export interface ColumnProps {
  id: string;
  title: string;
  cards: CardProps[];
  order?: number;
  onAddCard?: (columnId: string) => void;
  onEditCard?: (cardId: string, title: string, description: string) => void;
  onDeleteCard?: (cardId: string) => void;
  onEditColumn?: (columnId: string, title: string) => void;
  onDeleteColumn?: (columnId: string) => void;
}
