from typing import Optional, Dict, Any

class Card:
    """Card model representing a task in the Kanban board"""
    
    def __init__(self, id: str, title: str, description: str, column_id: str):
        self.id = id
        self.title = title
        self.description = description
        self.column_id = column_id
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Card':
        """Create a Card instance from a dictionary"""
        return cls(
            id=data["id"],
            title=data["title"],
            description=data["description"],
            column_id=data["columnId"]
        )
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert Card instance to a dictionary"""
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "columnId": self.column_id
        }
