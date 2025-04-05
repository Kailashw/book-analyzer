import ForceGraph2D from 'react-force-graph-2d';

type Node = {
  id: string;
};

type Edge = {
  source: string;
  target: string;
  weight?: number;
  sentiment?: string;
  quotes?: string[];
};

type GraphData = {
  nodes: Node[];
  edges: Edge[];
};

export default function GraphView({ data }: { data: GraphData }) {
  return (

    <div style={{ height: "600px", border: "1px solid #ccc", marginTop: "20px" }}>
      <div>
        <ForceGraph2D
          graphData={{
            nodes: data.nodes,
            links: data.edges
          }}
          nodeAutoColorBy="id"
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={(d: any) => d.weight * 0.001}
          linkCurvature={0.25}
          linkWidth={(link: any) => link.weight || 1}
          nodeCanvasObjectMode={() => 'after'}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = 'black';
            ctx.fillText(label, node.x! + 8, node.y! + 8);
          }}
        />
      </div>
      {data.edges && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Interaction Quotes & Sentiments</h3>
          {data.edges.map((edge, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <strong>{edge.source} ↔ {edge.target}</strong> ({edge?.sentiment})
              <ul>
                {edge?.quotes?.map((q: string, qi: number) => (
                  <li key={qi}>"{q}"</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
