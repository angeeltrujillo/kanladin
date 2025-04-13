// GraphQL data types

export interface Card {
  id: string;
  title: string;
  description: string;
  columnId: string;
  order?: number;
}

export interface Column {
  id: string;
  title: string;
  order: number;
  board_id: string;
  cards: Card[];
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
}

// Query response types
export interface BoardsData {
  boards: Board[];
}

export interface BoardData {
  board: Board;
}

export interface ColumnsData {
  columns: Column[];
}

export interface CardsData {
  cards: Card[];
}

// Query variables types
export interface BoardQueryVariables {
  id: string;
}

export interface ColumnsQueryVariables {
  boardId?: string;
}

export interface CardsQueryVariables {
  columnId?: string;
}
