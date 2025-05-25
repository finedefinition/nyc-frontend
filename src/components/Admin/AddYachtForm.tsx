/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
  Button,
  Form,
  Input,
  Upload,
  message,
  Checkbox,
  AutoComplete,
  InputNumber,
} from 'antd';
import type { FormProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { TransformedObject } from '@/utils/addYachtForm/autocompleteHelper';
import { apiUser } from '@/utils/api/apiUser';

const { Item } = Form;
const { TextArea } = Input;

type AddYachtFormProps = {
  filterParams: {
    countries: TransformedObject[];
    towns: TransformedObject[];
  };
};

type FieldType = {
  yacht_vat: boolean;
  yacht_price: number;
  yacht_model_make: string;
  yacht_model_model: string;
  yacht_country: string;
  yacht_town: string;
  yacht_model_year: number;
  yacht_model_length: number;
  yacht_model_width: number;
  yacht_model_depth: number;
  yacht_model_keel_type: string;
  yacht_model_fuel_type: string;
  yacht_cabin: number;
  yacht_berth: number;
  yacht_heads: number;
  yacht_shower: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  'e-mail': string;
  yacht_description: string;
};

export const AddYachtForm = ({ filterParams }: AddYachtFormProps) => {
  const [form] = Form.useForm();
  const [mainImageList, setMainImageList] = useState<UploadFile[]>([]);
  const [additionalImageList, setAdditionalImageList] = useState<UploadFile[]>(
    []
  );
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenCookie = Cookies.get('token');
    if (tokenCookie) {
      setUserToken(tokenCookie);
    }
  }, []);

  const handleMainImageChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setMainImageList(fileList.slice(0, 1)); // Limit to one file
  };

  const handleAdditionalImagesChange = ({
    fileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setAdditionalImageList(fileList);
  };

  const handleSubmit: FormProps<FieldType>['onFinish'] = async (
    values: FieldType
  ) => {
    if (mainImageList.length === 0) {
      message.error('Please upload the main image.');
      return;
    }

    const formData = new FormData();

    formData.append(
      'yachtData',
      new Blob([JSON.stringify(values)], { type: 'application/json' })
    );

    // Add main image
    formData.append('mainImage', mainImageList[0].originFileObj as Blob);

    // Add additional images
    additionalImageList.forEach((file) => {
      if (file.originFileObj) {
        formData.append('additionalImages', file.originFileObj);
      }
    });

    try {
      // Send the request to the API
      await apiUser.adminAddYacht('/yachts', formData, userToken);

      message.success('Form submitted successfully');

      // Clear the image lists
      setMainImageList([]);
      setAdditionalImageList([]);
    } catch (error: any) {
      message.error(
        error.message || 'An error occurred while submitting the form'
      );
    }
  };

  return (
    <div className="flex w-full justify-between items-center px-5 md:px-16 py-4 md:py-6 xl:py-8">
      <Form
        form={form}
        layout="vertical"
        size="large"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Item<FieldType>
          label="VAT Included"
          name="yacht_vat"
          valuePropName="checked"
          rules={[
            { required: false, message: 'Please indicate if VAT is included.' },
          ]}
          style={{ marginBottom: '8px' }}
        >
          <Checkbox>VAT Included</Checkbox>
        </Item>

        <Item<FieldType>
          label="Price"
          name="yacht_price"
          rules={[
            { required: true, message: 'Please enter the price.' },
            {
              type: 'number',
              min: 0.01,
              max: 5000000,
              message: 'Price must be between 0.01 and 5,000,000.',
            },
          ]}
          style={{ marginBottom: '8px' }}
        >
          <InputNumber style={{ width: '100%' }} />
        </Item>

        <Item<FieldType>
          name="yacht_model_make"
          label="Make"
          rules={[
            { required: true, message: 'Make is required.' },
            {
              min: 3,
              max: 30,
              message: 'Make must be between 3 and 30 characters.',
            },
            {
              pattern: /^[A-Z][a-zA-Z\s-]*$/,
              message:
                'Make must start with a capital letter and can include letters, spaces, and hyphens.',
            },
          ]}
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="yacht_model_model"
          label="Model"
          rules={[
            { required: true, message: 'Model is required.' },
            {
              min: 1,
              max: 30,
              message: 'Model must be between 1 and 30 characters.',
            },
          ]}
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="yacht_country"
          label="Country"
          rules={[{ required: true, message: 'Country is required.' }]}
          style={{ marginBottom: '8px' }}
        >
          <AutoComplete
            style={{ width: 200 }}
            options={filterParams.countries}
            placeholder="Country"
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().includes(inputValue.toUpperCase())
            }
          />
        </Item>

        <Item<FieldType>
          name="yacht_town"
          label="City"
          rules={[{ required: true, message: 'City is required.' }]}
          style={{ marginBottom: '8px' }}
        >
          <AutoComplete
            style={{ width: 200 }}
            options={filterParams.towns}
            placeholder="City"
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().includes(inputValue.toUpperCase())
            }
          />
        </Item>

        <Item<FieldType>
          name="yacht_model_year"
          label="Year Built"
          rules={[
            { required: true, message: 'Year is required.' },
            {
              type: 'number',
              min: 1930,
              max: new Date().getFullYear() + 1,
              message: 'Year must be between 1930 and next year.',
            },
          ]}
          style={{ marginBottom: '8px' }}
        >
          <InputNumber style={{ width: '100%' }} />
        </Item>

        <Item<FieldType>
          name="yacht_model_length"
          label="Length Overall"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="yacht_model_width"
          label="Beam Width"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="yacht_model_depth"
          label="Draft Depth"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="yacht_model_keel_type"
          label="Keel Type"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="yacht_model_fuel_type"
          label="Fuel Type"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="yacht_cabin"
          label="Cabins"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="yacht_berth"
          label="Berths"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="yacht_heads"
          label="Heads"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="yacht_shower"
          label="Showers"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="first_name"
          label="Owner First Name"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="last_name"
          label="Owner last name"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="phone_number"
          label="Phone Number"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="e-mail"
          label="Email"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="yacht_description"
          label="Description"
        >
          <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Item>

        {/* Image upload fields */}
        <Item
          label="Main Image"
          required
        >
          <Upload
            listType="picture"
            fileList={mainImageList}
            beforeUpload={() => false} // Disable automatic upload
            onChange={handleMainImageChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Main Image</Button>
          </Upload>
        </Item>

        <Item label="Additional Images">
          <Upload
            listType="picture"
            fileList={additionalImageList}
            beforeUpload={() => false} // Disable automatic upload
            onChange={handleAdditionalImagesChange}
            multiple
          >
            <Button icon={<UploadOutlined />}>Upload Additional Images</Button>
          </Upload>
        </Item>

        {/* Submit button */}
        <Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Item>
      </Form>
    </div>
  );
};
