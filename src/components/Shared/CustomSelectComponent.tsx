'use client';

import { Select } from 'antd';
// import { useSelectHandler } from '@/hooks/useSelectHandler';
import { DownArrow } from '../SvgIcons/DownArrow';

const { Option } = Select;

type CustomSelectComponentProps = {
  label: string;
  id: string;
  valueKey: string;
  placeholder: string;
  value: string | null;
  options: { value: string }[];
  onChange: (key: string, value: string | null) => void;
};

export const CustomSelectComponent = ({
  label,
  id,
  valueKey,
  placeholder,
  value,
  options,
  onChange,
}: CustomSelectComponentProps) => {
  const handleChange = (option: string | null) => {
    onChange(valueKey, option);
  };

  return (
    <div>
      <label
        className="text-base text-primary"
        htmlFor={id}
      >
        {label}
      </label>
      <Select
        id={id}
        placeholder={placeholder}
        className="w-full"
        size="large"
        value={value}
        // onChange={onChange}
        onChange={handleChange}
        autoFocus={false}
        allowClear
        suffixIcon={<DownArrow />}
      >
        {options.map((option) => (
          <Option
            key={option.value}
            value={option.value}
          >
            {option.value}
          </Option>
        ))}
      </Select>
    </div>
  );
};

