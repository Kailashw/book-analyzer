import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from analysis import analyze_book

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/book/{book_id}")
def get_book_text(book_id: int):
    url = f"https://www.gutenberg.org/files/{book_id}/{book_id}-0.txt"
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="Book not found")
    
    text = response.text
    return JSONResponse(content={"book_id": book_id, "text": text})

@app.get("/analyze/{book_id}")
def analyze(book_id: int):
    try:
        result = analyze_book(book_id)
        return result
    except Exception as e:
        print(f"[ERROR] Failed to analyze book {book_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/health")
def health():
    return {"status": "ok"}
