import { useState } from "react";
import BookInput from "./components/BookInput"
import CharacterGraph from "./components/CharacterGraph"
import "./index.css";

interface Interaction {
  from: string;
  to: string;
  type: string;
}

interface AnalysisResult {
  characters: string[];
  interactions: Interaction[];
}

function App() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  return (
    <div className="container">
      <h1>Project Gutenberg Character Analyzer</h1>
      <BookInput onAnalyze={setAnalysis} />

      {analysis && (
        <>
          <h2>Characters</h2>
          <ul>
            {analysis.characters.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>

          <h2>Character Interactions</h2>
          <ul>
            {analysis.interactions.map((itx, i) => (
              <li key={i}>{itx.from} → {itx.to} ({itx.type})</li>
            ))}
          </ul>

          <h2>Graph View</h2>
          <CharacterGraph
            characters={analysis.characters}
            interactions={analysis.interactions}
          />
        </>
      )}
    </div>
  );
}

export default App;
