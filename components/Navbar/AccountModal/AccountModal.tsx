import React, { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import Close from '@/public/icons/close.svg';
import { Errors } from '@/interfaces/errors.interface';

import Loader from '@/components/Loader/Loader';
import { useAuth } from '@/context/AuthContext';
import { userHandleSignUp } from '@/utils/functions/userSignUp';
import { userHandleVarificationLogIn } from '@/utils/functions/userVarificationLogIn';
import VarificationModal from '../VarificationModal/VarificationModal';
import styles from './accountModal.module.scss';

type Props = {
  toggleBetweenModals: () => void;
  isAccountModalOpen: boolean;
  accountModalHandler: () => void;
};

const AccountModal = ({
  toggleBetweenModals,
  isAccountModalOpen,
  accountModalHandler,
}: Props) => {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    userEmail: '',
    password: '',
  });
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [type, setType] = useState('password');
  const [isVarification, setIsVarification] = useState(false);
  const { varificationCode, userLogin } = useAuth();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const checkFirstNameInput = () => {
    let data: string = '';
    if (!inputs.firstName.trim()) {
      data = 'The first name field is required';
    } else if (
      !/^[a-zA-Zа-яА-ЯіёЁĀ-žŠĐŽČćžšđčŚŹŃĄĘŚŁŻĆŹńąęśłżćźÆØÅæøå\s]+$/.test(
        inputs.firstName
      )
    ) {
      data = 'The first name must contain only letters';
    } else if (inputs.firstName.length < 4) {
      data = 'The first name must longer than 3 characters';
    } else if (inputs.firstName.length > 30) {
      data = 'The first name must not be longer than 30 characters';
    }

    data.length && setErrors((prev) => ({ ...prev, firstName: data }));
  };

  const checkLastNameInput = () => {
    let data: string = '';
    if (!inputs.lastName.trim()) {
      data = 'The last name field is required';
    } else if (
      !/^[a-zA-Zа-яА-ЯіёЁĀ-žŠĐŽČćžšđčŚŹŃĄĘŚŁŻĆŹńąęśłżćźÆØÅæøå\s]+$/.test(
        inputs.lastName
      )
    ) {
      data = 'The name must contain only letters';
    } else if (inputs.lastName.length < 4) {
      data = 'The last name must longer than 3 characters';
    } else if (inputs.lastName.length > 30) {
      data = 'The last name must not be longer than 30 characters';
    }
    data.length && setErrors((prev) => ({ ...prev, lastName: data }));
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

  const inputsOnFocus = (e: ChangeEvent<HTMLInputElement>) => {
    for (const error in errors) {
      if (error === e.target.name) {
        const correctedErrors = { ...errors };
        delete correctedErrors[error];
        setErrors(correctedErrors);
      }
    }
  };

  const togglePassword = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVarification) {
      userHandleSignUp({ inputs, setLoading, setIsVarification });
    } else if (isVarification) {
      const signUpParams = new URLSearchParams(searchParams.toString());
      signUpParams.append('email', inputs.userEmail);
      signUpParams.append('password', inputs.password);
      signUpParams.append('confirmationCode', varificationCode);

      const queryUserConfirm = signUpParams.toString();

      userHandleVarificationLogIn({
        inputs,
        varificationCode,
        queryUserConfirm,
        setLoading,
        setIsVarification,
        userLogin,
        accountModalHandler,
      });
    }
  };

  const submitButtonText = isVarification ? 'Verify' : 'Create a new account';
  const formName = isVarification ? 'varification-form' : 'auth-form';

  return (
    <>
      <div
        className={`${styles.modal} ${isAccountModalOpen ? styles.open : ''}`}
      >
        <div className={styles.modal__wrapper}>
          <div className={styles.modal__content}>
            <div
              onClick={accountModalHandler}
              className={styles.close}
            >
              <Image
                src={Close}
                alt="Close"
              />
            </div>
            <div className={styles.modal__top}>
              <h4 className={styles.header}>Create a new account</h4>
            </div>
            <div className={styles.modal__main}>
              <form
                id={formName}
                className={styles.form}
                onSubmit={() => {}}
              >
                <div className={styles.form_group}>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={inputs.firstName}
                    className={classNames(styles.input, {
                      [styles.input__error]: errors.firstName,
                      [styles.input__success]:
                        inputs.firstName.trim() && !errors.firstName,
                    })}
                    onChange={handleChange}
                    onFocus={inputsOnFocus}
                    onBlur={checkFirstNameInput}
                    disabled={isVarification}
                  />
                  <label
                    className={styles.label}
                    htmlFor="firstName"
                  >
                    First name
                  </label>
                  {errors.firstName && (
                    <span className={styles.error_message}>
                      {errors.firstName}
                    </span>
                  )}
                </div>
                <div className={styles.form_group}>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={inputs.lastName}
                    className={classNames(styles.input, {
                      [styles.input__error]: errors.lastName,
                      [styles.input__success]:
                        inputs.lastName.trim() && !errors.lastName,
                    })}
                    onChange={handleChange}
                    onFocus={inputsOnFocus}
                    onBlur={checkLastNameInput}
                    disabled={isVarification}
                  />
                  <label
                    className={styles.label}
                    htmlFor="lastName"
                  >
                    Last name
                  </label>
                  {errors.lastName && (
                    <span className={styles.error_message}>
                      {errors.lastName}
                    </span>
                  )}
                </div>
                <div className={styles.form_group}>
                  <input
                    id="userEmail"
                    name="userEmail"
                    type="email"
                    value={inputs.userEmail}
                    className={classNames(styles.input, {
                      [styles.input__error]: errors.userEmail,
                      [styles.input__success]:
                        inputs.userEmail.trim() && !errors.userEmail,
                    })}
                    onChange={handleChange}
                    onFocus={inputsOnFocus}
                    onBlur={checkEmailInput}
                    disabled={isVarification}
                  />
                  <label
                    className={styles.label}
                    htmlFor="userEmail"
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
                    id="password"
                    name="password"
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
                    disabled={isVarification}
                  />
                  <label
                    className={styles.label}
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <span
                    className={`${styles.label__password} ${
                      type === 'password' ? styles.eye : styles.eyeOff
                    }`}
                    onClick={togglePassword}
                  />
                  {errors.password && (
                    <span className={styles.error_message}>
                      {errors.password}
                    </span>
                  )}
                </div>
                {isVarification && (
                  <div className={styles.form_group}>
                    <VarificationModal />
                  </div>
                )}
              </form>

              {!isVarification && (
                <p className={styles.form_terms}>
                  By creating an account, you agree to our{' '}
                  <Link
                    href="/terms-of-use"
                    className={styles.form_terms__link}
                    onClick={accountModalHandler}
                  >
                    Terms of use
                  </Link>{' '}
                  ,{' '}
                  <Link
                    href="/privacy-policy"
                    className={styles.form_terms__link}
                    onClick={accountModalHandler}
                  >
                    Privacy policy
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/cookies-policy"
                    className={styles.form_terms__link}
                    onClick={accountModalHandler}
                  >
                    Cookies policy
                  </Link>
                </p>
              )}
              <button
                form={isVarification ? 'varification-form' : 'auth-form'}
                className={styles.form__button}
                disabled={loading}
                onClick={handleSubmit}
              >
                {!loading ? submitButtonText : <Loader />}
              </button>
            </div>
            {!isVarification && (
              <div className={styles.modal__bottom}>
                <p className={styles.account}>
                  <span>Already have an account? </span>
                  <span
                    onClick={toggleBetweenModals}
                    className={styles.account__login}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountModal;
