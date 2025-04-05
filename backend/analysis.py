import os
import json
import requests
from groq import Groq
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def fetch_book(book_id: int) -> str:
    base_url = f"https://www.gutenberg.org/files/{book_id}/"
    possible_suffixes = [
        f"{book_id}-0.txt",
        f"{book_id}.txt",
        f"{book_id}.txt.utf-8",
        f"{book_id}-8.txt",
        f"{book_id}-0.txt.utf-8",
    ]

    for suffix in possible_suffixes:
        url = base_url + suffix
        response = requests.get(url)
        if response.status_code == 200:
            return response.text

    raise HTTPException(status_code=404, detail="Book text not found")

def analyze_book(book_id: int):
    text = fetch_book(book_id)[:10000]

    system_message = {
        "role": "system",
        "content": (
            "You are a helpful assistant. Extract all characters from a book and identify their interactions. "
            "Also include 1–2 key quotes per interaction with brief sentiment labels (positive, negative, neutral). "
            "Return strictly JSON:\n\n"
            "{\n"
            '  "nodes": [{"id": "Character1"}, {"id": "Character2"}],\n'
            '  "edges": [{"source": "A", "target": "B", "weight": 3, "quotes": ["..."], "sentiment": "positive"}]\n'
            "}\n"
            "Do not include any explanation or markdown."
        )
    }


    user_message = {
        "role": "user",
        "content": f"Analyze this book:\n{text}"
    }

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[system_message, user_message],
        temperature=0.5,
        max_completion_tokens=1024,
        top_p=1,
        stream=False,
    )

    try:
        content = response.choices[0].message.content
        parsed = eval(content)
        return parsed #json.loads(response.choices[0].message.content.strip())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"JSON parsing failed: {str(e)}")
