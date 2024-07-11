import { UserInterface } from '@/interfaces/user.interface';
import { confirmUserAuth } from '../api/usersAuth';
import { LOCAL_STORAGE_TOKEN_KEY } from '../constants';

interface HandleSignUp {
  inputs: UserInterface;
  varificationCode: string;
  queryUserConfirm: string;
  setLoading: (status: boolean) => void;
  setIsVarification: (status: boolean) => void;
  userLogin: (token: string) => void;
  accountModalHandler: () => void;
}

interface SignInResponse {
  token: string;
}

export const userHandleVarificationLogIn = ({
  inputs,
  varificationCode,
  queryUserConfirm,
  setLoading,
  setIsVarification,
  userLogin,
  accountModalHandler,
}: HandleSignUp) => {
  const TOKEN =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
      : null;

  const resetFields = () => {
    inputs.firstName = '';
    inputs.lastName = '';
    inputs.password = '';
    inputs.userEmail = '';
  };

  if (varificationCode.length < 6 || !inputs.userEmail || !inputs.password)
    return;

  setLoading(true);
  confirmUserAuth(queryUserConfirm)
    .then((response) => {
      alert('User confirmed');

      const signInResponse = response as SignInResponse;

      if (TOKEN === null) {
        userLogin(signInResponse.token);
      }

      resetFields();
      setIsVarification(false);
      accountModalHandler();
    })
    .catch((error) => {
      alert(error);
    })
    .finally(() => {
      setLoading(false);
    });
};
