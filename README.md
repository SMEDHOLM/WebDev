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

### Run the Application Locally

Set `MONGO_URI` and `JWT_SECRET` in the server terminal, then start the server from the project root:

```powershell
$env:MONGO_URI="your MongoDB Atlas connection string"
$env:JWT_SECRET="your long random secret"
npm start --prefix server
```

In a second terminal, start the client:

```powershell
npm start --prefix client
```

The React app runs by default on `http://localhost:3000` and the API runs on `http://localhost:4444`.

The server requires `MONGO_URI` and `JWT_SECRET` environment variables. Set them in your local shell or in a `server/.env` file loaded by your chosen environment loader. Never commit real credentials.

### Deploy to Render

Deploy the backend and frontend as two Render services connected to this repository:

1. Create a **Web Service** with root directory `server`, build command `npm install`, and start command `npm start`. Set `MONGO_URI` to your MongoDB Atlas connection string and `JWT_SECRET` to a long, random secret in the Render environment settings. Render supplies `PORT` automatically.
2. In MongoDB Atlas, allow network access from your Render service. For a quick setup, Atlas permits `0.0.0.0/0`; use strong database credentials and least-privilege access.
3. Create a **Static Site** with root directory `client`, build command `npm install && npm run build`, and publish directory `build`. Set `REACT_APP_API_URL` to the deployed backend URL (for example, `https://your-api.onrender.com`) before deploying the site.
4. The backend health check is available at `/health`.

The current image upload implementation writes to the server's local `uploads` directory. Render's local filesystem is ephemeral, so uploaded images can disappear on redeploy or restart. Use a Render persistent disk or external object storage if uploaded images need to persist.

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
- Uploaded images are served under `/uploads` (new uploads use `/uploads/covers`).
- Enhance security by moving secrets to `.env` and not committing them to source control.

## Recommended Improvements

- Add proper environment variable support for the backend
- Add root-level `README` or update `client/README` with client-specific instructions
- Add automated tests for both server and client
- Add production-ready build and deployment steps

## License

ISC
