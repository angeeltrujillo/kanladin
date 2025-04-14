"""Custom exceptions for the application"""

class KanladinException(Exception):
    """Base exception for all application exceptions"""
    def __init__(self, message: str = "An error occurred"):
        self.message = message
        super().__init__(self.message)


class NotFoundException(KanladinException):
    """Exception raised when a resource is not found"""
    def __init__(self, resource_type: str, resource_id: str):
        self.resource_type = resource_type
        self.resource_id = resource_id
        message = f"{resource_type} with ID '{resource_id}' not found"
        super().__init__(message)


class ValidationException(KanladinException):
    """Exception raised when validation fails"""
    def __init__(self, message: str = "Validation error"):
        super().__init__(message)


class DatabaseException(KanladinException):
    """Exception raised when a database operation fails"""
    def __init__(self, operation: str, details: str = ""):
        self.operation = operation
        self.details = details
        message = f"Database operation '{operation}' failed"
        if details:
            message += f": {details}"
        super().__init__(message)


class ConflictException(KanladinException):
    """Exception raised when a resource already exists"""
    def __init__(self, resource_type: str, identifier: str):
        self.resource_type = resource_type
        self.identifier = identifier
        message = f"{resource_type} with identifier '{identifier}' already exists"
        super().__init__(message)
