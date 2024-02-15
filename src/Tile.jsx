export function Tile({ content, flip, state }) {
  switch (state) {
    case "start":
      return <TileBack flip={flip} />;
    case "flipped":
      return <TileFront content={content} />;
    case "matched":
      return <TileMatched content={content} />;
    default:
      throw new Error("Invalid state " + state);
  }
}

function TileFront({ content }) {
  return (
    <div className="inline-block w-10 h-10 text-center bg-green-500">
      {content}
    </div>
  );
}

function TileBack({ flip }) {
  return (
    <div
      onClick={flip}
      className="inline-block w-10 h-10 text-center bg-blue-500"
    >
      ?
    </div>
  );
}

function TileMatched({ content }) {
  return (
    <div className="inline-block w-10 h-10 text-center bg-white text-gray-300">
      {content}
    </div>
  );
}
