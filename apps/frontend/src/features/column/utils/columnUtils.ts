import { CardProps } from '../../card';

/**
 * Sort cards by their order property
 */
export const sortCards = (cards: CardProps[]): CardProps[] => {
  return [...cards].sort((a, b) => {
    // If order is defined for both cards, sort by order
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    // If only one card has order defined, prioritize it
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    // If neither has order defined, maintain original order
    return 0;
  });
};

/**
 * Extract card IDs from card objects
 */
export const getCardIds = (cards: CardProps[]): string[] => {
  return cards.map(card => card.id);
};
