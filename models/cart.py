from pydantic import BaseModel

class CartItem(BaseModel):
    product_id: str
    quantity: int

class CartResponse(BaseModel):
    product_id: str
    name: str
    price: float
    quantity: int
    total: float