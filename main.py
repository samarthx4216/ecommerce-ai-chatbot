from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, products, cart, chatbot

app = FastAPI(title="Ecommerce AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,     prefix="/api/auth",     tags=["Auth"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(cart.router,     prefix="/api/cart",     tags=["Cart"])
app.include_router(chatbot.router,  prefix="/api/chat",     tags=["Chatbot"])

@app.get("/")
def root():
    return {"message": "Ecommerce AI API running"}