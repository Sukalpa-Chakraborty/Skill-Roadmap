# Skill Roadmap Backend

This is the backend server for the Skill Roadmap application.

## Technologies Used

- Node.js
- Express.js
- SQLite Database
- CORS for cross-origin requests

## Setup Instructions

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   
   Or for development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

- `GET /` - Health check endpoint
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID
- `POST /api/chat-messages` - Save a chat message
- `GET /api/chat-messages/:userId` - Get chat messages for a user
- `POST /api/roadmaps` - Save a roadmap
- `GET /api/roadmaps/:userId` - Get roadmaps for a user
- `POST /api/portfolios` - Save a portfolio
- `GET /api/portfolios/:userId` - Get portfolios for a user

## Database Schema

The backend uses SQLite with the following tables:

1. `users` - Stores user profiles
2. `chat_messages` - Stores chat conversations
3. `roadmaps` - Stores generated roadmaps
4. `portfolios` - Stores generated portfolios

The database file (`database.db`) will be created automatically when the server starts.