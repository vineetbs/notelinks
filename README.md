# NoteLinks

A minimalist link‑saving and sharing app built with Vite, React and a Node.js backend.

## Features

- User signup and login (JWT-based)  
- Save, view and organize your links  
- Share link collections via dashboard  
- Fast, responsive UI with Tailwind CSS  

## Tech Stack

- **Frontend**: Vite · React · TypeScript · React Router · Tailwind CSS · lucide-react  
- **Backend**: Node.js · Express · MongoDB  
- **Auth**: JWT stored in localStorage


###API Endpoints

- Base URL: http://localhost:3000/api
- POST /auth/signup – register new user
- POST /auth/signin – login and receive JWT
- GET /links – retrieve user’s saved links
- POST /links – save a new link


