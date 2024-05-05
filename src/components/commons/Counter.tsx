import React, {useState} from 'react';
import Buttons from './Buttons';
import {InputText} from '../forms';

interface CounterProps {
  min?: number;
  max?: number;
  increment?: number;
  decrement?: number;
  onCountChange: (count: number) => void;
}

const Counter = ({
  min = 1,
  max = 20,
  increment = 1,
  decrement = 1,
  onCountChange,
}: CounterProps) => {
  const [count, setCount] = useState(min);
  function handleClickAdd() {
    if (count < max) {
      setCount(count + increment);
      onCountChange(count + increment);
    }
  }
  function handleClickSubtract() {
    if (count > min) {
      setCount(count - decrement);
      onCountChange(count - decrement);
    }
  }
  function handleClick(e) {
    setCount(e.target.valueAsNumber);
    onCountChange(e.target.valueAsNumber);
  }

  return (
    <div className={styles.counter}>
      <Buttons onClick={handleClickSubtract}>-</Buttons>
      <InputText
        className={styles.counterInput}
        type="number"
        min={min}
        max={max}
        value={count}
        width="80px"
        onChange={handleClick}
      />
      <Buttons onClick={handleClickAdd}>+</Buttons>
    </div>
  );
};

export default Counter;
