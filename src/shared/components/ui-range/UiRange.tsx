import * as React from 'react';
import InputRange, { InputRangeProps } from 'react-input-range';
import 'react-input-range/lib/css/index.css';

export interface IProps extends InputRangeProps {
}

const UiRange: React.FC<IProps> = ({value, draggableTrack, minValue, maxValue, step, onChange}: IProps) => {
  return (
    <InputRange
      value={value}
      draggableTrack={draggableTrack}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      onChange={onChange}
    />
  );
};

export default UiRange;
