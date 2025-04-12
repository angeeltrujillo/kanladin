# Hardcoded data for our Kanban board

cards_data = [
    {"id": "card-1", "title": "Research API options", "description": "Compare REST vs GraphQL for our backend", "columnId": "col-1", "order": 0},
    {"id": "card-2", "title": "Design database schema", "description": "Create initial schema for DynamoDB", "columnId": "col-1", "order": 1},
    {"id": "card-3", "title": "Setup project structure", "description": "", "columnId": "col-1", "order": 2},
    {"id": "card-4", "title": "Create UI components", "description": "Build Card and Column components with Tailwind", "columnId": "col-2", "order": 0},
    {"id": "card-5", "title": "Implement drag and drop", "description": "Use DnD Kit library", "columnId": "col-2", "order": 1},
    {"id": "card-6", "title": "Project setup", "description": "Initialize repository and configure tools", "columnId": "col-3", "order": 0},
]

columns_data = [
    {"id": "col-1", "title": "To Do", "boardId": "board-1", "order": 0},
    {"id": "col-2", "title": "In Progress", "boardId": "board-1", "order": 1},
    {"id": "col-3", "title": "Done", "boardId": "board-1", "order": 2},
]

boards_data = [
    {"id": "board-1", "title": "Kanladin Project Board"}
]
