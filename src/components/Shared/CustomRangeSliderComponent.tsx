'use client';

import { Slider, InputNumber, Row, Col } from 'antd';

type RangeSliderProps = {
  label: string;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
  unit?: string;
  step?: number;
};

export const CustomRangeSliderComponent = ({
  label,
  value,
  onChange,
  min,
  max,
  unit,
  step,
}: RangeSliderProps) => {
  const [minValue, maxValue] = value;

  const handleMinChange = (val: number | null) => {
    onChange([val ?? min, maxValue]);
  };

  const handleMaxChange = (val: number | null) => {
    onChange([minValue, val ?? max]);
  };

  const handleSliderChange = (val: number[]) => {
    onChange([val[0], val[1]]);
  };

  return (
    <div>
      <label
        className="text-base text-primary"
        htmlFor={label}
      >
        {label}
      </label>
      <Row
        gutter={8}
        align="middle"
      >
        <Col span={10}>
          <InputNumber
            min={min}
            max={maxValue}
            value={minValue}
            onChange={handleMinChange}
            style={{ width: '100%' }}
            addonAfter={unit}
          />
        </Col>
        <Col
          span={2}
          style={{ textAlign: 'center' }}
        >
          —
        </Col>
        <Col span={10}>
          <InputNumber
            min={minValue}
            max={max}
            value={maxValue}
            onChange={handleMaxChange}
            style={{ width: '100%' }}
            addonAfter={unit}
          />
        </Col>
      </Row>
      <Slider
        range
        min={min}
        max={max}
        value={value}
        onChange={handleSliderChange}
        style={{ marginTop: 24 }}
        step={step}
      />
    </div>
  );
};
