# WebDev Blog Application

A full-stack blog platform built with React, Redux, Express, MongoDB and Node.js.

## Overview

This repository contains a modern blog application with:
- user authentication and registration
- article creation, editing, deletion, and viewing
- image upload support
- markdown-enabled post content
- tag filtering and recent tag retrieval

The project is split into two parts:
- `client/` — React front-end application
- `server/` — Express API backend with MongoDB persistence

## Features

- JWT-based authentication
- Secure routes for creating, editing and deleting posts
- File uploads using `multer`
- Client-side routing with React Router v6
- Redux Toolkit state management
- Rich text editing with Markdown support
- Automatic post validation on the server

## Tech Stack

- Frontend: React, React Router, Redux Toolkit, React Hook Form, Material UI, Sass
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, multer
- Dev Tools: nodemon, eslint, prettier

## Getting Started

### Prerequisites

- Node.js 18+ or compatible version
- npm
- MongoDB database or MongoDB Atlas cluster

### Install Dependencies

Install both backend and frontend dependencies from the repository root:

```bash
cd c:\Users\smedh\WebDev
npm install
cd client
npm install
```

### Configure Environment

The backend currently contains a hardcoded MongoDB connection string in `server/index.js`.
For production use, replace that with an environment variable before deployment.

Example environment variables to add:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.example.mongodb.net/blog
JWT_SECRET=your_jwt_secret
PORT=4444
```

### Run the Application

From the project root, start the server:

```bash
npm run start
```

Then start the client from inside `client/`:

```bash
cd client
npm start
```

The React app runs by default on `http://localhost:3000` and the API runs on `http://localhost:4444`.

## Server API Endpoints

- `POST /auth/register` — register a new user
- `POST /auth/login` — authenticate and receive JWT
- `GET /auth/me` — get current user profile (requires auth)
- `POST /upload` — upload an image file (requires auth)
- `GET /posts` — list all posts
- `GET /posts/:id` — get a specific post
- `POST /posts` — create a new post (requires auth)
- `PATCH /posts/:id` — update a post (requires auth)
- `DELETE /posts/:id` — delete a post (requires auth)
- `GET /tags` — get recent tags
- `GET /posts/tags` — get recent tags

## Project Structure

```
client/
  src/
    components/
    pages/
    redux/
    App.js
    index.js
server/
  controllers/
  models/
  utils/
  validations.js
  index.js
```

## Notes

- The server uses port `4444` by default.
- Uploaded images are served from `/uploads`.
- Enhance security by moving secrets to `.env` and not committing them to source control.

## Recommended Improvements

- Add proper environment variable support for the backend
- Add root-level `README` or update `client/README` with client-specific instructions
- Add automated tests for both server and client
- Add production-ready build and deployment steps

## License

ISC
