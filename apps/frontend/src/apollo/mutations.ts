import { gql } from '@apollo/client';

// Card Mutations
export const CREATE_CARD = gql`
  mutation CreateCard($title: String!, $description: String, $columnId: ID!) {
    createCard(title: $title, description: $description, columnId: $columnId) {
      card {
        id
        title
        description
        columnId
      }
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard($id: ID!, $title: String, $description: String, $columnId: ID) {
    updateCard(id: $id, title: $title, description: $description, columnId: $columnId) {
      card {
        id
        title
        description
        columnId
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
  mutation MoveCard($id: ID!, $columnId: ID!) {
    moveCard(id: $id, columnId: $columnId) {
      card {
        id
        title
        description
        columnId
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
