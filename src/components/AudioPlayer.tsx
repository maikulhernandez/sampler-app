import React, { useState } from "react";
import {Destination, Player, ToneAudioBuffer} from "tone";

export class AudioPlayerController {
  constructor(private readonly player?: Player) {}
  get isLoading(): boolean {
    return this.player?.loaded ?? false;
  }
  public onPlay(): void {
    this.player?.start();
  }
  public onStop(): void {
    this.player?.stop();
  }
  public onLoop(loopStart: number, loopEnd: number): void {
    this.player?.setLoopPoints(loopStart, loopEnd);
    this.player?.set({
      ...(this.player?.get() ?? {}),
      loopEnd,
      loopStart,
      autostart: true,
    });
  }

  public chainFx(fx: ToneAudioBuffer[]) {
    this.player?.chain(...fx, Destination)
  }
}

interface AudioPlayerProps {
  player: Player | null;
  activate?: boolean;
  onStart?: () => void;
  onStop?: () => void;
  onLoopSubmit?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  player,
  activate,
  onStart,
  onStop,
  onLoopSubmit,
}) => {
  const [volume, setVolume] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(1);

  const changeVolume = (event: React.FormEvent<HTMLInputElement>) => {
    setVolume(parseInt(event.currentTarget.value));
    if (player) {
      player.volume.value = volume;
    }
  };

  const changePlaybackRate = (event: React.FormEvent<HTMLInputElement>) => {
    setPlaybackRate(parseFloat(event.currentTarget.value));
    if (player) {
      player.playbackRate = playbackRate;
    }
  };

  const changeLoopPoints = (event: React.FormEvent) => {
    event.preventDefault();

    player?.setLoopPoints(loopStart, loopEnd);
    if (player) {
      player.loop = true;
    }
    player?.restart(loopStart);
  };

  const endLoop = () => {
    player?.restart(loopEnd);
    if (player) {
      player.loop = false;
    }
  };

  return (
    <div>
      <button disabled={!activate} onClick={() => onStart?.call(this)}>
        Play
      </button>
      <button onClick={() => onStop?.call(this)}>Stop</button>
      <br />
      <form onSubmit={changeLoopPoints}>
        <div>
          Loop Start:
          <input
            value={loopStart}
            type="number"
            step="0.01"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setLoopStart(parseFloat(e.currentTarget.value))
            }
          />
          <br />
          Loop End:
          <input
            value={loopEnd}
            type="number"
            step="0.01"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setLoopEnd(parseFloat(e.currentTarget.value))
            }
          />
          <br />
          <input type="submit" value="Set Loop" />
        </div>
      </form>
      <button onClick={endLoop}>End Loop</button>
      <div>
        Playback Rate:
        <input
          value={playbackRate}
          type="range"
          min="0.000"
          max="3"
          step="0.05"
          onChange={changePlaybackRate}
        />
        {playbackRate}
      </div>
      <div>
        Player Volume:
        <input
          value={volume}
          type="range"
          min="-48"
          max="12"
          onChange={changeVolume}
        />
        {volume}
      </div>
    </div>
  );
};

export default AudioPlayer;
