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
const appDeps: AppDeps = {
  playerFactory: (url, onLoad, fx) =>
    new Player(url, onLoad).chain(...(fx ?? []), Destination),
  playerControllerFactory: (player: Player) => new PlayerController(player),
};

const App: React.FC = () => {
  const [isPlayerLoaded, setPlayerLoaded] = useState<boolean>(false);
  const playerController = useRef<AudioPlayerController | null>(null);
  useEffect(() => {
    playerController.current = appDeps.playerControllerFactory(
      appDeps.playerFactory("heal-6.wav", () => setPlayerLoaded(true), [])
    );
  }, []);

  return (
    <div>
      {isPlayerLoaded ? (
        <AudioPlayer
          controller={playerController.current ?? undefined}
        ></AudioPlayer>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default App;
