/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { AutoComplete, Button, Checkbox, Form, Input, Upload } from 'antd';
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
  email: string;
  yacht_description: string;
};

const AddYachtForm = ({ filterParams }: AddYachtFormProps) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenCookie = Cookies.get('token');
    if (tokenCookie) {
      setUserToken(JSON.parse(tokenCookie));
    }
  }, [userToken]);

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  const handleSubmit: FormProps<FieldType>['onFinish'] = async (
    values: FieldType
  ) => {
    const formData = new FormData();

    // console.log('values', values);
    // console.log('fileList', fileList);

    const valuesToAdd = JSON.stringify(values);
    // console.log('valuesToAdd', valuesToAdd);
    formData.append('yachtData', valuesToAdd);

    const additionalImages: Blob[] = [];

    fileList.forEach((file, i) => {
      if (i === 0) {
        formData.append('mainImage', file.originFileObj as Blob);
      } else {
        additionalImages.push(file.originFileObj as Blob);
      }
    });
    formData.append('additionalImages', additionalImages);

    // console.log('FormData entries:');
    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });

    try {
      const response: any = await apiUser.adminAddYacht(
        '/yachts',
        formData,
        userToken
      );

      if (response.ok) {
        // eslint-disable-next-line no-console
        console.log('Form submitted successfully');
      } else {
        // eslint-disable-next-line no-console
        console.error('Form submission failed');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex w-full justify-between items-center px-5 md:px-16 py-4 md:py-6 xl:py-8">
      <Form
        form={form}
        layout="inline"
        size="large"
        onFinish={handleSubmit}
        // onFinish={onFinish}
        autoComplete="off"
      >
        <Item<FieldType>
          label="VAT"
          name="yacht_vat"
          valuePropName="checked"
          style={{ marginBottom: '8px' }}
        >
          <Checkbox />
        </Item>
        <Item<FieldType>
          label="Price"
          name="yacht_price"
          style={{ marginBottom: '8px' }}
          // rules={[{ required: true, message: 'required field' }]}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="yacht_model_make"
          label="Make"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="yacht_model_model"
          label="Model"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="yacht_country"
          label="Country"
          style={{ marginBottom: '8px' }}
        >
          <AutoComplete
            style={{ width: 200 }}
            options={filterParams.countries}
            placeholder="Country"
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </Item>

        <Item<FieldType>
          name="yacht_town"
          label="City"
          style={{ marginBottom: '8px' }}
        >
          <AutoComplete
            style={{ width: 200 }}
            options={filterParams.towns}
            placeholder="Country"
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </Item>

        <Item<FieldType>
          name="yacht_model_year"
          label="Year Build"
          style={{ marginBottom: '8px' }}
        >
          <Input />
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
          label="Owner first name"
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
          label="Phone number"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="email"
          label="Email"
          style={{ marginBottom: '8px' }}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="yacht_description"
          label="Description
"
        >
          <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Item>

        <Item label="Upload Files">
          <Upload
            name="files"
            fileList={fileList}
            beforeUpload={() => false} // Відключає автоматичне завантаження
            onChange={handleUploadChange}
            multiple
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Item>

        <Item label={null}>
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

export default AddYachtForm;