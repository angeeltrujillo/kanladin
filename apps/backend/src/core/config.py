from pydantic_settings import BaseSettings
from typing import List, Dict, Any, Optional
import os
import json
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    """Application settings with environment variable support"""
    # Application settings
    APP_NAME: str = os.getenv("APP_NAME", "Kanladin API")
    API_PREFIX: str = os.getenv("API_PREFIX", "/api")
    DEBUG: bool = os.getenv("DEBUG", "true").lower() in ("true", "1", "t")
    
    # CORS settings
    CORS_ORIGINS: List[str] = json.loads(os.getenv("CORS_ORIGINS", '["http://localhost:3000"]'))
    CORS_ALLOW_CREDENTIALS: bool = os.getenv("CORS_ALLOW_CREDENTIALS", "true").lower() in ("true", "1", "t")
    CORS_ALLOW_METHODS: List[str] = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    CORS_ALLOW_HEADERS: List[str] = ["Content-Type", "Authorization", "Accept"]
    
    # DynamoDB settings
    DYNAMODB_ENDPOINT_URL: str = os.getenv("DYNAMODB_ENDPOINT_URL", "http://dynamodb-local:8000")
    AWS_REGION: str = os.getenv("AWS_REGION", "us-east-1")
    AWS_ACCESS_KEY_ID: str = os.getenv("AWS_ACCESS_KEY_ID", "")
    AWS_SECRET_ACCESS_KEY: str = os.getenv("AWS_SECRET_ACCESS_KEY", "")
    
    # DynamoDB table names
    DYNAMODB_BOARDS_TABLE: str = os.getenv("DYNAMODB_BOARDS_TABLE", "boards")
    DYNAMODB_COLUMNS_TABLE: str = os.getenv("DYNAMODB_COLUMNS_TABLE", "columns")
    DYNAMODB_CARDS_TABLE: str = os.getenv("DYNAMODB_CARDS_TABLE", "cards")
    
    # Logging settings
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    
    def parse_cors_origins(self) -> List[str]:
        """Parse CORS_ORIGINS from environment variable"""
        if isinstance(self.CORS_ORIGINS, str):
            try:
                return json.loads(self.CORS_ORIGINS)
            except json.JSONDecodeError:
                return [origin.strip() for origin in self.CORS_ORIGINS.split(',')]
        return self.CORS_ORIGINS
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Create global settings object
settings = Settings()
