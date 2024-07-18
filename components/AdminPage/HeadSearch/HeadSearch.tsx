'use client';
import { ConfigProvider, Flex, Input, Select } from 'antd';
import './headSearch.scss';
import { Dispatch, SetStateAction, useState } from 'react';
import { getSearchWith } from '@/utils/functions/getSearchWith';
import useCurrentSearchParams from '@/hooks/useCurrentSearchParams';

type Props = {
  setLoading: (status: boolean) => void;
};

type inputChange = {
  e: React.ChangeEvent<HTMLInputElement>;
  setStateInput: Dispatch<SetStateAction<string>>;
};

const HeadSearch = ({ setLoading }: Props) => {
  const [currentSearchParams, setCurrentSearchParams] =
    useCurrentSearchParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSearch = () => {
    setLoading(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectChange = (value: string, name: string) => {
    const params = new URLSearchParams(currentSearchParams);
    const query = getSearchWith(params, {
      [name]: value,
    });
    setCurrentSearchParams(query);
  };

  const handleInputChange = ({ e, setStateInput }: inputChange) => {
    const { name, value } = e.target;
    setStateInput(value);
    const params = new URLSearchParams(currentSearchParams);
    const query = getSearchWith(params, {
      [name]: value,
    });
    setCurrentSearchParams(query);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            fontSizeLG: 16,
            controlHeight: 52, // to keep label's hight as short as possible
            controlPaddingHorizontal: 40,
            optionPadding: 16,
            colorBorder: '#4D6575',
            borderRadius: 8,
          },

          Input: {
            fontSizeLG: 16,
            controlPaddingHorizontal: 40,
            colorBorder: '#4D6575',
            borderRadius: 8,
          },
        },
      }}
    >
      <button className='headButton addYacht'>
        <span></span>
        Add yacht
      </button>
      <Flex
        gap={20}
        wrap
        align='center'
      >
        <Select
          className='selectCRM'
          style={{ width: '100%', maxWidth: '232px' }}
          options={[
            { value: '', label: 'Select Make' },
            {
              value: 'Jeanneau Jeanneau',
              label: 'Jeanneau Jeanneau',
            },
          ]}
          placeholder='Make'
          onChange={(value) => handleSelectChange(value, 'make')}
        />
        <Select
          className='selectCRM'
          style={{ width: '100%', maxWidth: '232px' }}
          options={[
            { value: '', label: 'Select Model' },
            { value: 'Jeanneau', label: 'Jeanneau' },
          ]}
          placeholder='Model'
          onChange={(value) => handleSelectChange(value, 'model')}
        />
        <Select
          className='selectCRM'
          style={{ width: '100%', maxWidth: '232px' }}
          options={[
            { value: '', label: 'Select Country' },
            { value: 'Jeanneau', label: 'Jeanneau' },
          ]}
          placeholder='Country'
          onChange={(value) => handleSelectChange(value, 'country')}
        />
        <Select
          className='selectCRM'
          style={{ width: '100%', maxWidth: '232px' }}
          options={[
            { value: '', label: 'Select City' },
            { value: 'Jeanneau', label: 'Jeanneau' },
          ]}
          placeholder='City'
          onChange={(value) => handleSelectChange(value, 'city')}
        />
        <Input
          style={{ width: 'max-content', height: 52 }}
          value={firstName}
          placeholder='Owner first name'
          name='firstName'
          onChange={(e) =>
            handleInputChange({ e, setStateInput: setFirstName })
          }
        />
        <Input
          style={{ width: 'max-content', height: 52 }}
          value={lastName}
          placeholder='Owner last name'
          name='lastName'
          onChange={(e) => handleInputChange({ e, setStateInput: setLastName })}
        />
        <button className='headButton cancel'>Cancel</button>
        <button
          className='headButton'
          onClick={handleSearch}
        >
          Search
        </button>
      </Flex>
    </ConfigProvider>
  );
};

export default HeadSearch;
