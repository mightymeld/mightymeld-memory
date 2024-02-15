import { useState } from "react";
import { StartScreen, EndScreen, PlayScreen } from "./Screens";

export const possibleTileContents = ["A", "B", "C", "D", "E", "F", "G", "H"];

function App() {
  const [gameState, setGameState] = useState("start");

  switch (gameState) {
    case "start":
      return <StartScreen start={() => setGameState("play")} />;
    case "end":
      return <EndScreen restart={() => setGameState("play")} />;
    case "play":
      return <PlayScreen end={() => setGameState("end")} />;
    default:
      throw new Error("Invalid game state " + gameState);
  }
}

export default App;
