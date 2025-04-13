import { gql } from '@apollo/client';

/**
 * GraphQL mutations for board operations
 */

// Implemented, but not used currently.
export const CREATE_BOARD = gql`
  mutation CreateBoard($title: String!) {
    createBoard(title: $title) {
      board {
        id
        title
      }
    }
  }
`;

// Implemented, but not used currently.
export const UPDATE_BOARD = gql`
  mutation UpdateBoard($id: ID!, $title: String) {
    updateBoard(id: $id, title: $title) {
      board {
        id
        title
      }
    }
  }
`;

// Implemented, but not used currently.
export const DELETE_BOARD = gql`
  mutation DeleteBoard($id: ID!) {
    deleteBoard(id: $id) {
      success
    }
  }
`;
