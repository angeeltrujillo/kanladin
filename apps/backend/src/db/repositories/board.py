from typing import List, Optional
from src.db.models.board import Board
from src.db.dynamodb import dynamodb
from src.core.config import settings
from src.core.exceptions import NotFoundException, DatabaseException, ConflictException
import logging

logger = logging.getLogger(__name__)

class BoardRepository:
    """Repository for Board data access using DynamoDB"""
    
    @staticmethod
    def get_all() -> List[Board]:
        """Get all boards from DynamoDB"""
        try:
            items = dynamodb.scan(settings.DYNAMODB_BOARDS_TABLE)
            return [Board.from_dict(item) for item in items]
        except DatabaseException as e:
            logger.error(f"Database error getting all boards: {e.message}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error getting all boards: {str(e)}")
            raise DatabaseException("get_all_boards", str(e))
    
    @staticmethod
    def get_by_id(board_id: str) -> Board:
        """Get a board by ID from DynamoDB"""
        try:
            item = dynamodb.get_item(settings.DYNAMODB_BOARDS_TABLE, {"id": board_id})
            if not item:
                raise NotFoundException("Board", board_id)
            return Board.from_dict(item)
        except DatabaseException as e:
            logger.error(f"Database error getting board {board_id}: {e.message}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error getting board {board_id}: {str(e)}")
            raise DatabaseException("get_board", str(e))
    
    @staticmethod
    def create(board: Board) -> Board:
        """Create a new board in DynamoDB"""
        try:
            # Check if board already exists
            existing = dynamodb.get_item(settings.DYNAMODB_BOARDS_TABLE, {"id": board.id})
            if existing:
                raise ConflictException("Board", board.id)
                
            dynamodb.put_item(settings.DYNAMODB_BOARDS_TABLE, board.to_dict())
            return board
        except ConflictException:
            raise
        except DatabaseException as e:
            logger.error(f"Database error creating board {board.id}: {e.message}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error creating board {board.id}: {str(e)}")
            raise DatabaseException("create_board", str(e))
    
    @staticmethod
    def update(board: Board) -> Board:
        """Update a board in DynamoDB"""
        try:
            # Check if board exists
            existing = dynamodb.get_item(settings.DYNAMODB_BOARDS_TABLE, {"id": board.id})
            if not existing:
                raise NotFoundException("Board", board.id)
                
            dynamodb.put_item(settings.DYNAMODB_BOARDS_TABLE, board.to_dict())
            return board
        except NotFoundException:
            raise
        except DatabaseException as e:
            logger.error(f"Database error updating board {board.id}: {e.message}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error updating board {board.id}: {str(e)}")
            raise DatabaseException("update_board", str(e))
    
    @staticmethod
    def delete(board_id: str) -> bool:
        """Delete a board from DynamoDB"""
        try:
            # Check if board exists
            existing = dynamodb.get_item(settings.DYNAMODB_BOARDS_TABLE, {"id": board_id})
            if not existing:
                raise NotFoundException("Board", board_id)
                
            dynamodb.delete_item(settings.DYNAMODB_BOARDS_TABLE, {"id": board_id})
            return True
        except NotFoundException:
            raise
        except DatabaseException as e:
            logger.error(f"Database error deleting board {board_id}: {e.message}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error deleting board {board_id}: {str(e)}")
            raise DatabaseException("delete_board", str(e))
