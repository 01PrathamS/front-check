## Authentication 

**Register**
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: {
  "message": "User registered successfully"
}
```

**Login** 
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
Response: { "token": "..." }
```

** this if for future we will pass token may be like this 
```
GET /protected
Authorization: Bearer <your_token>
```


# Welcome to your Lovable project

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

