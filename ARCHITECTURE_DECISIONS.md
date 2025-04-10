# Architecture & Technical Decisions

This document outlines the key architectural and design decisions made for the Kanladin project, along with the rationale behind them.


## 1. Monorepo structure

**Decision:** Use a single Git repository with separate folders for `frontend`, `backend`, and `infra`.

**Rationale:**
- Encourages easier local development and coordination between front/back ends.
- Aligns with common production patterns where multiple services are versioned together.
- Enables shared tooling (tests, configs, scripts) in a single place.

---

## 2. Frontend

**Decision:** Use React, Apollo Client, Tailwind CSS, Vite and Pragmatic Drag and Drop.

**Rationale:**
- React is widely adopted and excels for component-based UI like Kanban boards.
- Apollo Client integrates well with GraphQL and handles caching, mutations, and optimistic UI updates.
- Tailwind CSS accelerates styling with utility classes, while keeping styles consistent and maintainable.
- Vite provides a fast and efficient way to build and bundle React applications.
- Pragmatic Drag and Drop is a simple and effective way to implement drag and drop functionality. Developed by Atlassian, the company that developed Jira and it seems like more active development.

---

## 3. Backend

**Decision:** Use Python, Graphene, and DynamoDB.

**Rationale:**
- Python is productive for backend APIs and aligns with the challenge requirements.
- Graphene provides a straightforward GraphQL API with a clear schema and resolver model.
- DynamoDB Local allows fast iteration without incurring AWS costs, and aligns with serverless/NoSQL environments often used in production.

---

## 4. Schema Design

- **Entities:** `Board`, `Column`, and `Card`.
- **Cards** reference columns via foreign keys (e.g., `columnId`).
- **Columns** are ordered by a `position` field; cards too.

**Rationale:**
- Normalized but flat structure supports fast reads/writes in DynamoDB.
- Simplifies UI rendering and sorting without nested collections.

---

## 5. Docker & Docker Compose

**Rationale:**
- Enables consistent dev environment across machines.
- Bundles services (frontend/backend/DynamoDB) for local development or potential deployment to cloud (e.g., ECS or EC2).
- Simplifies onboarding for reviewers/testers.

---

## 6. Testing Strategy

- Unit tests added for key frontend components and backend resolvers.
- Considered E2E tests for card movement as future work.

**Rationale:**
- Focused on core logic for this challenge.
- Prioritized coverage for mission-critical logic (card move, add, delete).

---

## 7. Developer experience

**Rationale:**
- Used ESLint, Prettier, EditorConfig in frontend.
- Followed clean code principles and separated concerns (hooks, component, services).
- Naming conventions match domain logic (not generic).

---

## 8. CI/CD

**Rationale:**: Maybe, for now.

---

## 9. Tradeoffs

**Rationale:**

---

## 10. Scalability

**Rationale:**

---

## 11. Observability

**Rationale:**

---

## 12. Future Considerations

If this were a production system:
- Add authentication and role-based access control
- Implement real-time sync (WebSockets or GraphQL Subscriptions)
- Improve error tracking and monitoring (e.g., Sentry, CloudWatch, Datadog)
- Optimize DynamoDB access with GSIs and batched writes
- In this challenge I push every commit in to the main branch, but in a production system I would use a feature branch workflow.

---

## 13. Final Thoughts

All decisions were made with scope, maintainability, and user experience in mind — aiming to deliver business value quickly while keeping room for scaling and evolution.

