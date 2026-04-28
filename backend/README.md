# Backend example (Express + Mongoose)

This folder is a minimal example backend showing how the frontend can interact with a MongoDB database via a secure server.

Quick start

```bash
cd backend
npm install
# copy .env.example to .env and fill MONGODB_URI and JWT_SECRET
npm run dev
```

Endpoints

- `GET /health` - health check
- `POST /api/auth/register` - register { email, password, name }
- `POST /api/auth/login` - login { email, password } -> returns `{ token }`
- `GET /api/posts` - list posts
- `POST /api/posts` - create post (Authorization: Bearer <token>)

Notes

- This is intentionally minimal. For production you'll want better validation, rate limiting, secure secrets storage, HTTPS, and proper session/auth handling.
