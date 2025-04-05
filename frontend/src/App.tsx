import { useState } from "react";
import InputForm from "./components/InputForm";
import GraphView from "./components/GraphView";
import Spinner from "./components/Spinner";

function App() {
  const [data, setData] = useState(null);
  const [bookText, setBookText] = useState("");
  const [loadingText, setLoadingText] = useState(false);

  const clearState = () => {
    setData(null);
    setBookText("");
    setData(null);
    setLoadingText(false);
  };

  return (
    <div className="container">
      <h1>📚 Gutenberg Book Analyzer</h1>
      <InputForm
        onResult={setData}
        onText={setBookText}
        setLoadingText={setLoadingText}
        clear={clearState}
      />

      {loadingText && <Spinner />}

      {bookText && (
        <>
          <h2>📖 Book Text Preview</h2>
          <pre style={{ maxHeight: "200px", overflowY: "auto", whiteSpace: "pre-wrap" }}>
            {bookText}
          </pre>
        </>
      )}

      {data && (
        <>
          <h2>🕸️ Character Interaction Graph</h2>
          <GraphView data={data} />
        </>
      )}
    </div>
  );
}

export default App;
