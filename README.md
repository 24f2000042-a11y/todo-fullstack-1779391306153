# Todo App - Modern Blue

A full-stack todo application with a beautiful modern blue theme.

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Responsive design
- Modern UI with smooth animations
- Loading states and error handling

## Tech Stack

### Frontend
- React 18
- Vite
- Axios
- React Icons

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- CORS

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   bash
   cd backend
   

2. Install dependencies:
   bash
   npm install
   

3. Create a `.env` file from the example:
   bash
   cp .env.example .env
   

4. Update the `.env` file with your MongoDB connection string.

5. Start the server:
   bash
   npm start
   

   The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   bash
   cd frontend
   

2. Install dependencies:
   bash
   npm install
   

3. Create a `.env` file:
   bash
   echo "VITE_API_URL=http://localhost:5000" > .env
   

4. Start the development server:
   bash
   npm run dev
   

   The app will run on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |

## MongoDB Setup

You can use MongoDB locally or MongoDB Atlas.

### Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use the connection string: `mongodb://localhost:27017/todoapp`

### MongoDB Atlas

1. Create a cluster on MongoDB Atlas
2. Get your connection string
3. Update the `MONGO_URI` in your `.env` file

## Project Structure


./
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── backend/
    ├── server.js
    ├── package.json
    └── .env.example


## License

MIT