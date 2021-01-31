import React, { useState, useEffect, useRef } from 'react';
import {
  Player,
  EQ3,
  Filter,
  Chorus,
  FeedbackDelay,
  Waveform,
  Destination,
} from 'tone';
import AudioPlayer from './AudioPlayer';
import AudioFilter from './AudioFilter';
import AudioDelay from './AudioDelay';
import Equalizer from './Equalizer';
import AudioChorus from './AudioChorus';

const App: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [volume, setVolume] = useState(0);

  const player = useRef<Player | null>(null);
  const eq = useRef<EQ3 | null>(null);
  const filter = useRef<Filter | null>(null);
  const chorus = useRef<Chorus | null>(null);
  const delay = useRef<FeedbackDelay | null>(null);
  const waveform = useRef<Waveform | null>(null);

  useEffect(() => {
    player.current = new Player('heal-6.wav', () => {
      setLoaded(true);
    });
    player.current.set({ loop: true });

    eq.current = new EQ3();
    filter.current = new Filter(0, 'allpass', -48);
    chorus.current = new Chorus();
    delay.current = new FeedbackDelay();
    waveform.current = new Waveform();

    player.current?.chain(
      eq.current,
      filter.current,
      chorus.current,
      delay.current,
      waveform.current,
      Destination
    );
  }, []);

  const changeMasterVolume = (e: React.FormEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.currentTarget.value));

    Destination.volume.value = volume;
  };

  return (
    <div>
      <AudioPlayer activate={isLoaded} player={player.current} />
      <br />
      <br />
      <br />
      <br />
      <br />
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
