export { Board } from './components/Board';
export { BoardHeader } from './components/BoardHeader';
export { BoardContent } from './components/BoardContent';
export { AddColumnButton } from './components/AddColumnButton';

export type { BoardProps } from './types/board.types';

// Export context and hooks
export { BoardProvider } from './context/BoardContext';
export { useBoard } from './hooks/useBoardContext';

export { sortByOrder as sortColumns, getIds as getColumnIds } from '../../utils/sorting';

export * from './graphql';
