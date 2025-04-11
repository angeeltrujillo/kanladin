from typing import Dict, Any, List, Optional

class Board:
    """Board model representing a Kanban board"""
    
    def __init__(self, id: str, title: str):
        self.id = id
        self.title = title
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Board':
        """Create a Board instance from a dictionary"""
        return cls(
            id=data["id"],
            title=data["title"]
        )
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert Board instance to a dictionary"""
        return {
            "id": self.id,
            "title": self.title
        }
