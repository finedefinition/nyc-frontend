import { ChangeEvent, useEffect, useState } from 'react';

import classNames from 'classnames';
import { Errors } from '@/interfaces/errors.interface';

import Loader from '@/components/Loader/Loader';
import { userPostSignIn } from '@/utils/api/usersAuth';
import { useAuth } from '@/context/AuthContext';
import { useModals } from '@/context/ModalsContext';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/utils/constants';
import styles from './loginModal.module.scss';

type Props = {
  toggleBetweenModals: () => void;
  accountModalLoginHandler: () => void;
};

const LoginModal = ({
  toggleBetweenModals,
  accountModalLoginHandler,
}: Props) => {
  const [inputs, setInputs] = useState({
    userEmail: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [type, setType] = useState('password');
  const { userLogin } = useAuth();
  const { recoveryPasswordHandler } = useModals();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const inputsOnFocus = (e: ChangeEvent<HTMLInputElement>) => {
    for (const error in errors) {
      if (error === e.target.name) {
        const correctedErrors = { ...errors };
        delete correctedErrors[error];
        setErrors(correctedErrors);
      }
    }
  };

  const checkEmailInput = () => {
    let data: string = '';
    if (!inputs.userEmail.trim()) {
      data = 'The email field is required';
    } else if (!/\S+@\S+\.\S+/.test(inputs.userEmail)) {
      data = 'The email is not valid';
    }

    data.length && setErrors((prev) => ({ ...prev, userEmail: data }));
  };

  const checkPasswordInput = () => {
    let data = '';
    if (!inputs.password.trim()) {
      data = 'The password field is required';
    } else if (inputs.password.length < 8) {
      data = 'The password must be at least 8 characters long';
    } else if (inputs.password.length > 50) {
      data = 'The password must not be longer than 50 characters';
    } else if (
      !/[A-Z]/.test(inputs.password) ||
      !/[a-z]/.test(inputs.password)
    ) {
      data =
        'The password must contain at least one uppercase and one lowercase letter';
    }
    data.length && setErrors((prev) => ({ ...prev, password: data }));
  };

  const togglePassword = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  const resetFields = () => {
    inputs.password = '';
    inputs.userEmail = '';
  };

  interface SignInResponse {
    token: string;
  }

  const handleLogIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputs.password || !inputs.userEmail) return;
    const TOKEN =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
        : null;

    setLoading(true);
    userPostSignIn(inputs)
      .then((response) => {
        const signInResponse = response as SignInResponse;

        if (TOKEN === null) {
          userLogin(signInResponse.token);
        }

        resetFields();
        accountModalLoginHandler();
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className={`${styles.modal} ${styles.open}`}>
        <div className={styles.modal__wrapper}>
          <div className={styles.modal__content}>
            <div className={styles.modal__top}>
              <h4 className={styles.header}>Sign In</h4>
            </div>
            <div className={styles.modal__main}>
              <form
                id='signIn-form'
                className={styles.form}
                onSubmit={() => {}}
              >
                <div className={styles.form_group}>
                  <input
                    id='userEmail'
                    name='userEmail'
                    type='email'
                    value={inputs.userEmail}
                    className={classNames(styles.input, {
                      [styles.input__error]: errors.userEmail,
                      [styles.input__success]:
                        inputs.userEmail.trim() && !errors.userEmail,
                    })}
                    onChange={handleChange}
                    onFocus={inputsOnFocus}
                    onBlur={checkEmailInput}
                  />
                  <label
                    className={styles.label}
                    htmlFor='userEmail'
                  >
                    Email
                  </label>
                  {errors.userEmail && (
                    <span className={styles.error_message}>
                      {errors.userEmail}
                    </span>
                  )}
                </div>
                <div className={styles.form_group}>
                  <input
                    id='password'
                    name='password'
                    type={type}
                    value={inputs.password}
                    className={classNames(styles.input, {
                      [styles.input__error]: errors.password,
                      [styles.input__success]:
                        inputs.password.trim() && !errors.password,
                    })}
                    onChange={handleChange}
                    onFocus={inputsOnFocus}
                    onBlur={checkPasswordInput}
                  />
                  <label
                    className={styles.label}
                    htmlFor='password'
                  >
                    Password
                  </label>
                  <span
                    className={classNames(styles.label__password, {
                      [styles.eye]: type === 'password',
                      [styles.eyeOff]: type !== 'password',
                    })}
                    onClick={togglePassword}
                  />
                  {errors.password && (
                    <span className={styles.error_message}>
                      {errors.password}
                    </span>
                  )}
                </div>
              </form>
              <button
                className={styles.form__password}
                onClick={recoveryPasswordHandler}
              >
                Forgot password?
              </button>
              <button
                form='signIn-form'
                className={styles.form__button}
                disabled={loading}
                onClick={handleLogIn}
              >
                {' '}
                {!loading ? 'Sign In' : <Loader />}
              </button>
              <div className={styles.border}>
                <p className={styles.border__line} />
              </div>
            </div>
            <div className={styles.modal__bottom}>
              <p className={styles.account}>
                <span>Don&apos;t have an account yet? </span>
                <span
                  onClick={toggleBetweenModals}
                  className={styles.account__login}
                >
                  Create a new account
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
