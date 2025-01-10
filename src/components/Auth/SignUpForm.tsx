'use client';

import { useRouter } from 'next/navigation';
import type { FormProps } from 'antd';
import { Form, Input } from 'antd';
import ClickableComponent from '../ClickableComponent/ClickableComponent';
import ModalWrapper from '../Modals/ModalWrapper';

const { Item } = Form;

type FieldType = {
  user_email?: string;
  user_password?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
  // eslint-disable-next-line
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  // eslint-disable-next-line
  console.log('Failed:', errorInfo);
};

const SignUpForm = () => {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h4 className="mb-6">Sign Up</h4>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Item<FieldType>
          name="user_email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Item>

        <Item<FieldType>
          name="user_password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Item>

        <Item label={null}>
          <ClickableComponent
            type="submit"
            htmlType="submit"
            variants={['primary', 'button']}
          >
            Sign Up
          </ClickableComponent>
        </Item>
      </Form>
      <ClickableComponent
        href="/signin"
        scroll={false}
      >
        Sign In
      </ClickableComponent>
    </ModalWrapper>
  );
};

export default SignUpForm;
