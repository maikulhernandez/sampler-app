import React, { useEffect, useRef, useState } from "react";
import { Destination, Player, ToneAudioNode } from "tone";
import { AudioPlayer, HooksPlayerController } from "./AudioPlayer";

export interface PlayerState {
  isPlaying: boolean;
  onStop: () => void;
  onPlay: () => void;
  setAttribute: (newState: {}) => void;
}
export type PlayerController = (props: { player?: Player }) => PlayerState;

interface AppDeps {
  playerFactory: (
    url: string,
    onLoad: () => void,
    fx?: ToneAudioNode[]
  ) => Player;
  playerController: PlayerController;
}
const appDeps: AppDeps = {
  playerFactory: (url, onLoad, fx) =>
    new Player(url, onLoad).chain(...(fx ?? []), Destination),
  playerController: HooksPlayerController,
};

const App: React.FC = () => {
  const [isPlayerLoaded, setPlayerLoaded] = useState<boolean>(false);
  const player = useRef<Player>();
  const { isPlaying, onPlay, onStop, setAttribute } = appDeps.playerController({
    player: player.current,
  });

  useEffect(() => {
    // Init app dependencies
    player.current = appDeps.playerFactory(
      "heal-6.wav",
      () => setPlayerLoaded(true),
      []
    );
  }, []);
  return (
    <div>
      {isPlayerLoaded ? (
        <AudioPlayer
          isPlaying={isPlaying}
          onPlay={onPlay}
          onStop={onStop}
          onInputChange={setAttribute}
        ></AudioPlayer>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default App;
