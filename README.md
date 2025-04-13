# Kanladin - Feature-Based Kanban Board

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-blue)](https://tailwindcss.com/)
[![Apollo GraphQL](https://img.shields.io/badge/Apollo-3.7-blue)](https://www.apollographql.com/)
[![DynamoDB](https://img.shields.io/badge/DynamoDB-Local-orange)](https://aws.amazon.com/dynamodb/)
[![Python](https://img.shields.io/badge/Python-3.9-green)](https://www.python.org/)
[![Graphene](https://img.shields.io/badge/Graphene-3.0-green)](https://graphene-python.org/)

## Overview

Kanladin is a modern Kanban board application built with a feature-based architecture. It allows users to manage tasks through a drag-and-drop interface, similar to Trello. The application demonstrates best practices in React development, including component composition, context-based state management, and clean code organization.

![Kanladin Screenshot](./docs/screenshot.png)

## Features

- **Drag and Drop**: Intuitive drag-and-drop functionality for cards and columns
- **CRUD Operations**: Create, read, update, and delete operations for boards, columns, and cards
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Optimistic UI**: Immediate UI updates with background synchronization

## Architecture

Kanladin follows a feature-based architecture that organizes code by domain features rather than technical concerns. This approach improves maintainability, testability, and developer experience.

### Key Architectural Components

- **Feature Modules**: Self-contained modules for board, column, card, and drag-and-drop functionality
- **Context Providers**: React Context API for state management
- **Custom Hooks**: Encapsulated business logic in reusable hooks
- **GraphQL API**: Apollo Client for data fetching and mutations

### Directory Structure

```
/apps
  /frontend             # React frontend application
    /src
      /features         # Feature-based organization
        /board          # Board feature
        /column         # Column feature
        /card           # Card feature
        /dnd            # Drag and drop feature
        /kanban         # Main Kanban board composition
      /utils            # Shared utilities
      /types            # TypeScript type definitions
  /backend              # Python GraphQL backend
    /graphql            # GraphQL schema and resolvers
    /models             # Data models
    /services           # Business logic
```

## Getting Started

### Prerequisites

- Node.js 16+
- Python 3.9+
- Docker (optional)

### Installation

1. Clone the repository

```bash
git clone https://github.com/angeeltrujillo/kanladin.git
cd kanladin
```

2. Install frontend dependencies

```bash
cd apps/frontend
npm install
```

3. Install backend dependencies

```bash
cd ../backend
pip install -r requirements.txt
```

4. Start DynamoDB Local

```bash
docker-compose up -d dynamodb-local
```

5. Start the backend server

```bash
python app.py
```

6. Start the frontend development server

```bash
cd ../frontend
npm start
```

7. Open your browser and navigate to `http://localhost:3000`

### Docker Setup (Optional)

To run the entire application using Docker:

```bash
docker-compose up -d
```

This will start the frontend, backend, and DynamoDB Local in separate containers.

## Development

### Frontend Development

The frontend is built with React, TypeScript, and Tailwind CSS. It uses Apollo Client for GraphQL communication.

```bash
cd apps/frontend
npm start
```

### Backend Development

The backend is built with Python, Graphene, and DynamoDB. It provides a GraphQL API for the frontend.

```bash
cd apps/backend
python app.py
```

### Testing

```bash
# Frontend tests
cd apps/frontend
npm test

# Backend tests
cd apps/backend
python -m pytest
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

