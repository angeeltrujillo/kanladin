import graphene
from src.api.graphql.types.card import CardType
from src.services.card import CardService

class ColumnType(graphene.ObjectType):
    """GraphQL type for Column"""
    id = graphene.ID()
    title = graphene.String()
    board_id = graphene.String()
    order = graphene.Int()
    cards = graphene.List(CardType)
    
    def resolve_cards(self, info):
        """Resolve cards for this column"""
        cards = CardService.get_cards_by_column_id(self.id)
        return [
            CardType(
                id=card.id,
                title=card.title,
                description=card.description,
                column_id=card.column_id,
                order=card.order
            ) 
            for card in cards
        ]
