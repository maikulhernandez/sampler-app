import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  Chorus,
  Destination,
  EQ3,
  FeedbackDelay,
  Filter,
  Player,
  Waveform,
} from "tone";
import AudioPlayer, { AudioControllerProps } from "./AudioPlayer";

interface AppProps {
  playerController2?: React.FC<AudioControllerProps>;
}
const App: React.FC<AppProps> = ({ playerController2 }) => {
  const [volume, setVolume] = useState(0);
  const player = playerController2?.call(this, {
    playerFactory: (url, onLoad) => new Player(url, onLoad),
    component: AudioPlayer,
  });
  console.log('called app');
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
    // playerController?.chainFx([
    //   eq.current,
    //   filter.current,
    //   chorus.current,
    //   delay.current,
    //   waveform.current,
    //   Destination,
    // ]);
  }, []);

  const changeMasterVolume = (e: React.FormEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.currentTarget.value));

    Destination.volume.value = volume;
  };

  return <div>{player}</div>;
};

export default App;
