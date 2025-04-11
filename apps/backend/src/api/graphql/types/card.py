import graphene

class CardType(graphene.ObjectType):
    """GraphQL type for Card"""
    id = graphene.ID()
    title = graphene.String()
    description = graphene.String()
    column_id = graphene.String()
