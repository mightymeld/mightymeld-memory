import { useState } from "react";

const possibleTileContents = ["A", "B", "C", "D", "E", "F", "G", "H"];

function Tile({ content, flip, state }) {
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
    <div style={{ width: 20, height: 20, display: "inline-block" }}>
      {content}
    </div>
  );
}

function TileBack({ flip }) {
  return (
    <div
      onClick={flip}
      style={{ width: 20, height: 20, display: "inline-block" }}
    >
      ?
    </div>
  );
}

function TileMatched({ content }) {
  return (
    <div style={{ width: 20, height: 20, display: "inline-block" }}>
      {content}
    </div>
  );
}

function App() {
  const [tiles, setTiles] = useState(null);

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        newState = "matched";
        setTimeout(() => {
          alert("Match!");
        }, 100);
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          return prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  return (
    <>
      <div>
        {getTiles(16).map((tile, i) => (
          <Tile key={i} flip={() => flip(i)} {...tile} />
        ))}
      </div>
    </>
  );
}

export default App;
