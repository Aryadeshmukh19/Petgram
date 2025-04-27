# Petgram
🐾 PetGram — A Social Media Platform for Pets.

PetGram is a full-stack web application where pets are the real influencers!

Users can register, log in, share adorable moments of their pets, like and comment on posts, and explore a beautiful pet community.

📋 Features
User Registration and Login (FastAPI backend)

Share pet photos with cute captions

Like and Comment functionality

Beautiful Instagram-style dark UI

Mobile Responsive Design

Dark Mode toggle

Local file uploads using FastAPI

SQLite database integration

Real-time Post Interaction (Likes & Comments)

Pet-themed animations and UI elements

🚀 Tech Stack

Frontend	Backend	Database
React.js	FastAPI	SQLite
Axios (for API calls)	Uvicorn (ASGI Server)	
📁 Project Structure
pgsql
Copy
Edit
petgram/
├── backend/
│   ├── main.py          # FastAPI backend server
│   └── uploads/         # Uploaded images
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── styles/
│   │   │   ├── Home.css
│   │   │   ├── Login.css
│   │   │   └── Register.css
│   │   └── App.js
│   └── package.json
├── README.md
└── requirements.txt
🛠️ How to Run Locally
Backend (FastAPI)
Move into backend folder:

bash
Copy
Edit
cd backend
Create a virtual environment and activate:

bash
Copy
Edit
python -m venv venv
venv\Scripts\activate  # (Windows)
Install dependencies:

bash
Copy
Edit
pip install fastapi uvicorn python-multipart
Run the server:

bash
Copy
Edit
uvicorn main:app --reload
Backend will start on: http://127.0.0.1:8000

Frontend (React)
Move into frontend folder:

bash
Copy
Edit
cd frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the frontend:

bash
Copy
Edit
npm start
Frontend will start on: http://localhost:3000

🌟 Future Scope

Pet profiles with followers and badges 🐾

Direct messaging between users

Explore trending pet hashtags

Push notifications for likes/comments

Admin dashboard for content moderation

Deploy on cloud (e.g., Vercel + Render)

💖 Acknowledgments

ReactJS Documentation

FastAPI Documentation

Unsplash, Placekitten for demo images

Built with 🐾 and lots of ❤️ — PetGram Team
