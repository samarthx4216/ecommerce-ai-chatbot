# 🛍️ E-Commerce AI Chatbot

A full-stack e-commerce web application with an integrated AI shopping assistant.

## 🚀 Tech Stack

**Frontend:** React.js, Axios, React Router  
**Backend:** FastAPI (Python), JWT Authentication  
**Database:** MongoDB (Motor async driver)  
**AI:** Integrated AI Chatbot for shopping assistance  

## ✨ Features

- 🔐 User Registration & Login (JWT Auth)
- 🛒 Product Listing & Cart System
- 🤖 AI Chatbot Assistant
- 📱 Responsive Dark UI Design

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/samarthx4216/ecommerce-ai-chatbot.git
cd ecommerce-ai-chatbot
```

### 2. Backend Setup
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` folder:
```
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=ecommerce_ai
SECRET_KEY=your-secret-key
```

Run the backend:
```bash
uvicorn main:app --reload --port 8000
```

### 3. Seed the database
```bash
python seed_products.py
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/products | Get all products |
| POST | /api/cart | Add to cart |
| POST | /api/chat | AI Chatbot |

## 📸 Screenshots

> Home page with product listings and AI chatbot

## 📄 License

MIT License
