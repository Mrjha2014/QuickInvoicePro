
# API Documentation

## Base URL

`http://localhost:3001/api`

*Note: Replace `localhost:3001` with your production server address if applicable.*

## Authentication

Most endpoints require a valid JWT token, provided in the request header:

```
Authorization: Bearer [Your JWT Token]
```

## Endpoints

### User Endpoints

#### Register User

- **POST** `/users/register`
- **Body**:
  - `username`
  - `email`
  - `password`
- **Description**: Register a new user.

#### Login User

- **POST** `/users/login`
- **Body**:
  - `email`
  - `password`
- **Description**: Authenticate a user and return a JWT token.

### Product Endpoints

#### Create Product

- **POST** `/products`
- **Headers**:
  - `Authorization: Bearer [JWT Token]`
- **Body**: Product details (JSON)
- **Description**: Create a new product for the user's company.

#### Get All Products

- **GET** `/products`
- **Headers**:
  - `Authorization: Bearer [JWT Token]`
- **Description**: Retrieve all products for the user's company.

#### Search Products

- **GET** `/products/search`
- **Headers**:
  - `Authorization: Bearer [JWT Token]`
- **Query Parameters**:
  - `name`
  - `category`
  - `sku`
- **Description**: Search for products by name, category, or SKU.

### Company Endpoints

#### Create Company

- **POST** `/companies`
- **Body**: Company details (JSON)
- **Description**: Create a new company.

### Customer Endpoints

#### Create Customer

- **POST** `/customers`
- **Headers**:
  - `Authorization: Bearer [JWT Token]`
- **Body**: Customer details (JSON)
- **Description**: Create a new customer for the user's company.

#### Search Customers

- **GET** `/customers/search`
- **Headers**:
  - `Authorization: Bearer [JWT Token]`
- **Query Parameters**:
  - `name`
  - `email`
  - `phone`
- **Description**: Search for customers by name, email, or phone number.

### Invoice Endpoints

#### Create Invoice

- **POST** `/invoices`
- **Headers**:
  - `Authorization: Bearer [JWT Token]`
- **Body**: Invoice details (JSON)
- **Description**: Create a new invoice for the user's company.

#### Get All Invoices

- **GET** `/invoices`
- **Headers**:
  - `Authorization: Bearer [JWT Token]`
- **Description**: Retrieve all invoices for the user's company.

## Error Handling

All endpoints return appropriate HTTP status codes. In case of an error, a JSON response with the `message` field is provided.

## .env Setup

For local development and production environments, set up your `.env` file with the following variables:

- `PORT`: The port number your server will listen on (e.g., 3001).
- `MONGODB_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A secret key for JWT token encryption.

## Deployment Instructions

To deploy your app, follow these steps:

1. Ensure all dependencies are installed by running `npm install`.
2. Set up your `.env` file with the necessary environment variables.
3. For production, consider using a process manager like PM2 for better performance and reliability.
4. Deploy your application to a cloud provider like Heroku, AWS, or a similar service.

## Additional Configuration

### Database Configuration

- `DB_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/yourdbname`).
- `JWT_SECRET`: A secret key for JWT token encryption (can be any string).

### App Configuration

- `PORT`: The port number your server will listen on (e.g., 3000).
- `DEBUG`: Set to `true` for development to enable debug mode.
- `SECRET_KEY`: A secret key for your application (can be any string, used for session cookies or similar).
