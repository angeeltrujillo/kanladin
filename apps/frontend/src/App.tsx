import { FC } from 'react';
import { BoardProvider, useBoard } from './features/board';
import { ColumnProvider } from './features/column';
import { CardProvider } from './features/card';
import { DndProvider } from './features/dnd';
import { KanbanBoard } from './features/kanban/components/KanbanBoard';

/**
 * App component that sets up the provider hierarchy
 */
const App: FC = () => {
  return (
    <BoardProvider>
      <ColumnProvider>
        <CardProvider>
          <BoardConsumer />
        </CardProvider>
      </ColumnProvider>
    </BoardProvider>
  );
}

/**
 * BoardConsumer component that connects the DndProvider with the board data
 */
const BoardConsumer: FC = () => {
  const { columns, setColumns } = useBoard();
  
  return (
    <DndProvider columns={columns} setColumns={setColumns}>
      <KanbanBoard />
    </DndProvider>
  );
};

export default App;
