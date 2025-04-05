# 📚book-analyzer : Project Gutenberg Character Analyzer

An interactive single-page app that downloads books from [Project Gutenberg](https://www.gutenberg.org), analyzes them with an LLM, and visualizes character interactions using a force-directed graph.

---

## 🔗 Live Demo

- **Frontend (Vercel)**: [https://book-analyzer-psi.vercel.app/](https://book-analyzer-psi.vercel.app/)
- **Backend (Fly.io)**: [https://backend-thrumming-water-3615.fly.dev](https://backend-thrumming-water-3615.fly.dev)

---

## ✨ Features

- 🔎 Input any Project Gutenberg Book ID
- 📥 Download full text from Gutenberg
- 🧠 Analyze characters and interactions using OpenAI GPT
- 🌐 Visualize interactions as a force-directed graph
- 📖 View full book text on demand
- 💻 Fully dockerized backend with FastAPI
- 🎨 Frontend built in React + TypeScript + plain CSS

---

## 🚀 Tech Stack

### Frontend
- React + Vite + TypeScript
- Plain CSS (no Tailwind)
- [react-force-graph](https://github.com/vasturiano/react-force-graph)

### Backend
- FastAPI + Python
- OpenAI GPT API (for character extraction)
- Fly.io for deployment
- Dockerized and CORS-enabled

---

## 🧪 How to Run Locally

### 🔧 1. Clone the repo
```bash
git clone https://github.com/yourusername/gutenberg-analyzer.git
cd gutenberg-analyzer
```

### ⚙️ 2. Backend (FastAPI)
```bash
cd backend
cp .env.example .env  # add your OpenAI API key
docker build -t gutenberg-backend .
docker run -p 8000:8000 --env-file .env gutenberg-backend
```
Make sure your .env contains:
```bash
OPENAI_API_KEY=your_openai_key_here
```

### 💻 3. Frontend (React)
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

In .env:
```bash
VITE_API_BACKEND_URL=http://localhost:8000
```

### ☁️ Deployment
### 🔵 Backend (Fly.io)
```bash
cd backend
fly launch  # follow prompts
fly secrets set OPENAI_API_KEY=your_openai_key_here
fly deploy
```

### 🟢 Frontend (Vercel)
- Push frontend to GitHub

- Go to https://vercel.com

- Import your repo

- Add environment variable:
```bash
VITE_API_BACKEND_URL=https://your-backend.fly.dev
```
- Click Deploy 🎉


### 📷 Preview
- Normal input
<img width="899" alt="Screenshot 2025-04-05 at 6 36 38 AM" src="https://github.com/user-attachments/assets/c6d9ae2b-911d-4b60-ad56-d86b637a9e61" />

- Error States
<img width="905" alt="Screenshot 2025-04-05 at 6 37 07 AM" src="https://github.com/user-attachments/assets/386ca2ac-a784-4c5e-8564-e42aab6a44c4" />

- Analyzed text sith graph
- 

### 🧠 Future Enhancements
- Show interaction weights and sentiment with color/thickness

- Save/share analyzed books

- Support multi-book comparison

- Search by author/title with autocomplete

### 📜 License
MIT © 2025

