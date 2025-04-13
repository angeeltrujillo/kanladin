import { FC } from 'react';

interface BoardHeaderProps {
  title: string;
}

/**
 * Header component for the board
 */
export const BoardHeader: FC<BoardHeaderProps> = ({ title }) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4 shadow-sm z-10">
      <div className="flex justify-between items-center max-w-7xl pl-3">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </div>
    </div>
  );
};
