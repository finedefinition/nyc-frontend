import { JwtPayload } from 'jwt-decode';

export interface TokenInterface extends JwtPayload {
  given_name?: string;
  family_name?: string;
  email?: string;
}
