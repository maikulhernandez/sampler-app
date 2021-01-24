import React, { useEffect, useRef, useState } from "react";
import { Destination, Player, ToneAudioNode } from "tone";
import { AudioPlayer, PlayerController } from "./AudioPlayer";

export interface AudioPlayerController {
  play: () => void;
  stop: () => void;
  setPlayerState: (state: { playbackRate?: number }) => void;
}

interface AppDeps {
  playerFactory: (
    url: string,
    onLoad: () => void,
    fx?: ToneAudioNode[]
  ) => Player;
  playerControllerFactory: (player: Player) => AudioPlayerController;
}
const bootstrap: () => AppDeps = () => {
  return {
    playerFactory: (url, onLoad, fx) =>
      new Player(url, onLoad).chain(...(fx ?? []), Destination),
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
      appDeps.playerFactory("heal-6.wav", () => setPlayerLoaded(true), [])
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
