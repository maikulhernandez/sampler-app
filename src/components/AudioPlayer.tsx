import React, { useEffect, useState } from "react";
import { Destination, Player, ToneAudioBuffer, ToneAudioNode } from "tone";

export interface AudioControllerProps {
  playerFactory?: (url: string, onLoad: () => void) => Player;
  component?: React.FC<AudioPlayerProps>;
  fx?: ToneAudioNode[];
}
export const AudioPlayerControllerPt2 = (props: AudioControllerProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const player = props?.playerFactory?.call(props, "heal-6.wav", () =>
    setIsLoaded(true)
  );

  console.log('i am called');
  player?.chain(Destination);
  // useEffect(() => {
  //   console.log('in use effect');
  //   player?.chain(Destination);
  // }, []);

  const onLoopSubmit = (loopStart: number, loopEnd: number) => {
    player?.setLoopPoints(loopStart, loopEnd);
    player?.set({
      ...(player?.get() ?? {}),
      loopEnd,
      loopStart,
      autostart: true,
    });
  };

  const onStart = () => {
    setIsPlaying(true);
    player?.start?.call(player);
  };
  const onStop = () => {
    console.log("stop");
    setIsPlaying(false);
    player?.stop?.call(player);
  };

  return (
    props.component?.call(props, {
      player,
      activate: isLoaded,
      onStart,
      onStop,
      onLoopSubmit,
      isPlaying,
    }) ?? <div>No component passed</div>
  );
};

export interface AudioPlayerProps {
  player?: Player;
  isPlaying?: boolean;
  activate?: boolean;
  onStart?: () => void;
  onStop?: () => void;
  onLoopSubmit?: (loopStart: number, loopEnd: number) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  player,
  activate,
  onStart,
  onStop,
  onLoopSubmit,
  isPlaying,
}) => {
  const [volume, setVolume] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(1);

  useEffect(() => {}, []);

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
      {!isPlaying ? (
        <button disabled={!activate} onClick={() => onStart?.call(this)}>
          Play
        </button>
      ) : (
        <button onClick={() => onStop?.call(this)}>Stop</button>
      )}
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
