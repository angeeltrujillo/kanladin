import graphene
from src.api.graphql.types.board import BoardType
from src.api.graphql.types.column import ColumnType
from src.api.graphql.types.card import CardType
from src.services.board import BoardService
from src.services.column import ColumnService
from src.services.card import CardService

class Query(graphene.ObjectType):
    """Root GraphQL Query"""
    boards = graphene.List(BoardType)
    board = graphene.Field(BoardType, id=graphene.ID(required=True))
    columns = graphene.List(ColumnType, board_id=graphene.ID())
    cards = graphene.List(CardType, column_id=graphene.ID())
    
    def resolve_boards(self, info):
        """Resolve all boards"""
        boards = BoardService.get_all_boards()
        return [
            BoardType(
                id=board.id,
                title=board.title
            ) 
            for board in boards
        ]
    
    def resolve_board(self, info, id):
        """Resolve a single board by ID"""
        board = BoardService.get_board_by_id(id)
        if board:
            return BoardType(
                id=board.id,
                title=board.title
            )
        return None
    
    def resolve_columns(self, info, board_id=None):
        """Resolve columns, optionally filtered by board_id"""
        if board_id:
            columns = ColumnService.get_columns_by_board_id(board_id)
        else:
            columns = ColumnService.get_all_columns()
        
        return [
            ColumnType(
                id=column.id,
                title=column.title,
                board_id=column.board_id,
                order=column.order
            ) 
            for column in columns
        ]
    
    def resolve_cards(self, info, column_id=None):
        """Resolve cards, optionally filtered by column_id"""
        if column_id:
            cards = CardService.get_cards_by_column_id(column_id)
        else:
            cards = CardService.get_all_cards()
        
        return [
            CardType(
                id=card.id,
                title=card.title,
                description=card.description,
                column_id=card.column_id
            ) 
            for card in cards
        ]
