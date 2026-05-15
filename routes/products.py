from fastapi import APIRouter, HTTPException
from database import products_collection
from models.product import Product
from bson import ObjectId

router = APIRouter()

def fix_id(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

@router.get("/")
async def get_products():
    products = []
    async for p in products_collection.find():
        products.append(fix_id(p))
    return products

@router.get("/{product_id}")
async def get_product(product_id: str):
    p = await products_collection.find_one({"_id": ObjectId(product_id)})
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return fix_id(p)

@router.post("/")
async def add_product(product: Product):
    result = await products_collection.insert_one(product.dict())
    return {"id": str(result.inserted_id), "message": "Product added"}

@router.delete("/{product_id}")
async def delete_product(product_id: str):
    await products_collection.delete_one({"_id": ObjectId(product_id)})
    return {"message": "Product deleted"}