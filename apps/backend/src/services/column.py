from typing import List, Optional
from src.db.models.column import Column
from src.db.repositories.column import ColumnRepository

class ColumnService:
    """Service for Column business logic"""
    
    @staticmethod
    def get_all_columns() -> List[Column]:
        """Get all columns"""
        return ColumnRepository.get_all()
    
    @staticmethod
    def get_column_by_id(column_id: str) -> Optional[Column]:
        """Get a column by ID"""
        return ColumnRepository.get_by_id(column_id)
    
    @staticmethod
    def get_columns_by_board_id(board_id: str) -> List[Column]:
        """Get all columns for a specific board"""
        return ColumnRepository.get_by_board_id(board_id)
