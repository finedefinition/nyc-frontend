'use client';

import { useRouter } from 'next/navigation';
import type { FormProps } from 'antd';
import { Form, Input } from 'antd';
import { apiUser } from '@/utils/api/apiUser';
import { setCookie } from '@/utils/auth/authCookie';
import ClickableComponent from '../ClickableComponent/ClickableComponent';
import ModalWrapper from '../Modals/ModalWrapper';

const { Item } = Form;
const { Password } = Input;

type FieldType = {
  user_email?: string;
  user_password?: string;
};

interface SignInResponse {
  token: string;
}

const SignInForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const onClose = () => {
    router.back();
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const response = await apiUser.userSignIn('/auth/login', values);
      const signInResponse = response as SignInResponse;
      setCookie(signInResponse.token);
      router.push('/');
      router.refresh();
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error during sign in:', error);
    }
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
