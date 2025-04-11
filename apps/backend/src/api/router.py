from fastapi import APIRouter
from src.api.graphql.router import router as graphql_router

# Create main API router
router = APIRouter()

# Include GraphQL router
router.include_router(graphql_router)

# Health check endpoint
@router.get("/health")
async def health_check():
    return {"status": "ok"}
