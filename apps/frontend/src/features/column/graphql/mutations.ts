import { gql } from '@apollo/client';

/**
 * GraphQL mutations for column operations
 */

export const CREATE_COLUMN = gql`
  mutation CreateColumn($title: String!, $boardId: ID!, $order: Int!) {
    createColumn(title: $title, boardId: $boardId, order: $order) {
      column {
        id
        title
        boardId
        order
      }
    }
  }
`;

export const UPDATE_COLUMN = gql`
  mutation UpdateColumn($id: ID!, $title: String, $order: Int) {
    updateColumn(id: $id, title: $title, order: $order) {
      column {
        id
        title
        boardId
        order
      }
    }
  }
`;

export const DELETE_COLUMN = gql`
  mutation DeleteColumn($id: ID!) {
    deleteColumn(id: $id) {
      success
    }
  }
`;

export const UPDATE_COLUMN_ORDER = gql`
  mutation UpdateColumnOrder($id: ID!, $order: Int!) {
    updateColumn(id: $id, order: $order) {
      column {
        id
        title
        boardId
        order
      }
    }
  }
`;

export const UPDATE_MULTIPLE_COLUMN_ORDERS = gql`
  mutation UpdateMultipleColumnOrders($columns: [ID!]!) {
    updateColumnOrder(columns: $columns) {
      success
    }
  }
`;
