import { UserInterface } from '@/interfaces/user.interface';
import { userPostSignUp } from '../usersAuth';

interface HandleSignUp {
  inputs: UserInterface;
  setLoading: (status: boolean) => void;
  setIsVarification: (status: boolean) => void;
}

export const userHandleSignUp = ({
  inputs,
  setLoading,
  setIsVarification,
}: HandleSignUp) => {
  if (
    !inputs.firstName ||
    !inputs.lastName ||
    !inputs.password ||
    !inputs.userEmail
  )
    return;

  setLoading(true);
  userPostSignUp(inputs)
    .then(() => {
      setIsVarification(true);
    })
    .catch((error) => {
      alert(error);
    })
    .finally(() => {
      setLoading(false);
    });
};
