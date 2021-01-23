import React, { useEffect, useRef, useState } from "react";
import { Player } from "tone";
import { AudioPlayer, PlayerController } from "./AudioPlayer";

export interface AudioPlayerController {
  play: () => void;
  stop: () => void;
}

interface AppDeps {
  playerControllerFactory: (player: Player) => AudioPlayerController;
}
const bootstrap: () => AppDeps = () => {
  return {
    playerControllerFactory: (player: Player) => new PlayerController(player),
  };
};

const App: React.FC = () => {
  const [playerLoaded, setPlayerLoaded] = useState<boolean>(false);
  const playerController = useRef<AudioPlayerController | null>(null);

  let appDeps: AppDeps;
  useEffect(() => {
    appDeps = bootstrap();
    playerController.current = appDeps.playerControllerFactory(
      new Player("heal-6.wav", () => setPlayerLoaded(true)).chain()
    );
  }, []);

  return (
    <AudioPlayer
      isLoaded={playerLoaded}
      controller={playerController.current ?? undefined}
    ></AudioPlayer>
  );
};

export default App;
