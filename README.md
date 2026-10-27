# Threadbase - Upload Server

Express server with authenticated image uploads using multer.

## Setup

```bash
cp .env.example .env
npm install
npm start        # http://localhost:3001
```

## Get a token

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"ada","password":"password"}'
```

The demo credentials are `ada` / `password`. Copy the returned `token` and send it as a bearer token.

## Upload an image

Send a `POST /api/upload` request using `multipart/form-data`. The file field must be named `avatar`; supported image types are JPEG, PNG, GIF, and WebP, up to 5 MB.

```bash
curl -X POST http://localhost:3001/api/upload \
  -H "Authorization: Bearer <token>" \
  -F "avatar=@./avatar.png"
```

On success, the server returns `201` with a `url`, for example `/uploads/<generated-filename>.png`. Open `http://localhost:3001<url>` to view the uploaded image. Missing/invalid tokens and invalid uploads return `401` and `400`, respectively.

Uploaded files are stored in `uploads/`, which is excluded from version control.
