from typing import List, Optional
from src.db.models.board import Board
from src.db.repositories.board import BoardRepository

class BoardService:
    """Service for Board business logic"""
    
    @staticmethod
    def get_all_boards() -> List[Board]:
        """Get all boards"""
        return BoardRepository.get_all()
    
    @staticmethod
    def get_board_by_id(board_id: str) -> Optional[Board]:
        """Get a board by ID"""
        return BoardRepository.get_by_id(board_id)
    
    @staticmethod
    def create_board(board: Board) -> Board:
        """Create a new board"""
        return BoardRepository.create(board)
    
    @staticmethod
    def update_board(board: Board) -> Board:
        """Update an existing board"""
        return BoardRepository.update(board)
    
    @staticmethod
    def delete_board(board_id: str) -> bool:
        """Delete a board"""
        return BoardRepository.delete(board_id)
