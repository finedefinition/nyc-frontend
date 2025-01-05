import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from 'jwt-decode';

interface DecodedTokenType extends JwtPayload {
  given_name: string;
  family_name: string;
  email: string;
  ['cognito:groups']: string[];
  exp: number;
}

export const setCookie = (token: string) => {
  const decodedToken = jwtDecode<DecodedTokenType>(token);
  const fullName = `${decodedToken.given_name} ${decodedToken.family_name[0]}.`;

  Cookies.set('token', token, {
    expires: new Date(decodedToken.exp * 1000),
  });

  Cookies.set('role', decodedToken['cognito:groups'][0], {
    expires: new Date(decodedToken.exp * 1000),
  });

  Cookies.set('fullName', fullName, {
    expires: new Date(decodedToken.exp * 1000),
  });
};
