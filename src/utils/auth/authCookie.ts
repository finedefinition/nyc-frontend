/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

type DecodedTokenType = {
  exp: number;
  'cognito:groups': string[];
  given_name: string;
  family_name: string;
};

export const addDataToCookie = (token: any) => {
  const decodedToken = jwtDecode<DecodedTokenType>(
    (token as { token: string }).token
  );
  const fullName = `${decodedToken.given_name} ${decodedToken.family_name[0]}.`;
  // Cookies.set('token', JSON.stringify((token as { token: string }).token), {
  //   expires: new Date(decodedToken.exp * 1000),
  // });
  Cookies.set('token', JSON.stringify(token), {
    expires: new Date(decodedToken.exp * 1000),
  });
  Cookies.set('role', decodedToken['cognito:groups'][0], {
    expires: new Date(decodedToken.exp * 1000),
  });
  Cookies.set('fullName', fullName, {
    expires: new Date(decodedToken.exp * 1000),
  });
};
