import { gql } from '@apollo/client';

// Card Mutations
export const CREATE_CARD = gql`
  mutation CreateCard($title: String!, $description: String, $columnId: ID!, $order: Int) {
    createCard(title: $title, description: $description, columnId: $columnId, order: $order) {
      card {
        id
        title
        description
        columnId
        order
      }
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard($id: ID!, $title: String, $description: String, $columnId: ID, $order: Int) {
    updateCard(id: $id, title: $title, description: $description, columnId: $columnId, order: $order) {
      card {
        id
        title
        description
        columnId
        order
      }
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(id: $id) {
      success
    }
  }
`;

export const MOVE_CARD = gql`
  mutation MoveCard($id: ID!, $columnId: ID!, $order: Int) {
    moveCard(id: $id, columnId: $columnId, order: $order) {
      card {
        id
        title
        description
        columnId
        order
      }
    }
  }
`;

export const UPDATE_CARD_ORDER = gql`
  mutation UpdateCardOrder($id: ID!, $order: Int!) {
    updateCardOrder(id: $id, order: $order) {
      card {
        id
        title
        description
        columnId
        order
      }
    }
  }
`;

// Column Mutations
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
