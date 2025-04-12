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
        """Get all columns for a specific board, sorted by order"""
        columns = ColumnRepository.get_by_board_id(board_id)
        # Sort columns by order property
        return sorted(columns, key=lambda column: column.order)
    
    @staticmethod
    def create_column(column: Column) -> Column:
        """Create a new column"""
        return ColumnRepository.create(column)
    
    @staticmethod
    def update_column(column: Column) -> Column:
        """Update an existing column"""
        return ColumnRepository.update(column)
    
    @staticmethod
    def delete_column(column_id: str) -> bool:
        """Delete a column"""
        return ColumnRepository.delete(column_id)
