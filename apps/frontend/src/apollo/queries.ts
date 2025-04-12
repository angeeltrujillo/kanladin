import { gql } from '@apollo/client';

// Query to get all boards with their columns and cards
export const GET_BOARDS = gql`
  query GetBoards {
    boards {
      id
      title
      columns {
        id
        title
        order
        cards {
          id
          title
          description
          columnId
          order
        }
      }
    }
  }
`;

// Query to get a specific board by ID
export const GET_BOARD = gql`
  query GetBoard($id: ID!) {
    board(id: $id) {
      id
      title
      columns {
        id
        title
        order
        cards {
          id
          title
          description
          columnId
          order
        }
      }
    }
  }
`;

// Query to get columns for a specific board
export const GET_COLUMNS = gql`
  query GetColumns($boardId: ID) {
    columns(board_id: $boardId) {
      id
      title
      order
      board_id
      cards {
        id
        title
        description
        columnId
      }
    }
  }
`;

// Query to get cards for a specific column
export const GET_CARDS = gql`
  query GetCards($columnId: ID) {
    cards(column_id: $columnId) {
      id
      title
      description
      columnId
    }
  }
`;
