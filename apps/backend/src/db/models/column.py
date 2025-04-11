from typing import Dict, Any, List, Optional

class Column:
    """Column model representing a stage in the Kanban board"""
    
    def __init__(self, id: str, title: str, board_id: str, order: int):
        self.id = id
        self.title = title
        self.board_id = board_id
        self.order = order
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Column':
        """Create a Column instance from a dictionary"""
        return cls(
            id=data["id"],
            title=data["title"],
            board_id=data["boardId"],
            order=data["order"]
        )
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert Column instance to a dictionary"""
        return {
            "id": self.id,
            "title": self.title,
            "boardId": self.board_id,
            "order": self.order
        }
