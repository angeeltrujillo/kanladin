import graphene
from src.api.graphql.types.column import ColumnType
from src.services.column import ColumnService

class BoardType(graphene.ObjectType):
    """GraphQL type for Board"""
    id = graphene.ID()
    title = graphene.String()
    columns = graphene.List(ColumnType)
    
    def resolve_columns(self, info):
        """Resolve columns for this board"""
        columns = ColumnService.get_columns_by_board_id(self.id)
        return [
            ColumnType(
                id=column.id,
                title=column.title,
                board_id=column.board_id,
                order=column.order
            ) 
            for column in columns
        ]
