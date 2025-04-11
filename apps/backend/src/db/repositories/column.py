from typing import List, Optional
from src.db.models.column import Column
from src.db import mock_data

class ColumnRepository:
    """Repository for Column data access"""
    
    @staticmethod
    def get_all() -> List[Column]:
        """Get all columns"""
        return [Column.from_dict(column) for column in mock_data.columns_data]
    
    @staticmethod
    def get_by_id(column_id: str) -> Optional[Column]:
        """Get a column by ID"""
        for column_data in mock_data.columns_data:
            if column_data["id"] == column_id:
                return Column.from_dict(column_data)
        return None
    
    @staticmethod
    def get_by_board_id(board_id: str) -> List[Column]:
        """Get all columns for a specific board"""
        return [
            Column.from_dict(column) 
            for column in mock_data.columns_data 
            if column["boardId"] == board_id
        ]
