from typing import List
from src.db.models.board import Board
from src.db.repositories.board import BoardRepository
from src.core.exceptions import ValidationException
import logging

logger = logging.getLogger(__name__)

class BoardService:
    """Service for Board business logic"""
    
    @staticmethod
    def get_all_boards() -> List[Board]:
        """Get all boards"""
        return BoardRepository.get_all()
    
    @staticmethod
    def get_board_by_id(board_id: str) -> Board:
        """Get a board by ID"""
        if not board_id:
            raise ValidationException("Board ID is required")
            
        return BoardRepository.get_by_id(board_id)
    
    @staticmethod
    def create_board(board: Board) -> Board:
        """Create a new board"""
        if not board:
            raise ValidationException("Board data is required")
            
        if not board.title:
            raise ValidationException("Board title is required")
            
        # Trim the title
        board.title = board.title.strip()
        
        if len(board.title) < 1:
            raise ValidationException("Board title cannot be empty")
            
        if len(board.title) > 100:
            raise ValidationException("Board title cannot exceed 100 characters")
            
        logger.info(f"Creating new board with ID {board.id}")
        return BoardRepository.create(board)
    
    @staticmethod
    def update_board(board: Board) -> Board:
        """Update an existing board"""
        if not board:
            raise ValidationException("Board data is required")
            
        if not board.id:
            raise ValidationException("Board ID is required")
            
        if not board.title:
            raise ValidationException("Board title is required")
            
        # Trim the title
        board.title = board.title.strip()
        
        if len(board.title) < 1:
            raise ValidationException("Board title cannot be empty")
            
        if len(board.title) > 100:
            raise ValidationException("Board title cannot exceed 100 characters")
            
        logger.info(f"Updating board with ID {board.id}")
        return BoardRepository.update(board)
    
    @staticmethod
    def delete_board(board_id: str) -> bool:
        """Delete a board"""
        if not board_id:
            raise ValidationException("Board ID is required")
            
        logger.info(f"Deleting board with ID {board_id}")
        return BoardRepository.delete(board_id)
