// Export main components
export { Board } from './components/Board';
export { BoardHeader } from './components/BoardHeader';
export { BoardContent } from './components/BoardContent';
export { AddColumnButton } from './components/AddColumnButton';

// Export types
export type { BoardProps } from './types/board.types';

// Export utilities
export { sortColumns, getColumnIds } from './utils/boardUtils';

// Export GraphQL mutations
export * from './graphql';
