from typing import List, Optional
from src.db.models.card import Card
from src.db import mock_data

class CardRepository:
    """Repository for Card data access"""
    
    @staticmethod
    def get_all() -> List[Card]:
        """Get all cards"""
        return [Card.from_dict(card) for card in mock_data.cards_data]
    
    @staticmethod
    def get_by_id(card_id: str) -> Optional[Card]:
        """Get a card by ID"""
        for card_data in mock_data.cards_data:
            if card_data["id"] == card_id:
                return Card.from_dict(card_data)
        return None
    
    @staticmethod
    def get_by_column_id(column_id: str) -> List[Card]:
        """Get all cards for a specific column"""
        return [
            Card.from_dict(card) 
            for card in mock_data.cards_data 
            if card["columnId"] == column_id
        ]
