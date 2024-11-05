markdown
# Rent-a-Tool

This project is a rental service application that allows users to rent equipment like tents and tools. The application is built with Node.js, TypeScript, Express, and PostgreSQL.

## Prerequisites

- Node.js (v14 or above)
- PostgreSQL (Server)
- npm (v6 or above)

## Getting Started

### Setting Up PostgreSQL Database

1. Open PostgreSQL command line or pgAdmin.
2. Run the following commands to set up the database and user:

```sql
-- Create the database
CREATE DATABASE rent_a_tool;

-- Create the user
CREATE USER rent_admin WITH PASSWORD 'yourpassword';

-- Set role attributes
ALTER ROLE rent_admin SET client_encoding TO 'utf8';
ALTER ROLE rent_admin SET default_transaction_isolation TO 'read committed';
ALTER ROLE rent_admin SET timezone TO 'UTC';

-- Following commands are only for local setup; do not run following command on remote server! 
-- Grant privileges on the database
GRANT ALL PRIVILEGES ON DATABASE rent_a_tool TO rent_admin;

-- Grant all privileges on the public schema to your user
GRANT ALL PRIVILEGES ON SCHEMA public TO rent_admin;

-- Grant all privileges on all tables in the public schema to your user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO rent_admin;

-- Grant all privileges on all sequences in the public schema to your user
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO rent_admin;

-- Grant all privileges on all functions in the public schema to your user
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO rent_admin;
```

### Installing Dependencies
Clone the repository and install the dependencies:

```bash
git clone https://github.com/rohanbane/rent-a-tool.git
cd rent-a-tool
npm install
```

### Environment Variables
Create a .env file in the root directory and add the following environment variables:

```.env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=rent_admin
DB_PASSWORD=yourpassword
DB_DATABASE=rent_a_tool
JWT_SECRET=your_jwt_secret_key
```
## Running the Application
To start the application, you can use the following npm scripts:

### For development (with nodemon):

```bash
npm run dev-start
```
### For production:
#### Build the TypeScript code:

```bash
npm run build
```

#### Start the server:

```bash
npm run start
```

### Swagger API Documentation
You can access the Swagger API documentation at http://localhost:3000/api-docs.

### Health Check Endpoint
You can verify the health of the application by accessing http://localhost:3000/health.

### Available Endpoints
#### Authentication
- Register: POST /auth/register
- Login: POST /auth/login

#### Products
- Add Product: POST /products
- Get Products: GET /products
- Update Product: PUT /products/:id
- Delete Product: DELETE /products/:id

## Disclaimer
This application is currently in development. Only the authentication and product management functionalities are implemented.