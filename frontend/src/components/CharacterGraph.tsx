import ForceGraph2D from "react-force-graph-2d";
import { useEffect, useRef } from "react";

interface Interaction {
  from: string;
  to: string;
  type: string;
}

interface CharacterGraphProps {
  characters: string[];
  interactions: Interaction[];
}

export default function CharacterGraph({ characters, interactions }: CharacterGraphProps) {
  const fgRef = useRef<any>(null);

  const linkMap = new Map<string, any>();

  interactions.forEach((i) => {
    const key = `${i.from}--${i.to}`;
    if (!linkMap.has(key)) {
      linkMap.set(key, { source: i.from, target: i.to, label: i.type, count: 1 });
    } else {
      linkMap.get(key).count += 1;
    }
  });

  const nodes = characters.map((id) => ({ id }));
  const links = Array.from(linkMap.values());

  useEffect(() => {
    if (fgRef.current) fgRef.current.zoomToFit(400);
  }, [characters]);

  return (
    <div className="graph-container">
      <ForceGraph2D
        ref={fgRef}
        graphData={{ nodes, links }}
        nodeAutoColorBy="id"
        linkLabel={(l: any) => `${l.label} (${l.count})`}
        linkWidth={(l: any) => Math.min(l.count, 10)}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        nodeCanvasObjectMode={() => "after"}
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
          const label = node.id;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = "black";
          ctx.fillText(label, node.x + 6, node.y + 6);
        }}
      />
    </div>
  );
}
