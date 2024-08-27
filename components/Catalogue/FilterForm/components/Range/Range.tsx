/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import { Form } from 'react-bootstrap';
import { useFilter } from '@/components/Catalogue/CatalogProps/FilterContext';
import { BASE_FILTER } from '../../constants';
import { sliderStyle } from './constants';

import classes from './range.module.scss';

type Pair = [number, number];

type RangeType = {
  defaultValue: Pair;
  step?: number;
  title: string;
  pattern?: RegExp;
  changeMinPrice: (value: number) => void,
  changeMaxPrice: (value: number) => void,
}


export const Range = ({
  defaultValue,
  step,
  title,
  pattern = /^[0-9.,]*$/,
  changeMinPrice,
  changeMaxPrice,
}: RangeType) => {
  const { baseFilterField } = useFilter();
  const [r1, r2] = defaultValue;

  const [min, setMin] = useState(r1.toString());
  const [max, setMax] = useState(r2.toString());

  const [minError, setMinError] = useState<string>('');
  const [maxError, setMaxError] = useState<string>('');

  const onMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (pattern.test(value)) {
      setMin(value);
      setMinError('');
    } else {
      setMinError('Invalid characters.');
    }
  }

  const onMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (pattern.test(value)) {
      setMax(value);
      setMaxError('');
    } else {
      setMaxError('Invalid characters.');
    }
  }

  const handleRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setMin(value[0].toString());
      setMax(value[1].toString());
    }
  }

  const handleBlur = () => {
    const parsedMin = +(Math.round(parseFloat(min.replace(',', '.')) * 100)/100).toFixed(2);
    const parsedMax = +(Math.round(parseFloat(max.replace(',', '.')) * 100)/100).toFixed(2);;

    if (isNaN(parsedMin)) {
      setMinError('Minimum value is not a valid number.');
    } else if (parsedMin < r1) {
      setMinError(`Minimum value should not be less than ${r1}.`);
    } else if (parsedMin > r2) {
      setMinError(`Minimum value should not be greater than ${r2}.`);
    } else {
      setMinError('');
    }

    if (isNaN(parsedMax)) {
      setMaxError('Maximum value is not a valid number.');
    } else if (parsedMax < r1) {
      setMaxError(`Maximum value should not be less than ${r1}.`);
    } else if (parsedMax > r2) {
      setMaxError(`Maximum value should not be greater than ${r2}.`);
    } else {
      setMaxError('');
    }

    if (parsedMin > parsedMax) {
      setMinError('Minimum value should not be greater than maximum value.');
      setMaxError('Maximum value should not be less than minimum value.');
    }

    if (!minError && !maxError) {
      setMin(parsedMin.toString());
      setMax(parsedMax.toString());

      changeMinPrice(parsedMin);
      changeMaxPrice(parsedMax);
    }
  }

  const sliderBlure = () => {
    changeMinPrice(+min);
    changeMaxPrice(+max);
  }

  useEffect(() => {
    if (BASE_FILTER === baseFilterField) {
      setMin(r1.toString());
      setMax(r2.toString());

      setMinError('');
      setMaxError('');
    }
  }, [baseFilterField])

  return (
    <Form.Group className={classes.group}>
      <p className={classes.title}>{title}</p>

      <div className={classes.range}>
        <Form.Group className="position-relative">
          <Form.Control
            type="text"
            value={min}
            onChange={onMinChange}
            onBlur={handleBlur}
            className={classes.box}
            isInvalid={!!minError}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {minError}
          </Form.Control.Feedback>
        </Form.Group>

        <span className={classes.dash} />

        <Form.Group className="position-relative">
          <Form.Control
            type="text"
            value={max}
            onChange={onMaxChange}
            onBlur={handleBlur}
            className={classes.box}
            isInvalid={!!maxError}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {maxError}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <div className={classes.slider}>
        <Slider
          range
          pushable
          defaultValue={defaultValue}
          value={[parseFloat(min.replace(',', '.')), parseFloat(max.replace(',', '.'))]}
          min={r1}
          max={r2}
          step={step}
          onChange={handleRangeChange}
          onBlur={sliderBlure}
          trackStyle={[{ backgroundColor: '#e7801a', height: 2 }]}
          railStyle={{ backgroundColor: '#aaafb4', height: 2 }}
          handleStyle={[sliderStyle, sliderStyle]}
        />
      </div>
    </Form.Group>
  );
}
