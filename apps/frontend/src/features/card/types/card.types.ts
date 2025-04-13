/**
 * Type definitions for the Card feature
 */

export interface CardProps {
  id: string;
  title: string;
  description: string;
  columnId?: string;
  order?: number;
  onEdit?: (id: string, title: string, description: string) => void;
  onDelete?: (id: string) => void;
}
