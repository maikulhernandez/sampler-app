import React, { useState } from 'react';
import { FeedbackDelay } from 'tone';

interface AudioDelayProps {
  delay: FeedbackDelay | null;
}

const AudioDelay: React.FC<AudioDelayProps> = ({ delay }) => {
  const [fxAmount, setFxAmount] = useState(0);
  const [delayTime, setDelayTime] = useState(0);
  const [feedbackAmount, setFeedbackAmount] = useState(0);

  const changeEffectAmount = (e: React.FormEvent<HTMLInputElement>) => {
    setFxAmount(parseFloat(e.currentTarget.value));
    if (delay) {
      delay.wet.value = fxAmount;
    }
  };

  const changeDelayTime = (e: React.FormEvent<HTMLInputElement>) => {
    setDelayTime(parseFloat(e.currentTarget.value));
    if (delay) {
      delay.delayTime.value = delayTime;
    }
  };

  const changeFeedbackAmount = (e: React.FormEvent<HTMLInputElement>) => {
    setFeedbackAmount(parseFloat(e.currentTarget.value));
    if (delay) {
      delay.feedback.value = feedbackAmount;
    }
  };

  return (
    <div>
      <div>
        FX2: Delay Amount
        <input
          value={fxAmount}
          type="range"
          min="0"
          max="1"
          step="0.05"
          onChange={changeEffectAmount}
        />
        {fxAmount * 100} %
        <br />
        FX2: Delay Time
        <input
          value={delayTime}
          type="range"
          min="0"
          max="1"
          step="0.025"
          onChange={changeDelayTime}
        />
        {delayTime * 100} ms
        <br />
        FX2: Delay Feedback Amount
        <input
          value={feedbackAmount}
          type="range"
          min="0"
          max="1"
          step="0.05"
          onChange={changeFeedbackAmount}
        />
        {feedbackAmount}
      </div>
    </div>
  );
};

export default AudioDelay;
