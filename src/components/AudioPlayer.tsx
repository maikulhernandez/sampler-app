import React, { useState } from "react";
import { Player } from "tone";
import { AudioPlayerController } from "./App";

export class PlayerController implements AudioPlayerController {
  constructor(private player?: Player) {}

  public play() {
    this.player?.start();
  }

  public stop() {
    this.player?.stop();
  }

  public setPlayerState(newState: { playbackRate?: number }): void {
    this.player?.set(Object.assign({}, this.player?.get(), newState));
  }
}

export interface AudioPlayerProps {
  controller?: AudioPlayerController;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  controller,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const handleOnPlay = () => {
    controller?.play();
    setIsPlaying(true);
  };
  const handleOnStop = () => {
    controller?.stop();
    setIsPlaying(false);
  };

  const changePlaybackRate = (event: React.FormEvent<HTMLInputElement>) => {
    const playbackRate = parseFloat(event.currentTarget.value);
    setPlaybackRate(playbackRate);
    controller?.setPlayerState({ playbackRate });
  };
  return (
    <div>
      {isPlaying ? (
        <button onClick={handleOnStop}>stop</button>
      ) : (
        <button onClick={(e) => handleOnPlay()}>
          play
        </button>
      )}
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
    </div>
  );
};

// const AudioPlayer: React.FC<AudioPlayerProps> = ({
//   player,
//   onPlay,
//   onStop,
//   onLoopSubmit,
//   isLoaded,
//   isPlaying,
// }) => {
//   const [volume, setVolume] = useState(0);
//   const [playbackRate, setPlaybackRate] = useState(1);
//   const [loopStart, setLoopStart] = useState(0);
//   const [loopEnd, setLoopEnd] = useState(1);
//
//   useEffect(() => {}, []);
//
//   const changeVolume = (event: React.FormEvent<HTMLInputElement>) => {
//     setVolume(parseInt(event.currentTarget.value));
//     if (player) {
//       player.volume.value = volume;
//     }
//   };
//
//   const changePlaybackRate = (event: React.FormEvent<HTMLInputElement>) => {
//     setPlaybackRate(parseFloat(event.currentTarget.value));
//     if (player) {
//       player.playbackRate = playbackRate;
//     }
//   };
//
//   const changeLoopPoints = (event: React.FormEvent) => {
//     event.preventDefault();
//
//     player?.setLoopPoints(loopStart, loopEnd);
//     if (player) {
//       player.loop = true;
//     }
//     player?.restart(loopStart);
//   };
//
//   const endLoop = () => {
//     player?.restart(loopEnd);
//     if (player) {
//       player.loop = false;
//     }
//   };
//
//   return (
//     <div>
//       {!isPlaying ? (
//         <button disabled={!isLoaded} onClick={() => onPlay?.call(this)}>
//           Play
//         </button>
//       ) : (
//         <button onClick={() => onStop?.call(this)}>Stop</button>
//       )}
//       <br />
//       <form onSubmit={changeLoopPoints}>
//         <div>
//           Loop Start:
//           <input
//             value={loopStart}
//             type="number"
//             step="0.01"
//             onChange={(e: React.FormEvent<HTMLInputElement>) =>
//               setLoopStart(parseFloat(e.currentTarget.value))
//             }
//           />
//           <br />
//           Loop End:
//           <input
//             value={loopEnd}
//             type="number"
//             step="0.01"
//             onChange={(e: React.FormEvent<HTMLInputElement>) =>
//               setLoopEnd(parseFloat(e.currentTarget.value))
//             }
//           />
//           <br />
//           <input type="submit" value="Set Loop" />
//         </div>
//       </form>
//       <button onClick={endLoop}>End Loop</button>
//       <div>
//         Playback Rate:
//         <input
//           value={playbackRate}
//           type="range"
//           min="0.000"
//           max="3"
//           step="0.05"
//           onChange={changePlaybackRate}
//         />
//         {playbackRate}
//       </div>
//       <div>
//         Player Volume:
//         <input
//           value={volume}
//           type="range"
//           min="-48"
//           max="12"
//           onChange={changeVolume}
//         />
//         {volume}
//       </div>
//     </div>
//   );
// };
//
// export default AudioPlayer;
