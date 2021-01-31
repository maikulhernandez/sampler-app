import React from 'react';
import './Fader.scss';

interface FaderProps {
  min: number;
  max: number | undefined;
  step: number;
  currentValue: number;
  onChange: (value: number) => void;
}

const Fader: React.FC<FaderProps> = ({
  min,
  max,
  step,
  currentValue,
  onChange,
}) => {
  const faderChange = (event: React.FormEvent<HTMLInputElement>) => {
    onChange(parseFloat(event.currentTarget.value));
  };

  return (
    <div className="fader-container">
      <input
        type="range"
        className="fader"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={faderChange}
      />
      {currentValue.toFixed(2)}
    </div>
  );
};

export default Fader;
