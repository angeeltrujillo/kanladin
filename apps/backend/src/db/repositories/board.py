from typing import List, Optional
from src.db.models.board import Board
from src.db.dynamodb import dynamodb
from src.core.config import settings

class BoardRepository:
    """Repository for Board data access using DynamoDB"""
    
    @staticmethod
    def get_all() -> List[Board]:
        """Get all boards from DynamoDB"""
        items = dynamodb.scan(settings.DYNAMODB_BOARDS_TABLE)
        return [Board.from_dict(item) for item in items]
    
    @staticmethod
    def get_by_id(board_id: str) -> Optional[Board]:
        """Get a board by ID from DynamoDB"""
        item = dynamodb.get_item(settings.DYNAMODB_BOARDS_TABLE, {"id": board_id})
        if item:
            return Board.from_dict(item)
        return None
    
    @staticmethod
    def create(board: Board) -> Board:
        """Create a new board in DynamoDB"""
        dynamodb.put_item(settings.DYNAMODB_BOARDS_TABLE, board.to_dict())
        return board
    
    @staticmethod
    def update(board: Board) -> Board:
        """Update a board in DynamoDB"""
        dynamodb.put_item(settings.DYNAMODB_BOARDS_TABLE, board.to_dict())
        return board
    
    @staticmethod
    def delete(board_id: str) -> bool:
        """Delete a board from DynamoDB"""
        dynamodb.delete_item(settings.DYNAMODB_BOARDS_TABLE, {"id": board_id})
        return True
