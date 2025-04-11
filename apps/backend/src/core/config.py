from pydantic_settings import BaseSettings
from typing import List, Dict, Any, Optional
import os
import json

class Settings(BaseSettings):
    """Application settings"""
    APP_NAME: str = "Kanladin API"
    API_PREFIX: str = "/api"
    DEBUG: bool = True
    
    # CORS settings
    CORS_ORIGINS: List[str] = ["*"]
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: List[str] = ["*"]
    CORS_ALLOW_HEADERS: List[str] = ["*"]
    
    # DynamoDB settings
    DYNAMODB_ENDPOINT_URL: str = "http://dynamodb-local:8000"
    AWS_REGION: str = "us-east-1"
    AWS_ACCESS_KEY_ID: str = "dummy"
    AWS_SECRET_ACCESS_KEY: str = "dummy"
    
    # DynamoDB table names
    DYNAMODB_BOARDS_TABLE: str = "Boards"
    DYNAMODB_COLUMNS_TABLE: str = "Columns"
    DYNAMODB_CARDS_TABLE: str = "Cards"
    
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
