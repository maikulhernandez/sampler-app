import React, { useState } from 'react';
import { Chorus } from 'tone';

interface ChorusProps {
  chorus: Chorus | null;
}

const AudioChorus: React.FC<ChorusProps> = ({ chorus }) => {
  const [chorusAmount, setChorusAmount] = useState(0);
  const [chorusDepth, setChorusDepth] = useState(0);
  const [chorusSpread, setChorusSpread] = useState(0);
  const [chorusFrequency, setChorusFrequency] = useState(0);
  const [chorusDelay, setChorusDelay] = useState(0);
  const [chorusFeedback, setChorusFeedback] = useState(0);

  const changeChorusAmount = (e: React.FormEvent<HTMLInputElement>) => {
    setChorusAmount(parseFloat(e.currentTarget.value));

    chorus?.set({ wet: chorusAmount });
  };

  const changeChorusDepth = (e: React.FormEvent<HTMLInputElement>) => {
    setChorusDepth(parseFloat(e.currentTarget.value));

    if (chorus) {
      chorus.depth = chorusDepth;
    }
  };

  const changeChorusSpread = (e: React.FormEvent<HTMLInputElement>) => {
    setChorusSpread(parseInt(e.currentTarget.value));

    if (chorus) {
      chorus.spread = chorusSpread;
    }
  };

  const changeChorusFrequency = (e: React.FormEvent<HTMLInputElement>) => {
    setChorusFrequency(parseFloat(e.currentTarget.value));

    if (chorus) {
      chorus.frequency.value = chorusFrequency;
    }
  };

  const changeChorusDelay = (e: React.FormEvent<HTMLInputElement>) => {
    setChorusDelay(parseFloat(e.currentTarget.value));

    if (chorus) {
      chorus.delayTime = chorusDelay;
    }
  };

  const changeChorusFeedback = (e: React.FormEvent<HTMLInputElement>) => {
    setChorusFeedback(parseFloat(e.currentTarget.value));

    if (chorus) {
      chorus.feedback.value = chorusFeedback;
    }
  };

  return (
    <div>
      <button onClick={() => chorus?.start()}>Start Chorus</button>
      <button onClick={() => chorus?.stop()}>Stop Chorus</button>
      <br />
      FX1: Chorus Amount
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        onChange={changeChorusAmount}
        value={chorusAmount}
      />
      {chorusAmount * 100} %
      <br />
      FX1: Chorus Depth
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        onChange={changeChorusDepth}
        value={chorusDepth}
      />
      {chorusDepth * 100} %
      <br />
      FX1: Chorus Spread
      <input
        type="range"
        min="0"
        max="180"
        step="5"
        onChange={changeChorusSpread}
        value={chorusSpread}
      />
      {chorusSpread} degrees
      <br />
      FX1: Chorus Frequency
      <input
        type="range"
        min="0"
        max="5"
        step="0.05"
        onChange={changeChorusFrequency}
        value={chorusFrequency}
      />
      {chorusFrequency} Hz
      <br />
      FX1: Chorus Delay
      <input
        type="range"
        min="0"
        max="20"
        step="0.5"
        onChange={changeChorusDelay}
        value={chorusDelay}
      />
      {chorusDelay} ms
      <br />
      FX1: Chorus Feedback
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        onChange={changeChorusFeedback}
        value={chorusFeedback}
      />
    </div>
  );
};

export default AudioChorus;
