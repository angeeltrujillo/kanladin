"""Custom error formatter for GraphQL responses"""

from graphql import GraphQLError
from src.core.exceptions import (
    KanladinException,
    NotFoundException,
    ValidationException,
    DatabaseException,
    ConflictException
)
import logging

logger = logging.getLogger(__name__)

def format_error(error: GraphQLError):
    """Format GraphQL errors to provide better error messages to clients"""
    # Get the original error
    original_error = getattr(error, "original_error", None)
    
    # Default error response
    formatted_error = {
        "message": str(error),
        "path": error.path,
        "locations": [{
            "line": location.line,
            "column": location.column
        } for location in error.locations] if error.locations else None,
    }
    
    # Handle custom exceptions
    if isinstance(original_error, KanladinException):
        formatted_error["message"] = original_error.message
        
        # Add exception-specific fields
        if isinstance(original_error, NotFoundException):
            formatted_error["code"] = "NOT_FOUND"
            formatted_error["resourceType"] = original_error.resource_type
            formatted_error["resourceId"] = original_error.resource_id
            
        elif isinstance(original_error, ValidationException):
            formatted_error["code"] = "VALIDATION_ERROR"
            
        elif isinstance(original_error, DatabaseException):
            formatted_error["code"] = "DATABASE_ERROR"
            formatted_error["operation"] = original_error.operation
            # Don't expose detailed database errors in production
            if not formatted_error.get("details"):
                formatted_error["details"] = "A database error occurred"
                
        elif isinstance(original_error, ConflictException):
            formatted_error["code"] = "CONFLICT"
            formatted_error["resourceType"] = original_error.resource_type
            formatted_error["identifier"] = original_error.identifier
    
    # Log the error
    logger.error(f"GraphQL error: {formatted_error['message']}")
    
    return formatted_error
