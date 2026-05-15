from fastapi import APIRouter, HTTPException
from database import users_collection
from models.user import UserRegister, UserLogin
from config import hash_password, verify_password, create_token
from bson import ObjectId

router = APIRouter()

@router.post("/register")
async def register(user: UserRegister):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password)
    }
    result = await users_collection.insert_one(new_user)
    token = create_token({"user_id": str(result.inserted_id)})
    return {"token": token, "name": user.name, "email": user.email}

@router.post("/login")
async def login(user: UserLogin):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_token({"user_id": str(db_user["_id"])})
    return {"token": token, "name": db_user["name"], "email": db_user["email"]}