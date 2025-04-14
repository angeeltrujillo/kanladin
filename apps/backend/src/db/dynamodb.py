import boto3
from botocore.exceptions import ClientError
from src.core.config import settings
from src.core.exceptions import DatabaseException, NotFoundException
from typing import Dict, Any, List, Optional
import logging

logger = logging.getLogger(__name__)

class DynamoDBClient:
    """Client for interacting with DynamoDB Local"""
    
    def __init__(self):
        """Initialize the DynamoDB client"""
        self.client = boto3.resource(
            'dynamodb',
            endpoint_url=settings.DYNAMODB_ENDPOINT_URL,
            region_name=settings.AWS_REGION,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
        )
        self.tables = {}
    
    def get_table(self, table_name: str):
        """Get a DynamoDB table by name"""
        if table_name not in self.tables:
            self.tables[table_name] = self.client.Table(table_name)
        return self.tables[table_name]
    
    def create_table_if_not_exists(self, table_name: str, key_schema: List[Dict[str, str]], 
                                  attribute_definitions: List[Dict[str, str]]):
        """Create a DynamoDB table if it doesn't exist"""
        try:
            # Check if table exists
            self.client.meta.client.describe_table(TableName=table_name)
            logger.info(f"Table {table_name} already exists")
            # Make sure the table is active and ready for use
            self.tables[table_name] = self.client.Table(table_name)
            return self.tables[table_name]
        except ClientError as e:
            if e.response['Error']['Code'] == 'ResourceNotFoundException':
                try:
                    # Create the table
                    logger.info(f"Creating table {table_name}...")
                    table = self.client.create_table(
                        TableName=table_name,
                        KeySchema=key_schema,
                        AttributeDefinitions=attribute_definitions,
                        ProvisionedThroughput={
                            'ReadCapacityUnits': 5,
                            'WriteCapacityUnits': 5
                        }
                    )
                    # Wait for table to be created
                    logger.info(f"Waiting for table {table_name} to be created...")
                    table.meta.client.get_waiter('table_exists').wait(TableName=table_name)
                    logger.info(f"Table {table_name} created successfully")
                    
                    # Cache the table reference
                    self.tables[table_name] = table
                    return table
                except Exception as create_error:
                    error_msg = f"Failed to create table {table_name}: {str(create_error)}"
                    logger.error(error_msg)
                    raise DatabaseException("create_table", error_msg) from create_error
            else:
                error_msg = f"Error checking if table {table_name} exists: {str(e)}"
                logger.error(error_msg)
                raise DatabaseException("check_table_exists", error_msg) from e
        
        return self.get_table(table_name)
    
    def put_item(self, table_name: str, item: Dict[str, Any]):
        """Add an item to a DynamoDB table"""
        table = self.get_table(table_name)
        try:
            response = table.put_item(Item=item)
            return response
        except ClientError as e:
            error_code = e.response['Error']['Code']
            error_message = e.response['Error']['Message']
            logger.error(f"Error putting item into {table_name}: {error_code} - {error_message}")
            raise DatabaseException("put_item", f"{error_code}: {error_message}")
        except Exception as e:
            logger.error(f"Unexpected error putting item into {table_name}: {str(e)}")
            raise DatabaseException("put_item", str(e))
    
    def get_item(self, table_name: str, key: Dict[str, Any]):
        """Get an item from a DynamoDB table"""
        table = self.get_table(table_name)
        try:
            response = table.get_item(Key=key)
            return response.get('Item')
        except ClientError as e:
            error_code = e.response['Error']['Code']
            error_message = e.response['Error']['Message']
            logger.error(f"Error getting item from {table_name}: {error_code} - {error_message}")
            raise DatabaseException("get_item", f"{error_code}: {error_message}")
        except Exception as e:
            logger.error(f"Unexpected error getting item from {table_name}: {str(e)}")
            raise DatabaseException("get_item", str(e))
    
    def query(self, table_name: str, key_condition_expression, expression_attribute_values):
        """Query items from a DynamoDB table"""
        table = self.get_table(table_name)
        try:
            response = table.query(
                KeyConditionExpression=key_condition_expression,
                ExpressionAttributeValues=expression_attribute_values
            )
            return response.get('Items', [])
        except ClientError as e:
            error_code = e.response['Error']['Code']
            error_message = e.response['Error']['Message']
            logger.error(f"Error querying {table_name}: {error_code} - {error_message}")
            raise DatabaseException("query", f"{error_code}: {error_message}")
        except Exception as e:
            logger.error(f"Unexpected error querying {table_name}: {str(e)}")
            raise DatabaseException("query", str(e))
    
    def scan(self, table_name: str):
        """Scan all items from a DynamoDB table"""
        table = self.get_table(table_name)
        try:
            response = table.scan()
            return response.get('Items', [])
        except ClientError as e:
            error_code = e.response['Error']['Code']
            error_message = e.response['Error']['Message']
            logger.error(f"Error scanning {table_name}: {error_code} - {error_message}")
            raise DatabaseException("scan", f"{error_code}: {error_message}")
        except Exception as e:
            logger.error(f"Unexpected error scanning {table_name}: {str(e)}")
            raise DatabaseException("scan", str(e))
    
    def update_item(self, table_name: str, key: Dict[str, Any], 
                    update_expression: str, expression_attribute_values: Dict[str, Any]):
        """Update an item in a DynamoDB table"""
        table = self.get_table(table_name)
        try:
            response = table.update_item(
                Key=key,
                UpdateExpression=update_expression,
                ExpressionAttributeValues=expression_attribute_values,
                ReturnValues="UPDATED_NEW"
            )
            return response
        except ClientError as e:
            error_code = e.response['Error']['Code']
            error_message = e.response['Error']['Message']
            logger.error(f"Error updating item in {table_name}: {error_code} - {error_message}")
            raise DatabaseException("update_item", f"{error_code}: {error_message}")
        except Exception as e:
            logger.error(f"Unexpected error updating item in {table_name}: {str(e)}")
            raise DatabaseException("update_item", str(e))
    
    def delete_item(self, table_name: str, key: Dict[str, Any]):
        """Delete an item from a DynamoDB table"""
        table = self.get_table(table_name)
        try:
            response = table.delete_item(Key=key)
            return response
        except ClientError as e:
            error_code = e.response['Error']['Code']
            error_message = e.response['Error']['Message']
            logger.error(f"Error deleting item from {table_name}: {error_code} - {error_message}")
            raise DatabaseException("delete_item", f"{error_code}: {error_message}")
        except Exception as e:
            logger.error(f"Unexpected error deleting item from {table_name}: {str(e)}")
            raise DatabaseException("delete_item", str(e))

# Create a global DynamoDB client instance
dynamodb = DynamoDBClient()
