import { gql } from '@apollo/client';

/**
 * GraphQL queries for card operations
 */

// Implemented, but not used currently.
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
