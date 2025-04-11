from typing import List, Optional
from src.db.models.card import Card
from src.db.repositories.card import CardRepository

class CardService:
    """Service for Card business logic"""
    
    @staticmethod
    def get_all_cards() -> List[Card]:
        """Get all cards"""
        return CardRepository.get_all()
    
    @staticmethod
    def get_card_by_id(card_id: str) -> Optional[Card]:
        """Get a card by ID"""
        return CardRepository.get_by_id(card_id)
    
    @staticmethod
    def get_cards_by_column_id(column_id: str) -> List[Card]:
        """Get all cards for a specific column"""
        return CardRepository.get_by_column_id(column_id)
    
    @staticmethod
    def create_card(card: Card) -> Card:
        """Create a new card"""
        return CardRepository.create(card)
    
    @staticmethod
    def update_card(card: Card) -> Card:
        """Update an existing card"""
        return CardRepository.update(card)
    
    @staticmethod
    def delete_card(card_id: str) -> bool:
        """Delete a card"""
        return CardRepository.delete(card_id)
