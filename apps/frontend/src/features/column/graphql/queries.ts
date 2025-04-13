import { gql } from '@apollo/client';

/**
 * GraphQL queries for column operations
 */

// Query to get columns for a specific board
export const GET_COLUMNS = gql`
  query GetColumns($boardId: ID) {
    columns(board_id: $boardId) {
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
`;
