import React, { useState } from "react";
import { PlayerController } from "./App";

export const HooksPlayerController: PlayerController = ({ player}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const onPlay = () => {
    player?.start();
    setIsPlaying(true);
  };

  const onStop = () => {
    player?.stop();
    setIsPlaying(false);
  };

  const setAttribute = (newState: { playbackRate?: number }) => {
    player?.set({ ...player?.get(), ...newState });
  };

  return { isPlaying, onStop, onPlay, setAttribute };
};

export interface AudioPlayerProps {
  isPlaying?: boolean;
  onPlay?: () => void;
  onStop?: () => void;
  onInputChange?: ({}) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  onPlay,
  onStop,
  onInputChange,
}) => {
  const [inputValue, setInputValue] = useState(1);
  const handleOnPlay = () => {
    onPlay?.call(this);
  };
  const handleOnStop = () => {
    onStop?.call(this);
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const parsedInputValue = parseFloat(event.currentTarget.value);
    setInputValue(parsedInputValue);
    onInputChange?.call(this, { playbackRate: parsedInputValue });
  };
  return (
    <div>
      {isPlaying ? (
        <button onClick={handleOnStop}>stop</button>
      ) : (
        <button onClick={handleOnPlay}>play</button>
      )}
      <div>
        Playback Rate:
        <input
          value={inputValue}
          type="range"
          min="0.000"
          max="3"
          step="0.05"
          onChange={handleInputChange}
        />
        {inputValue}
      </div>
    </div>
  );
};
