# Backend 2: Admin Management and Audit API

## Overview

This project implements Backend 2, which is responsible for managing admin-related operations and interacting with Backend 1 to fetch audit logs. It includes authentication for admin users, JWT-based authorization, and role-based access control.

---

## Prerequisites

1. Node.js (v16+ recommended)
2. MongoDB (running instance or MongoDB Atlas account)
3. Postman or similar tool for API testing

---

## Setup Instructions

### 1. Clone the Repository

bash
git clone <repository_url>
cd backend2


### 2. Install Dependencies

bash
npm install


### 3. Environment Variables

Create a .env file in the root directory and add the following variables:

env
PORT=5001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database_name>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
BACKEND1_URL=http://localhost:5000


Replace <username>, <password>, and <database_name> with your MongoDB credentials. Update BACKEND1_URL if Backend 1 runs on a different host or port.

### 4. Start the Server

bash
npm start


The server will run at http://localhost:5001.

---

## Folder Structure


backend2/
|-- controllers/
|   |-- authController.js      # Handles admin authentication logic
|   |-- adminController.js     # Handles admin-specific operations
|
|-- middleware/
|   |-- authMiddleware.js      # Handles JWT verification and role-based access control
|
|-- models/
|   |-- User.js                # MongoDB model for users (including admin)
|
|-- routes/
|   |-- authRoutes.js          # Authentication-related routes
|   |-- adminRoutes.js         # Admin-related routes
|
|-- .env                       # Environment variables (not included in repo)
|-- server.js                  # Entry point of the application


---

## API Endpoints

### Authentication Endpoints

#### *POST /auth/login*

- *Description*: Authenticates an admin and generates a JWT.
- *Body*:
  json
  {
    "email": "string",
    "password": "string"
  }
  
- *Response*:
  json
  {
    "token": "JWT_TOKEN"
  }
  

### Admin Endpoints

#### *GET /users*

- *Description*: Fetch all users (admin-only access).
- *Headers*:
  json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  
- *Response*:
  json
  [
    {
      "_id": "string",
      "name": "string",
      "email": "string",
      "role": "number"
    }
  ]
  

#### *GET /users/*:id**

- *Description*: Fetch details of a single user by their ID (admin-only access).
- *Headers*:
  json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  
- *Response*:
  json
  {
    "_id": "string",
    "name": "string",
    "email": "string",
    "role": "number"
  }
  

#### *DELETE /users/*:id**

- *Description*: Delete a user by their ID (admin-only access).
- *Headers*:
  json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  
- *Response*:
  json
  {
    "message": "User deleted successfully."
  }
  

#### *GET /audit/notes*

- *Description*: Fetch audit logs or notes from Backend 1 (admin-only access).

- *Headers*:

  json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  

- *Response* (Sample if notes are found):

  json
  [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "createdBy": "string",
      "createdAt": "string"
    }
  ]
  

- *Response* (If no notes are found):

  json
  {
    "message": "No audit logs found."
  }
  

---

## Testing

You can use Postman or a similar tool to test the API endpoints. Ensure you:

1. Log in as an admin to obtain a JWT.
2. Include the JWT in the Authorization header for all subsequent requests.
3. Test interaction with Backend 1 by ensuring Backend 1 is running and accessible.

---

## Error Handling

Common errors include:

- *401 Unauthorized*: Missing or invalid JWT.
- *403 Forbidden*: Insufficient permissions.
- *500 Internal Server Error*: Server-side issues or database connection errors.

---

## Future Enhancements

1. Add comprehensive logging for better debugging.
2. Implement advanced filtering and sorting for user and audit logs.
3. Introduce a UI for admin operations.
4. Improve inter-backend communication with retries and circuit breakers.

---

## License

This project is licensed under the MIT License.
