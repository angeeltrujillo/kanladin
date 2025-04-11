from typing import List, Optional
from src.db.models.card import Card
from src.db.dynamodb import dynamodb
from src.core.config import settings
import boto3
from boto3.dynamodb.conditions import Key

class CardRepository:
    """Repository for Card data access using DynamoDB"""
    
    @staticmethod
    def get_all() -> List[Card]:
        """Get all cards from DynamoDB"""
        items = dynamodb.scan(settings.DYNAMODB_CARDS_TABLE)
        return [Card.from_dict(item) for item in items]
    
    @staticmethod
    def get_by_id(card_id: str) -> Optional[Card]:
        """Get a card by ID from DynamoDB"""
        item = dynamodb.get_item(settings.DYNAMODB_CARDS_TABLE, {"id": card_id})
        if item:
            return Card.from_dict(item)
        return None
    
    @staticmethod
    def get_by_column_id(column_id: str) -> List[Card]:
        """Get all cards for a specific column from DynamoDB"""
        # For this query, we need to use a secondary index or scan with filter
        # Since we're using DynamoDB Local for development, we'll use scan with filter
        table = dynamodb.get_table(settings.DYNAMODB_CARDS_TABLE)
        response = table.scan(
            FilterExpression=boto3.dynamodb.conditions.Attr("columnId").eq(column_id)
        )
        items = response.get('Items', [])
        return [Card.from_dict(item) for item in items]
    
    @staticmethod
    def create(card: Card) -> Card:
        """Create a new card in DynamoDB"""
        dynamodb.put_item(settings.DYNAMODB_CARDS_TABLE, card.to_dict())
        return card
    
    @staticmethod
    def update(card: Card) -> Card:
        """Update a card in DynamoDB"""
        dynamodb.put_item(settings.DYNAMODB_CARDS_TABLE, card.to_dict())
        return card
    
    @staticmethod
    def delete(card_id: str) -> bool:
        """Delete a card from DynamoDB"""
        dynamodb.delete_item(settings.DYNAMODB_CARDS_TABLE, {"id": card_id})
        return True
