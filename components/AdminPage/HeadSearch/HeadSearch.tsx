'use client';
import { ConfigProvider, Flex, Input, Select } from 'antd';
import './headSearch.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getSearchWith } from '@/utils/functions/getSearchWith';
import { getAdminSearchParams } from '@/utils/api/getAllVessels';
import { AdminSearchParams } from '@/interfaces/vessel.interface';

type Props = {
  setLoading: (status: boolean) => void;
  setQuery: (query: string) => void;
  handleSubmit: () => void;
  loading: boolean;
  currentQuery: string;
};

type inputChange = {
  e: React.ChangeEvent<HTMLInputElement>;
  setStateInput: Dispatch<SetStateAction<string>>;
};

const HeadSearch = ({
  setLoading,
  setQuery,
  handleSubmit,
  loading,
  currentQuery,
}: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countries, setCountries] = useState<string[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [searchResponseData, setSearchResponseData] = useState<AdminSearchParams>();

  useEffect(() => {
    setLoading(true);
    getAdminSearchParams()
      .then((responseParams) => {
        const data = responseParams as AdminSearchParams;
        setSearchResponseData(data);
        setCountries(Object.keys(data.yacht_country ?? {}));
        setMakes(Object.keys(data.yacht_model_make ?? {}));
        setModels(Object.values(data.yacht_model_make ?? {}).flat());
        setCities(Object.values(data.yacht_country ?? {}).flat());
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectChange = (value: string, name: string) => {
    const params = new URLSearchParams(currentQuery);
    const query = getSearchWith(params, {
      [name]: value,
    });
    setQuery(query);
  };

  const handleInputChange = ({ e, setStateInput }: inputChange) => {
    const { name, value } = e.target;
    setStateInput(value);
    const params = new URLSearchParams(currentQuery);
    const query = getSearchWith(params, {
      [name]: value,
    });
    setQuery(query);
  };

  const makesData = searchResponseData?.yacht_model_make || {};
  // const countriesData = searchResponseData?.yacht_country || {};
  
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
            ...makes.map((value) => ({
              value: value,
              label: value,
            })),
          ]}
          placeholder='Select Make'
          onChange={(value) => (
            handleSelectChange(value, 'make'),
            setModels(value !== 'Select Make'
              ? makesData[value]
              : Object.values(searchResponseData?.yacht_model_make || {}).flat()))
          }
          disabled={loading}
        />
        <Select
          className='selectCRM'
          style={{ width: '100%', maxWidth: '232px' }}
          placeholder='Model'
          onChange={(value) => {
            handleSelectChange(value, 'model');
          }}
          options={[
            { value: '', label: 'Select Make' },
            ...models.map((value) => ({
              value: value,
              label: value,
            })),
          ]}
          disabled={loading}
        />
        <Select
          className='selectCRM'
          style={{ width: '100%', maxWidth: '232px' }}
          options={[
            { value: '', label: 'Select Country' },
            ...countries.map((value) => ({
              value: value,
              label: value,
            })),
          ]}
          placeholder='Select Country'
          onChange={(value) => handleSelectChange(value, 'country')}
          disabled={loading}
        />
        <Select
          className='selectCRM'
          style={{ width: '100%', maxWidth: '232px' }}
          options={[
            { value: '', label: 'Select Make' },
            ...cities.map((value) => ({
              value: value,
              label: value,
            })),
          ]}
          placeholder='City'
          onChange={(value) => handleSelectChange(value, 'city')}
          disabled={loading}
        />
        <Input
          style={{ width: 'max-content', height: 52 }}
          value={firstName}
          placeholder='Owner first name'
          name='firstName'
          onChange={(e) =>
            handleInputChange({ e, setStateInput: setFirstName })
          }
          disabled={loading}
        />
        <Input
          style={{ width: 'max-content', height: 52 }}
          value={lastName}
          placeholder='Owner last name'
          name='lastName'
          onChange={(e) => handleInputChange({ e, setStateInput: setLastName })}
          disabled={loading}
        />
        <button className='headButton cancel'>Cancel</button>
        <button
          className='headButton'
          onClick={handleSubmit}
          disabled={loading}
        >
          Search
        </button>
      </Flex>
    </ConfigProvider>
  );
};

export default HeadSearch;
