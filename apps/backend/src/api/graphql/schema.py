import graphene
from src.api.graphql.resolvers.query import Query
from src.api.graphql.resolvers.mutation import Mutation

# Create the GraphQL schema with both queries and mutations
schema = graphene.Schema(query=Query, mutation=Mutation)
