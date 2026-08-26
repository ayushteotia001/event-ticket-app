# Event Ticket App

Event Ticket App is a full-stack ticket management application built with Spring Boot and React. It allows organizers to create and manage events, attendees to browse and purchase tickets, and staff to validate tickets using QR codes. Keycloak is used for authentication and authorization.

## What's In This Repo

| Directory | Contents |
|-----------|----------|
| `backend/` | Spring Boot REST API |
| `frontend/` | React frontend application |

## Tech Stack

### Backend
- Java 21
- Spring Boot 3.4.4
- Spring Security
- Spring Data JPA
- PostgreSQL
- H2 Database
- MapStruct
- Lombok
- Maven

### Frontend
- React
- Vite
- JavaScript
- CSS

### Authentication
- Keycloak
- OAuth2 / OpenID Connect

### Development Tools
- Docker
- Git
- GitHub

## Main Features

- Event creation and management
- Multiple ticket types for events
- Ticket purchasing
- User authentication and authorization
- QR code based ticket validation
- Event and ticket management
- REST API based backend
- React-based frontend

## Application Structure

The project is divided into two main applications.

### Backend

The backend is a Spring Boot application that provides REST APIs for event, ticket, user, and ticket validation related operations.

```text
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   └── test/
├── pom.xml
└── docker-compose.yml
```

### Frontend

The frontend is a React application created using Vite. It communicates with the backend through REST APIs.

```text
frontend/
├── src/
├── public/
├── package.json
└── vite.config.js
```

## Running the Project

### Prerequisites

Make sure the following are installed:

- JDK 21
- Node.js 20 or later
- Docker
- Git

### Start the Backend

Open a terminal and run:

```bash
cd backend
docker compose up -d
./mvnw spring-boot:run
```

On Windows, you can use:

```bash
cd backend
docker compose up -d
mvnw.cmd spring-boot:run
```

The Spring Boot backend runs on:

`http://localhost:8080`

### Start the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

`http://localhost:5173`

The frontend is configured to communicate with the backend running on port `8080`.

## Supporting Services

The project uses Docker for supporting services.

| Service | Address |
|---------|---------|
| Keycloak | `http://localhost:9090` |
| Adminer | `http://localhost:8888` |
| PostgreSQL | `localhost:5432` |

## Database

PostgreSQL is used as the primary database for the application.

Adminer can be used as a web-based interface for managing the database:

`http://localhost:8888`

Database credentials should be provided through environment variables or local configuration and should not be committed to the repository.

## Authentication

The application uses Keycloak for authentication and authorization.

The required Keycloak configuration is:

- **Realm:** `event-ticket-platform`
- **Client:** `event-ticket-platform-app`

These values should match the authentication configuration used by the backend and frontend.

The backend uses OAuth2/OIDC configuration to validate authenticated requests.

## Ticket Validation

Tickets can be validated at the event using QR codes.

The validation flow includes:

1. Identifying the ticket.
2. Checking the ticket status.
3. Validating the ticket for the event.
4. Preventing invalid or previously used tickets from being accepted.

## API

The Spring Boot backend exposes REST APIs for the main application operations.

The API is organized around resources such as:

- Events
- Ticket Types
- Tickets
- Published Events
- Ticket Validation
- Users

The backend runs on port `8080` during local development.

## Testing

The backend contains a test structure under:

```text
backend/src/test/
```

H2 can be used for isolated database testing without requiring a separate PostgreSQL instance.

To run the backend tests:

```bash
cd backend
./mvnw test
```

On Windows:

```bash
mvnw.cmd test
```

## Project Configuration

Before running the application, make sure that:

- PostgreSQL is available.
- Keycloak is running.
- The required Keycloak realm and client are configured.
- Backend authentication settings match the Keycloak configuration.
- Frontend authentication settings match the configured Keycloak client.

Do not commit passwords, API keys, tokens, or other sensitive credentials to GitHub.

## Compatibility

The project currently uses:

- Java 21
- Spring Boot 3.4.4
- Node.js 20+

Using different versions may require dependency or configuration changes.

## Future Improvements

Possible improvements for the project include:

- Payment gateway integration
- Improved event search and filtering
- Sales analytics and reporting
- Email notifications
- More comprehensive automated tests
- Improved ticket management
- Additional frontend validation
- Production deployment configuration

## License

This project is intended for learning and development purposes.
