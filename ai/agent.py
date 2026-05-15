import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """You are a helpful ecommerce assistant for our online store.
You help customers with:
- Finding products
- Answering product questions  
- Cart assistance
- Order information
- General shopping help

Always be friendly, helpful and concise.
If asked about products, suggest relevant items from our store.
"""

def get_ai_response(user_message: str, chat_history: list = []) -> str:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    
    for msg in chat_history[-6:]:
        messages.append(msg)
    
    messages.append({"role": "user", "content": user_message})
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        temperature=0.7,
        max_tokens=500,
    )
    
    return response.choices[0].message.content