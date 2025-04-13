/**
 * Generic sorting utilities for ordered items
 */

/**
 * Interface for items that have an order property
 */
export interface Orderable {
  id: string;
  order?: number;
}

/**
 * Sort items by their order property
 * @param items Array of items with optional order property
 * @returns Sorted array of items
 */
export const sortByOrder = <T extends Orderable>(items: T[]): T[] => {
  return [...items].sort((a, b) => {
    // If order is defined for both items, sort by order
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    // If only one item has order defined, prioritize it
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    // If neither has order defined, maintain original order
    return 0;
  });
};

/**
 * Extract IDs from an array of items
 * @param items Array of items with id property
 * @returns Array of item IDs
 */
export const getIds = <T extends Orderable>(items: T[]): string[] => {
  return items.map(item => item.id);
};
