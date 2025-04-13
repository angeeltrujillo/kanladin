import { gql } from '@apollo/client';

/**
 * GraphQL mutations for card operations
*/

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
