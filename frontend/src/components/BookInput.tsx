import { useState } from "react";

interface BookInputProps {
  onAnalyze: (data: any) => void;
}

export default function BookInput({ onAnalyze }: BookInputProps) {
  const [bookId, setBookId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId) return;

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/analyze/${bookId}`);
      const data = await res.json();
      onAnalyze(data);
    } catch (err) {
      alert("Error fetching book analysis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Gutenberg Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </form>
  );
}
