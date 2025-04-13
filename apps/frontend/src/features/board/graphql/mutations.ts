import { gql } from '@apollo/client';

/**
 * GraphQL mutations for board operations
 */

// Create a new board
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

// Update an existing board
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

// Delete a board
export const DELETE_BOARD = gql`
  mutation DeleteBoard($id: ID!) {
    deleteBoard(id: $id) {
      success
    }
  }
`;
