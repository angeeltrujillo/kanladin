from fastapi import APIRouter
from starlette.applications import Starlette
from starlette_graphene3 import GraphQLApp, make_graphiql_handler
from src.api.graphql.schema import schema

# Create GraphQL router
router = APIRouter()

# Create a GraphQLApp instance
graphql_app = GraphQLApp(schema, on_get=make_graphiql_handler())

# Add the GraphQL endpoint to the router
router.add_route("/graphql", graphql_app)
