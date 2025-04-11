from typing import List, Optional
from src.db.models.board import Board
from src.db import mock_data

class BoardRepository:
    """Repository for Board data access"""
    
    @staticmethod
    def get_all() -> List[Board]:
        """Get all boards"""
        return [Board.from_dict(board) for board in mock_data.boards_data]
    
    @staticmethod
    def get_by_id(board_id: str) -> Optional[Board]:
        """Get a board by ID"""
        for board_data in mock_data.boards_data:
            if board_data["id"] == board_id:
                return Board.from_dict(board_data)
        return None
