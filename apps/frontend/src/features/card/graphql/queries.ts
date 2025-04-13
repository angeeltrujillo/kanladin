import { gql } from '@apollo/client';

/**
 * GraphQL queries for card operations
 */

// Query to get cards for a specific column
export const GET_CARDS = gql`
  query GetCards($columnId: ID) {
    cards(column_id: $columnId) {
      id
      title
      description
      columnId
      order
    }
  }
`;
