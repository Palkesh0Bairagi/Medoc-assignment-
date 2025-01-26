# Backend 1: User Notes Management API

## Overview

This project implements Backend 1 of a multi-backend architecture. Backend 1 provides APIs to manage user notes. It supports user authentication and CRUD operations for notes.

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
cd backend1


### 2. Install Dependencies

bash
npm install


### 3. Environment Variables

Create a .env file in the root directory and add the following variables:

env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database_name>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret


Replace <username>, <password>, and <database_name> with your MongoDB credentials.

### 4. Start the Server

bash
npm start


The server will run at http://localhost:5000.

---

## Folder Structure


backend1/
|-- controllers/
|   |-- authController.js     # Handles user authentication logic
|   |-- notesController.js    # Handles CRUD operations for notes
|
|-- middleware/
|   |-- authMiddleware.js     # Handles JWT verification and authentication
|
|-- models/
|   |-- Note.js               # MongoDB model for notes
|   |-- User.js               # MongoDB model for users
|
|-- routes/
|   |-- authRoutes.js         # Authentication-related routes
|   |-- noteRoutes.js         # Notes-related routes
|
|-- .env                      # Environment variables (not included in repo)
|-- server.js                 # Entry point of the application


---

## API Endpoints

### Authentication Endpoints

#### *POST /auth/register*

- *Description*: Registers a new user.
- *Body*:
  json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  
- *Response*:
  json
  {
    "message": "User registered successfully."
  }
  

#### *POST /auth/login*

- *Description*: Authenticates a user and generates a JWT.
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
  

### Notes Endpoints

#### *GET /user/notes*

- *Description*: Fetch all notes for the authenticated user.
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
      "title": "string",
      "content": "string",
      "createdBy": "string",
      "createdAt": "string"
    }
  ]
  

#### *GET /user/notes/\\\\\\\\**:id*

- *Description*: Fetch a single note by its ID.
- *Headers*:
  json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  
- *Response*:
  json
  {
    "_id": "string",
    "title": "string",
    "content": "string",
    "createdBy": "string",
    "createdAt": "string"
  }
  

#### *POST /user/notes*

- *Description*: Create a new note.
- *Headers*:
  json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  
- *Body*:
  json
  {
    "title": "string",
    "content": "string"
  }
  
- *Response*:
  json
  {
    "message": "Note created successfully."
  }
  

#### *PUT /user/notes/\\\\\\\\**:id*

- *Description*: Update a note by its ID.
- *Headers*:
  json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  
- *Body*:
  json
  {
    "title": "string",
    "content": "string"
  }
  
- *Response*:
  json
  {
    "message": "Note updated successfully."
  }
  

#### *DELETE /user/notes/\\\\\\\\**:id*

- *Description*: Delete a note by its ID.
- *Headers*:
  json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  
- *Response*:
  json
  {
    "message": "Note deleted successfully."
  }
  

---

## Testing

You can use Postman or a similar tool to test the API endpoints. Ensure you:

1. Register a user and log in to obtain a JWT.
2. Include the JWT in the Authorization header for all subsequent requests.

---

## Error Handling

Common errors include:

- *401 Unauthorized*: Missing or invalid JWT.
- *500 Internal Server Error*: Server-side issues or database connection errors.

---

## Future Enhancements

1. Add pagination for fetching notes.
2. Implement role-based access control.
3. Use a centralized error handling mechanism.

---

## License

This project is licensed under the MIT License.
