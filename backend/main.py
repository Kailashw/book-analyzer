from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from analysis import fetch_book, analyze_book

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # safe in Docker monolith
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/analyze/{book_id}")
def analyze(book_id: int):
    return JSONResponse(content=analyze_book(book_id))

@app.get("/book/{book_id}")
def get_book(book_id: int):
    return JSONResponse(content={"book_id": book_id, "text": fetch_book(book_id)})

