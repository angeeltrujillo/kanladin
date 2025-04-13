import { gql } from '@apollo/client';

/**
 * GraphQL queries for board operations
 */

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
