from typing import List, Optional
from src.db.models.column import Column
from src.db.dynamodb import dynamodb
from src.core.config import settings
import boto3
from boto3.dynamodb.conditions import Key

class ColumnRepository:
    """Repository for Column data access using DynamoDB"""
    
    @staticmethod
    def get_all() -> List[Column]:
        """Get all columns from DynamoDB"""
        items = dynamodb.scan(settings.DYNAMODB_COLUMNS_TABLE)
        return [Column.from_dict(item) for item in items]
    
    @staticmethod
    def get_by_id(column_id: str) -> Optional[Column]:
        """Get a column by ID from DynamoDB"""
        item = dynamodb.get_item(settings.DYNAMODB_COLUMNS_TABLE, {"id": column_id})
        if item:
            return Column.from_dict(item)
        return None
    
    @staticmethod
    def get_by_board_id(board_id: str) -> List[Column]:
        """Get all columns for a specific board from DynamoDB"""
        # For this query, we need to use a secondary index or scan with filter
        # Since we're using DynamoDB Local for development, we'll use scan with filter
        table = dynamodb.get_table(settings.DYNAMODB_COLUMNS_TABLE)
        response = table.scan(
            FilterExpression=boto3.dynamodb.conditions.Attr("boardId").eq(board_id)
        )
        items = response.get('Items', [])
        return [Column.from_dict(item) for item in items]
    
    @staticmethod
    def create(column: Column) -> Column:
        """Create a new column in DynamoDB"""
        dynamodb.put_item(settings.DYNAMODB_COLUMNS_TABLE, column.to_dict())
        return column
    
    @staticmethod
    def update(column: Column) -> Column:
        """Update a column in DynamoDB"""
        dynamodb.put_item(settings.DYNAMODB_COLUMNS_TABLE, column.to_dict())
        return column
    
    @staticmethod
    def delete(column_id: str) -> bool:
        """Delete a column from DynamoDB"""
        dynamodb.delete_item(settings.DYNAMODB_COLUMNS_TABLE, {"id": column_id})
        return True
