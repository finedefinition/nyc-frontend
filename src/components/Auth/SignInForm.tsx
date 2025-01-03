'use client';

import { useRouter } from 'next/navigation';
import type { FormProps } from 'antd';
import { Form, Input } from 'antd';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { apiUser } from '@/utils/api/apiUser';
import ClickableComponent from '../ClickableComponent/ClickableComponent';
import ModalWrapper from '../Modals/ModalWrapper';

const { Item } = Form;
const { Password } = Input;

type FieldType = {
  user_email?: string;
  user_password?: string;
};

type DecodedTokenType = {
  exp: number;
  'cognito:groups': string[];
  given_name: string;
  family_name: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
  console.log('Success:', values);
  try {
    const token = await apiUser.userSignIn('/auth/login', values);
    const decodedToken = jwtDecode<DecodedTokenType>(
      (token as { token: string }).token
    );
    const fullName = `${decodedToken.given_name} ${decodedToken.family_name[0]}.`;
    Cookies.set('token', JSON.stringify(decodedToken), {
      expires: new Date(decodedToken.exp * 1000),
    });
    Cookies.set('role', decodedToken['cognito:groups'][0], {
      expires: new Date(decodedToken.exp * 1000),
    });
    Cookies.set('fullName', fullName, {
      expires: new Date(decodedToken.exp * 1000),
    });
  } catch (error) {
    console.error('Error during sign in:', error);
  }
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const SignInForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const onClose = () => {
    router.back();
  };

  const onLogin = () => {
    router.replace('/');
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h4 className="mb-6">Sign In</h4>
      <Form
        form={form}
        layout="vertical"
        size="large"
        initialValues={{ remember: true }}
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
          <Password />
        </Item>

        <ClickableComponent
          className="text-left"
          href=""
          variants={['text']}
          scroll={false}
        >
          Fogot password?
        </ClickableComponent>

        <Item label={null}>
          <ClickableComponent
            className="w-full"
            type="submit"
            htmlType="submit"
            variants={['primary', 'button']}
            onClick={onLogin}
          >
            Sign In
          </ClickableComponent>
        </Item>
      </Form>
      <p className="text-grey-100">Don`t have an account yet?</p>
      <ClickableComponent
        href="/signup"
        variants={['text']}
        scroll={false}
      >
        Create a new account
      </ClickableComponent>
    </ModalWrapper>
  );
};

export default SignInForm;
