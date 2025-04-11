from src.db.dynamodb import dynamodb
from src.core.config import settings
from src.db import mock_data
import logging

logger = logging.getLogger(__name__)

def create_tables():
    """Create DynamoDB tables if they don't exist"""
    # Create Boards table
    dynamodb.create_table_if_not_exists(
        table_name=settings.DYNAMODB_BOARDS_TABLE,
        key_schema=[
            {'AttributeName': 'id', 'KeyType': 'HASH'}
        ],
        attribute_definitions=[
            {'AttributeName': 'id', 'AttributeType': 'S'}
        ]
    )
    
    # Create Columns table
    dynamodb.create_table_if_not_exists(
        table_name=settings.DYNAMODB_COLUMNS_TABLE,
        key_schema=[
            {'AttributeName': 'id', 'KeyType': 'HASH'}
        ],
        attribute_definitions=[
            {'AttributeName': 'id', 'AttributeType': 'S'}
        ]
    )
    
    # Create Cards table
    dynamodb.create_table_if_not_exists(
        table_name=settings.DYNAMODB_CARDS_TABLE,
        key_schema=[
            {'AttributeName': 'id', 'KeyType': 'HASH'}
        ],
        attribute_definitions=[
            {'AttributeName': 'id', 'AttributeType': 'S'}
        ]
    )

def seed_data():
    """Seed the DynamoDB tables with initial data"""
    # Seed Boards
    for board in mock_data.boards_data:
        dynamodb.put_item(settings.DYNAMODB_BOARDS_TABLE, board)
        logger.info(f"Added board: {board['id']}")
    
    # Seed Columns
    for column in mock_data.columns_data:
        dynamodb.put_item(settings.DYNAMODB_COLUMNS_TABLE, column)
        logger.info(f"Added column: {column['id']}")
    
    # Seed Cards
    for card in mock_data.cards_data:
        dynamodb.put_item(settings.DYNAMODB_CARDS_TABLE, card)
        logger.info(f"Added card: {card['id']}")

def init_database():
    """Initialize the database by creating tables and seeding data"""
    try:
        create_tables()
        seed_data()
        logger.info("Database initialization complete")
    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        raise

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    init_database()
