from fastapi import APIRouter
from pydantic import BaseModel
from ai.agent import get_ai_response

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    history: list = []

@router.post("/")
async def chat(request: ChatRequest):
    response = get_ai_response(request.message, request.history)
    return {"response": response}