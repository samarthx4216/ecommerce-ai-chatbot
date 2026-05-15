import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = AsyncIOMotorClient(MONGODB_URL)
db = client[DATABASE_NAME]
products_collection = db["products"]

sample_products = [
    {
        "name": "Wireless Bluetooth Headphones",
        "description": "Premium sound quality with noise cancellation and 30hr battery life.",
        "price": 2999.99,
        "category": "Electronics",
        "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        "stock": 50
    },
    {
        "name": "Smartphone Stand",
        "description": "Adjustable aluminum stand for phones and tablets. Foldable and portable.",
        "price": 499.99,
        "category": "Accessories",
        "image_url": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
        "stock": 100
    },
    {
        "name": "Mechanical Keyboard",
        "description": "RGB backlit mechanical keyboard with tactile switches. Perfect for gaming and typing.",
        "price": 3499.99,
        "category": "Electronics",
        "image_url": "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
        "stock": 30
    },
    {
        "name": "Running Shoes",
        "description": "Lightweight and breathable running shoes with cushioned sole for maximum comfort.",
        "price": 1999.99,
        "category": "Footwear",
        "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        "stock": 75
    },
    {
        "name": "Stainless Steel Water Bottle",
        "description": "Double-walled insulated bottle keeps drinks cold 24hrs and hot 12hrs. 1 litre.",
        "price": 799.99,
        "category": "Lifestyle",
        "image_url": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
        "stock": 200
    },
    {
        "name": "Laptop Backpack",
        "description": "Water-resistant backpack with USB charging port. Fits up to 15.6 inch laptop.",
        "price": 1499.99,
        "category": "Bags",
        "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
        "stock": 60
    },
    {
        "name": "Wireless Mouse",
        "description": "Ergonomic wireless mouse with silent click, 12 month battery life.",
        "price": 899.99,
        "category": "Electronics",
        "image_url": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
        "stock": 80
    },
    {
        "name": "Smartwatch",
        "description": "Fitness tracker with heart rate monitor, GPS, and 7 day battery. Water resistant.",
        "price": 5999.99,
        "category": "Electronics",
        "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        "stock": 40
    },
]

async def seed():
    # Clear existing products
    await products_collection.delete_many({})
    print("🗑️  Purane products delete kiye.")

    # Insert new products
    result = await products_collection.insert_many(sample_products)
    print(f"✅  {len(result.inserted_ids)} products successfully add ho gaye!")

if __name__ == "__main__":
    asyncio.run(seed())