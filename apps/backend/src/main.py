from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.core.config import settings
from src.api.router import router as api_router

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

# Include API router
app.include_router(api_router)

# Root endpoint - Hello World
@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.APP_NAME}. Visit /graphql to use the GraphQL interface."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)
