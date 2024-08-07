import { useState } from 'react';
import Slider from 'rc-slider';
import { Form } from 'react-bootstrap';
import { sliderStyle } from './constants';

import classes from './range.module.scss';

type Pair = [number, number];

type RangeType = {
  defaultValue: Pair;
  step?: number;
  title: string;
  changeMinPrice?: (value: number) => void,
  changeMaxPrice?: (value: number) => void,
}

export const Range = ({
  defaultValue,
  step,
  title,
  changeMinPrice = () => {},
  changeMaxPrice = () => {},
}: RangeType) => {
  const [r1, r2] = defaultValue;

  const [min, setMin] = useState(r1);
  const [max, setMax] = useState(r2);
  
  const validation = false;

  const onMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= r1) {
      setMin(value);
    }

    if (validation) {
      changeMinPrice(min);
    }
  }

  const onMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value <= r2) {
      setMax(value);
    }

    if (validation) {
      changeMaxPrice(min);
    }
  }

  const handleRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setMin(value[0]);
      setMax(value[1]);

      changeMinPrice(value[0]);
      changeMaxPrice(value[1]);
    }
  }

  return (
    <Form.Group className={classes.group}>
      <p className={classes.title}>{title}</p>
      <div className={classes.range}>
        <div>
          <input
            type="text"
            value={min}
            onChange={onMinChange}
            className={classes.box}
          />
        </div>
        <span className={classes.dash} />
        <div>
          <input
            type="text"
            value={max}
            onChange={onMaxChange}
            className={classes.box}
          />
        </div>
      </div>
      <div className={classes.slider}>
        <Slider
          range
          pushable
          defaultValue={defaultValue}
          value={[min, max]}
          min={r1}
          max={r2}
          step={step && step}
          onChange={handleRangeChange}
          trackStyle={[{ backgroundColor: '#e7801a', height: 2 }]}
          railStyle={{ backgroundColor: '#aaafb4', height: 2 }}
          handleStyle={[sliderStyle, sliderStyle]}
        />
      </div>
    </Form.Group>
  );
}
