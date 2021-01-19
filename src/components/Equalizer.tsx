import React, { useState } from 'react';
import { EQ3 } from 'tone';

interface EqualizerProps {
  eq: EQ3 | null;
}

const Equalizer: React.FC<EqualizerProps> = ({ eq }) => {
  const [lowAmp, setLowAmp] = useState(0);
  const [midAmp, setMidAmp] = useState(0);
  const [hiAmp, setHiAmp] = useState(0);

  const changeLowAmp = (e: React.FormEvent<HTMLInputElement>) => {
    setLowAmp(parseInt(e.currentTarget.value));
    if (eq) {
      eq.low.value = lowAmp;
    }
  };

  const changeMidAmp = (e: React.FormEvent<HTMLInputElement>) => {
    setMidAmp(parseInt(e.currentTarget.value));
    if (eq) {
      eq.mid.value = midAmp;
    }
  };

  const changeHiAmp = (e: React.FormEvent<HTMLInputElement>) => {
    setHiAmp(parseInt(e.currentTarget.value));
    if (eq) {
      eq.high.value = midAmp;
    }
  };

  return (
    <div>
      EQ3 - low (0-400hz):
      <input
        type="range"
        min="-12"
        max="12"
        onChange={changeLowAmp}
        value={lowAmp}
      />
      {lowAmp} db
      <br />
      EQ3 - mid (400-2500hz):
      <input
        type="range"
        min="-12"
        max="12"
        onChange={changeMidAmp}
        value={midAmp}
      />
      {midAmp} db
      <br />
      EQ3 - hi (2500-20khz):
      <input
        type="range"
        min="-12"
        max="12"
        onChange={changeHiAmp}
        value={hiAmp}
      />
      {hiAmp} db
    </div>
  );
};

export default Equalizer;
