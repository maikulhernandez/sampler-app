import React from 'react';
import { Waveform } from 'tone';

interface WaveformProps {
  waveform: Waveform | null;
}

const AudioWaveform: React.FC<WaveformProps> = ({ waveform }) => {
  const test = () => {
    const c = document.getElementById('fucko');
    console.log(c);
  };

  return (
    <div>
      <button onClick={test}>TEST</button>
      <canvas id="fucko" width="300" height="150" />
    </div>
  );
};

export default AudioWaveform;
