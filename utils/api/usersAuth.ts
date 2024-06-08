import { UserInterface } from '@/interfaces/user.interface';
import { client } from '../fetchHelps/fetchClient';

export const userPostSignUp = (user: UserInterface) => {
  return client.userSignUp('/auth/register', {
    user_first_name: user.firstName,
    user_last_name: user.lastName,
    user_email: user.userEmail,
    user_password: user.password,
  });
};

type UserForSignIn = Omit<UserInterface, 'firstName' | 'lastName'>;

export const userPostSignIn = (user: UserForSignIn) => {
  return client.userSignIn('/auth/login', {
    user_email: user.userEmail,
    user_password: user.password,
  });
};

export const confirmUserAuth = (queryUserConfirm: string) => {
  return client.confirmUser(`/auth/confirm?${queryUserConfirm}`);
};

export const sendRecoveryCode = (userEmail: string | null) => {
  return client.confirmUser(`/auth/forgotPassword?email=${userEmail}`);
};

export const confirmForgotPassword = (queryUserRecovery: string) => {
  return client.confirmUser(`/auth/confirmForgotPassword?${queryUserRecovery}`);
};
