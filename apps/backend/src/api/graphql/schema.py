import graphene
from src.api.graphql.resolvers.query import Query

# Create the GraphQL schema
schema = graphene.Schema(query=Query)
