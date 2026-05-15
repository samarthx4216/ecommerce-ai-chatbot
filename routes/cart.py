from fastapi import APIRouter, HTTPException, Header
from database import cart_collection, products_collection
from models.cart import CartItem
from config import decode_token
from bson import ObjectId

router = APIRouter()

async def get_user_id(authorization: str):
    token = authorization.replace("Bearer ", "")
    data = decode_token(token)
    return data["user_id"]

@router.get("/")
async def get_cart(authorization: str = Header(...)):
    user_id = await get_user_id(authorization)
    items = []
    async for item in cart_collection.find({"user_id": user_id}):
        product = await products_collection.find_one(
            {"_id": ObjectId(item["product_id"])}
        )
        if product:
            items.append({
                "product_id": item["product_id"],
                "name": product["name"],
                "price": product["price"],
                "quantity": item["quantity"],
                "total": product["price"] * item["quantity"]
            })
    return items

@router.post("/add")
async def add_to_cart(item: CartItem, authorization: str = Header(...)):
    user_id = await get_user_id(authorization)
    existing = await cart_collection.find_one({
        "user_id": user_id,
        "product_id": item.product_id
    })
    if existing:
        await cart_collection.update_one(
            {"user_id": user_id, "product_id": item.product_id},
            {"$inc": {"quantity": item.quantity}}
        )
    else:
        await cart_collection.insert_one({
            "user_id": user_id,
            "product_id": item.product_id,
            "quantity": item.quantity
        })
    return {"message": "Added to cart"}

@router.delete("/remove/{product_id}")
async def remove_from_cart(product_id: str, authorization: str = Header(...)):
    user_id = await get_user_id(authorization)
    await cart_collection.delete_one({
        "user_id": user_id,
        "product_id": product_id
    })
    return {"message": "Removed from cart"}