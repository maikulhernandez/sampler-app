import React, { useState } from 'react';
import { Player } from 'tone';
import Knob from './Knob';
import Fader from './Fader';
import './AudioPlayer.scss';

interface AudioPlayerProps {
  player: Player | null;
  activate: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ player, activate }) => {
  const audioLength = player?.buffer.duration;

  const [volume, setVolume] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(100);

  const changeVolume = (value: number) => {
    setVolume(value);
    player?.set({ volume });
  };

  const changeLoopStart = (value: number) => {
    // if (value >= loopEnd) {
    //   setLoopStart(loopEnd - 1);
    // }
    setLoopStart(value);
    player?.set(Object.assign({}, player?.get(), loopStart));
    player?.setLoopPoints(loopStart, loopEnd);
    // player?.restart(loopStart);
  };

  const changeLoopEnd = (value: number) => {
    setLoopEnd(value);
    player?.set(Object.assign({}, player?.get(), loopEnd));
    player?.setLoopPoints(loopStart, loopEnd);
    // player?.restart(loopStart);
  };

  const changePlaybackRate = (value: number) => {
    setPlaybackRate(value);
    if (player) {
      player.playbackRate = playbackRate;
    }
  };

  return (
    <div className="player-main">
      <button disabled={!activate} onClick={() => player?.start()}>
        Play
      </button>
      <button onClick={() => console.log(player?.buffer.duration)}>TEST</button>
      <br />
      Loop Start:
      <Fader
        min={0}
        max={audioLength}
        step={0.01}
        currentValue={loopStart}
        onChange={changeLoopStart}
      />
      Loop End:
      <Fader
        min={0}
        max={audioLength}
        step={0.01}
        currentValue={loopEnd}
        onChange={changeLoopEnd}
      />
      <div>
        Playback Rate:
        <Fader
          min={0}
          max={3}
          step={0.01}
          currentValue={playbackRate}
          onChange={changePlaybackRate}
        />
      </div>
      <div>
        Player Volume:
        <Fader
          min={-48}
          max={12}
          step={1}
          currentValue={volume}
          onChange={changeVolume}
        />
      </div>
      Player Volume (KNOB):
      <Knob
        size={100}
        numTicks={150}
        degrees={260}
        min={-48}
        max={12}
        value={volume}
        onChange={changeVolume}
      />
    </div>
  );
};

export default AudioPlayer;
