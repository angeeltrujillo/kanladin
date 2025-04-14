from fastapi import APIRouter
from starlette.applications import Starlette
from starlette_graphene3 import GraphQLApp, make_graphiql_handler
from src.api.graphql.schema import schema
from src.api.graphql.error_formatter import format_error
import logging

logger = logging.getLogger(__name__)

# Create GraphQL router
router = APIRouter()

# Create a GraphQLApp instance with custom error formatter
graphql_app = GraphQLApp(
    schema, 
    on_get=make_graphiql_handler(),
    error_formatter=format_error
)

# Add the GraphQL endpoint to the router
router.add_route("/graphql", graphql_app)

logger.info("GraphQL router initialized")
