import graphene
import uuid
from src.api.graphql.types.board import BoardType
from src.api.graphql.types.column import ColumnType
from src.api.graphql.types.card import CardType
from src.services.board import BoardService
from src.services.column import ColumnService
from src.services.card import CardService
from src.db.models.board import Board
from src.db.models.column import Column
from src.db.models.card import Card

# Board Mutations
class CreateBoard(graphene.Mutation):
    """Mutation to create a new board"""
    class Arguments:
        title = graphene.String(required=True)
    
    board = graphene.Field(BoardType)
    
    def mutate(self, info, title):
        board_id = f"board-{uuid.uuid4().hex[:8]}"
        board = Board(id=board_id, title=title)
        created_board = BoardService.create_board(board)
        return CreateBoard(board=BoardType(
            id=created_board.id,
            title=created_board.title
        ))

class UpdateBoard(graphene.Mutation):
    """Mutation to update an existing board"""
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String(required=True)
    
    board = graphene.Field(BoardType)
    
    def mutate(self, info, id, title):
        board = BoardService.get_board_by_id(id)
        if not board:
            raise Exception(f"Board with ID {id} not found")
        
        board.title = title
        updated_board = BoardService.update_board(board)
        return UpdateBoard(board=BoardType(
            id=updated_board.id,
            title=updated_board.title
        ))

class DeleteBoard(graphene.Mutation):
    """Mutation to delete a board"""
    class Arguments:
        id = graphene.ID(required=True)
    
    success = graphene.Boolean()
    
    def mutate(self, info, id):
        board = BoardService.get_board_by_id(id)
        if not board:
            raise Exception(f"Board with ID {id} not found")
        
        success = BoardService.delete_board(id)
        return DeleteBoard(success=success)

# Column Mutations
class CreateColumn(graphene.Mutation):
    """Mutation to create a new column"""
    class Arguments:
        title = graphene.String(required=True)
        board_id = graphene.ID(required=True)
        order = graphene.Int(required=True)
    
    column = graphene.Field(ColumnType)
    
    def mutate(self, info, title, board_id, order):
        # Verify board exists
        board = BoardService.get_board_by_id(board_id)
        if not board:
            raise Exception(f"Board with ID {board_id} not found")
        
        column_id = f"col-{uuid.uuid4().hex[:8]}"
        column = Column(id=column_id, title=title, board_id=board_id, order=order)
        created_column = ColumnService.create_column(column)
        return CreateColumn(column=ColumnType(
            id=created_column.id,
            title=created_column.title,
            board_id=created_column.board_id,
            order=created_column.order
        ))

class UpdateColumn(graphene.Mutation):
    """Mutation to update an existing column"""
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        order = graphene.Int()
    
    column = graphene.Field(ColumnType)
    
    def mutate(self, info, id, title=None, order=None):
        column = ColumnService.get_column_by_id(id)
        if not column:
            raise Exception(f"Column with ID {id} not found")
        
        if title is not None:
            column.title = title
        if order is not None:
            column.order = order
        
        updated_column = ColumnService.update_column(column)
        return UpdateColumn(column=ColumnType(
            id=updated_column.id,
            title=updated_column.title,
            board_id=updated_column.board_id,
            order=updated_column.order
        ))

class DeleteColumn(graphene.Mutation):
    """Mutation to delete a column"""
    class Arguments:
        id = graphene.ID(required=True)
    
    success = graphene.Boolean()
    
    def mutate(self, info, id):
        column = ColumnService.get_column_by_id(id)
        if not column:
            raise Exception(f"Column with ID {id} not found")
        
        success = ColumnService.delete_column(id)
        return DeleteColumn(success=success)

# Card Mutations
class CreateCard(graphene.Mutation):
    """Mutation to create a new card"""
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String()
        column_id = graphene.ID(required=True)
        order = graphene.Int()
    
    card = graphene.Field(CardType)
    
    def mutate(self, info, title, column_id, description="", order=None):
        # Verify column exists
        column = ColumnService.get_column_by_id(column_id)
        if not column:
            raise Exception(f"Column with ID {column_id} not found")
        
        # If order is not specified, get the highest order in the column and add 1
        if order is None:
            cards = CardService.get_cards_by_column_id(column_id)
            if cards:
                highest_order = max(card.order for card in cards)
                order = highest_order + 1
            else:
                order = 0
        
        card_id = f"card-{uuid.uuid4().hex[:8]}"
        card = Card(id=card_id, title=title, description=description, column_id=column_id, order=order)
        created_card = CardService.create_card(card)
        return CreateCard(card=CardType(
            id=created_card.id,
            title=created_card.title,
            description=created_card.description,
            column_id=created_card.column_id,
            order=created_card.order
        ))

class UpdateCard(graphene.Mutation):
    """Mutation to update an existing card"""
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        description = graphene.String()
        column_id = graphene.ID()
        order = graphene.Int()
    
    card = graphene.Field(CardType)
    
    def mutate(self, info, id, title=None, description=None, column_id=None, order=None):
        card = CardService.get_card_by_id(id)
        if not card:
            raise Exception(f"Card with ID {id} not found")
        
        if title is not None:
            card.title = title
        if description is not None:
            card.description = description
        if column_id is not None:
            # Verify column exists
            column = ColumnService.get_column_by_id(column_id)
            if not column:
                raise Exception(f"Column with ID {column_id} not found")
            card.column_id = column_id
        if order is not None:
            card.order = order
        
        updated_card = CardService.update_card(card)
        return UpdateCard(card=CardType(
            id=updated_card.id,
            title=updated_card.title,
            description=updated_card.description,
            column_id=updated_card.column_id,
            order=updated_card.order
        ))

class DeleteCard(graphene.Mutation):
    """Mutation to delete a card"""
    class Arguments:
        id = graphene.ID(required=True)
    
    success = graphene.Boolean()
    
    def mutate(self, info, id):
        card = CardService.get_card_by_id(id)
        if not card:
            raise Exception(f"Card with ID {id} not found")
        
        success = CardService.delete_card(id)
        return DeleteCard(success=success)

class MoveCard(graphene.Mutation):
    """Mutation to move a card to a different column"""
    class Arguments:
        id = graphene.ID(required=True)
        column_id = graphene.ID(required=True)
        order = graphene.Int()
    
    card = graphene.Field(CardType)
    
    def mutate(self, info, id, column_id, order=None):
        # Verify card exists
        card = CardService.get_card_by_id(id)
        if not card:
            raise Exception(f"Card with ID {id} not found")
        
        # Verify column exists
        column = ColumnService.get_column_by_id(column_id)
        if not column:
            raise Exception(f"Column with ID {column_id} not found")
        
        # Store original column ID and order
        original_column_id = card.column_id
        original_order = card.order
        
        # If moving to a new column and order is not specified, add to the end
        if card.column_id != column_id and order is None:
            target_column_cards = CardService.get_cards_by_column_id(column_id)
            if target_column_cards:
                highest_order = max(c.order for c in target_column_cards)
                order = highest_order + 1
            else:
                order = 0
        
        # 1. Update the source column cards (close the gap)
        if original_column_id != column_id:  # Only if moving to a different column
            source_column_cards = CardService.get_cards_by_column_id(original_column_id)
            for c in source_column_cards:
                # Skip the card being moved
                if c.id == id:
                    continue
                # Shift cards after the moved card up one spot
                if c.order > original_order:
                    c.order -= 1
                    CardService.update_card(c)
        
        # 2. Update the target column cards (make space)
        if order is not None:
            target_column_cards = CardService.get_cards_by_column_id(column_id)
            for c in target_column_cards:
                # Skip the card being moved
                if c.id == id:
                    continue
                # Shift cards at or after the insertion point down one spot
                if c.order >= order:
                    c.order += 1
                    CardService.update_card(c)
        
        # 3. Finally, update the moved card's column and order
        card.column_id = column_id
        if order is not None:
            card.order = order
            
        updated_card = CardService.update_card(card)
        return MoveCard(card=CardType(
            id=updated_card.id,
            title=updated_card.title,
            description=updated_card.description,
            column_id=updated_card.column_id,
            order=updated_card.order
        ))

class UpdateCardOrder(graphene.Mutation):
    """Mutation to update the order of a card within its column"""
    class Arguments:
        id = graphene.ID(required=True)
        order = graphene.Int(required=True)
    
    card = graphene.Field(CardType)
    
    def mutate(self, info, id, order):
        # Get the card to be reordered
        card = CardService.get_card_by_id(id)
        if not card:
            raise Exception(f"Card with ID {id} not found")
        
        # Get all cards in the same column
        column_cards = CardService.get_cards_by_column_id(card.column_id)
        
        # Store the original order of the card being moved
        original_order = card.order
        
        # Update the order of all affected cards in the column
        for c in column_cards:
            # Skip the card being moved
            if c.id == id:
                continue
                
            # If moving card down (to a higher order)
            if order > original_order:
                # Shift cards between original position and new position up one spot
                if original_order < c.order <= order:
                    c.order -= 1
                    CardService.update_card(c)
            # If moving card up (to a lower order)
            elif order < original_order:
                # Shift cards between new position and original position down one spot
                if order <= c.order < original_order:
                    c.order += 1
                    CardService.update_card(c)
        
        # Finally, update the moved card's order
        card.order = order
        updated_card = CardService.update_card(card)
        
        return UpdateCardOrder(card=CardType(
            id=updated_card.id,
            title=updated_card.title,
            description=updated_card.description,
            column_id=updated_card.column_id,
            order=updated_card.order
        ))

class Mutation(graphene.ObjectType):
    """Root GraphQL Mutation"""
    # Board mutations
    create_board = CreateBoard.Field()
    update_board = UpdateBoard.Field()
    delete_board = DeleteBoard.Field()
    
    # Column mutations
    create_column = CreateColumn.Field()
    update_column = UpdateColumn.Field()
    delete_column = DeleteColumn.Field()
    
    # Card mutations
    create_card = CreateCard.Field()
    update_card = UpdateCard.Field()
    delete_card = DeleteCard.Field()
    move_card = MoveCard.Field()
    update_card_order = UpdateCardOrder.Field()
