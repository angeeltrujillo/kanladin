from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.core.config import settings
from src.api.router import router as api_router
from src.db.init_db import init_database
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title=settings.APP_NAME)

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
    allow_methods=settings.CORS_ALLOW_METHODS,
    allow_headers=settings.CORS_ALLOW_HEADERS,
)

# Initialize DynamoDB tables and seed data on startup
@app.on_event("startup")
async def startup_db_client():
    logger.info("Initializing DynamoDB tables and seeding data...")
    try:
        init_database()
        logger.info("DynamoDB initialization complete")
    except Exception as e:
        logger.error(f"Error initializing DynamoDB: {e}")

# Include API router
app.include_router(api_router)

# Root endpoint - Hello World
@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.APP_NAME}. Visit /graphql to use the GraphQL interface."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)
