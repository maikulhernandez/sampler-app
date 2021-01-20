import React, { useEffect, useRef, useState } from "react";
import {
  Chorus,
  Destination,
  EQ3,
  FeedbackDelay,
  Filter,
  Player,
  Waveform,
} from "tone";
import AudioPlayer, { AudioPlayerController } from "./AudioPlayer";
import AudioFilter from "./AudioFilter";
import AudioDelay from "./AudioDelay";
import Equalizer from "./Equalizer";
import AudioChorus from "./AudioChorus";

interface AppProps {
  playerController?: AudioPlayerController;
}
const App: React.FC<AppProps> = ({ playerController }) => {
  const [volume, setVolume] = useState(0);
  const player = useRef<Player | null>(null);
  const eq = useRef<EQ3 | null>(null);
  const filter = useRef<Filter | null>(null);
  const chorus = useRef<Chorus | null>(null);
  const delay = useRef<FeedbackDelay | null>(null);
  const waveform = useRef<Waveform | null>(null);

  useEffect(() => {
    eq.current = new EQ3();
    filter.current = new Filter(0, "allpass", -48);
    chorus.current = new Chorus();
    delay.current = new FeedbackDelay();
    waveform.current = new Waveform();

    playerController?.chainFx([
      eq.current,
      filter.current,
      chorus.current,
      delay.current,
      waveform.current,
      Destination,
    ]);
  }, [playerController]);

  const changeMasterVolume = (e: React.FormEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.currentTarget.value));

    Destination.volume.value = volume;
  };

  return (
    <div>
      <button onClick={() => console.log(playerController?.player?.loaded)}></button>
      <AudioPlayer
        activate={playerController?.player?.loaded}
        player={player.current}
        onStart={playerController?.onPlay.bind(playerController)}
        onStop={playerController?.onStop.bind(playerController)}
      />
      <Equalizer eq={eq.current} />
      <AudioFilter filter={filter.current} />
      <AudioChorus chorus={chorus.current} />
      <AudioDelay delay={delay.current} />
      Master Volume:
      <input
        type="range"
        min="-69"
        max="12"
        onChange={changeMasterVolume}
        value={volume}
      />
      {volume} db
    </div>
  );
};

export default App;
