import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BACKEND_URL;

export default function InputForm({ onResult, onText, setLoadingText, clear }: any) {
  const [bookId, setBookId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE_URL}/analyze/${bookId}`);
      onResult(res.data);
      /**
      onResult({
        "nodes": [
            {
                "id": "Project Gutenberg"
            },
            {
                "id": "Michael S. Hart"
            },
            {
                "id": "Charles B. Kramer"
            },
            {
                "id": "United States"
            }
        ],
        "edges": [
            {
                "source": "Project Gutenberg",
                "target": "Michael S. Hart",
                "weight": 2,
                "quotes": [
                    "To create these etexts, the Project expends considerable efforts to identify, transcribe and proofread public domain works."
                ],
                "sentiment": "neutral"
            },
            {
                "source": "Project Gutenberg",
                "target": "Charles B. Kramer",
                "weight": 1,
                "quotes": [
                    "This 'Small Print!' by Charles B. Kramer, Attorney"
                ],
                "sentiment": "neutral"
            },
            {
                "source": "Project Gutenberg",
                "target": "United States",
                "weight": 1,
                "quotes": [
                    "The United States Declaration of Independence was the first Etext released by Project Gutenberg, early in 1971."
                ],
                "sentiment": "neutral"
            },
            {
                "source": "Michael S. Hart",
                "target": "Project Gutenberg",
                "weight": 2,
                "quotes": [
                    "The Project Gutenberg Etext of The Declaration of Independence."
                ],
                "sentiment": "neutral"
            }
        ]
    });
     */
    } catch (err) {
      setError("Failed to analyze book. Check the Book ID or server status.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookText = async () => {
    setLoadingText(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE_URL}/book/${bookId}`);
      onText(res.data.text);
    } catch (err) {
      setError("Failed to fetch book text.");
      console.error("Error fetching book text:", err);
    } finally {
      setLoadingText(false);
    }
  };

  const onClear = async() => {
    setBookId("");
    clear();
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        placeholder="Enter Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />
      <button onClick={fetchData} disabled={loading} style={{ marginLeft: "8px" }}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      <button onClick={fetchBookText} disabled={loading} style={{ marginLeft: "8px" }}>
        Show Book Text
      </button>
      <button onClick={onClear} style={{ marginLeft: "8px" }}>Clear</button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
}
