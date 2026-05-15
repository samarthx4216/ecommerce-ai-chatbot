from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image_url: Optional[str] = ""
    stock: int = 0

class ProductResponse(BaseModel):
    id: str
    name: str
    description: str
    price: float
    category: str
    image_url: Optional[str] = ""
    stock: int