import React, { useState } from 'react';
import { Filter } from 'tone';

interface AudioFilterProps {
  filter: Filter | null;
}

const AudioFilter: React.FC<AudioFilterProps> = ({ filter }) => {
  const [freq, setFreq] = useState(0);

  const reverseRange = (num: number, min: number, max: number): number => {
    return max + min - num;
  };

  const changeFilter = (event: React.FormEvent<HTMLInputElement>) => {
    console.log(freq)
    setFreq(parseFloat(event.currentTarget.value));
    if (freq >= 0 && filter) {
      filter.type = 'highpass';
      filter.frequency.value = freq;
    } else if (freq < 0 && filter) {
      filter.type = 'lowpass';
      filter.frequency.value = reverseRange(Math.abs(freq), 0, 3000);
    }
  };

  return (
    <div>
      <div>
        Bi Directional Filter:
        <input
          value={freq}
          type="range"
          min="-3000"
          max="3000"
          step="50"
          onChange={changeFilter}
        />
      </div>
    </div>
  );
};

export default AudioFilter;
