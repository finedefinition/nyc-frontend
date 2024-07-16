import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import { Errors } from '@/interfaces/errors.interface';

import Loader from '@/components/Loader/Loader';
import { useAuth } from '@/context/AuthContext';
import { useModals } from '@/context/ModalsContext';
import { confirmForgotPassword, sendRecoveryCode } from '@/utils/api/usersAuth';
import { recoveryModalText } from '@/utils/componentsData/componentsTexts';
import VarificationModal from '../VarificationModal/VarificationModal';
import styles from './recoveryModal.module.scss';

const RecoveryModal = () => {
  const [inputs, setInputs] = useState({
    userEmail: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isRecovering, setIsRecovering] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const { varificationCode } = useAuth();
  const { isRecoveryModalOpen, recoveryPasswordHandler } = useModals();

  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const formName = isRecovering
    ? recoveryModalText.recoveringFormPassword
    : recoveryModalText.recoveringFormEmail;

  const submitText = isRecovering
    ? recoveryModalText.submitTextPassword
    : recoveryModalText.submitTextEmail;

  const captionText = isRecovering
    ? recoveryModalText.captionTextPassword
    : recoveryModalText.captionTextEmail;

  const titleText = isRecovering
    ? recoveryModalText.titleTextPassword
    : recoveryModalText.titleTextEmail;

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

  const checkPasswordInput = (e: React.FocusEvent<HTMLInputElement>) => {
    let data = '';
    const { name, value } = e.target;

    if (!value.trim()) {
      data = 'The password field is required';
    } else if (value.length < 8 || value.length < 8) {
      data = 'The password must be at least 8 characters long';
    } else if (value.length > 50) {
      data = 'The password must not be longer than 50 characters';
    } else if (inputs.newPassword !== inputs.newPasswordConfirm) {
      data = 'Passwords should match';
    } else {
      setErrors({});
    }
    data.length && setErrors((prev) => ({ ...prev, [name]: data }));
  };

  const resetFields = () => {
    setInputs({
      userEmail: '',
      newPassword: '',
      newPasswordConfirm: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isRecovering) {
      checkEmailInput();
      if (!inputs.userEmail) return;
      setLoading(true);
      sendRecoveryCode(inputs.userEmail)
        .then(() => {
          setIsRecovering(true);
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (isRecovering) {
      const { newPassword } = inputs;
      if (!newPassword || !varificationCode) return;

      setLoading(true);

      const signUpParams = new URLSearchParams(searchParams.toString());
      signUpParams.append('email', inputs.userEmail);
      signUpParams.append('confirmationCode', varificationCode);
      signUpParams.append('newPassword', newPassword);

      const queryUserRecovery = signUpParams.toString();

      confirmForgotPassword(queryUserRecovery)
        .then(() => {
          resetFields();
          recoveryPasswordHandler();
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className={`${styles.modal} ${styles.open}`}>
        <div className={styles.modal__wrapper}>
          <div className={styles.modal__content}>
            <div className={styles.modal__top}>
              <h4 className={styles.header}>{titleText}</h4>
            </div>
            <p className={styles.modal__text}>{captionText}</p>
            <div className={styles.modal__main}>
              <form
                id={formName}
                className={styles.form}
                onSubmit={() => {}}
              >
                {!isRecovering ? (
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
                ) : (
                  <>
                    <div className={styles.form_group}>
                      <input
                        id='newPassword'
                        name='newPassword'
                        type={showNewPassword ? 'text' : 'password'}
                        value={inputs.newPassword}
                        className={classNames(styles.input, {
                          [styles.input__error]: errors.newPassword,
                          [styles.input__success]:
                            inputs.newPassword.trim() && !errors.newPassword,
                        })}
                        autoFocus={isRecovering}
                        onChange={handleChange}
                        onFocus={inputsOnFocus}
                        onBlur={checkPasswordInput}
                      />
                      <label
                        className={styles.label}
                        htmlFor='newPassword'
                      >
                        Password
                      </label>
                      <span
                        className={`${styles.label__password} ${
                          showNewPassword ? styles.eye : styles.eyeOff
                        }`}
                        onClick={toggleShowNewPassword}
                        data-password='newPassword'
                      />
                      {errors.newPassword && (
                        <span className={styles.error_message}>
                          {errors.newPassword}
                        </span>
                      )}
                    </div>
                    <div className={styles.form_group}>
                      <input
                        id='newPasswordConfirm'
                        name='newPasswordConfirm'
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={inputs.newPasswordConfirm}
                        className={classNames(styles.input, {
                          [styles.input__error]: errors.newPasswordConfirm,
                          [styles.input__success]:
                            inputs.newPasswordConfirm.trim() &&
                            !errors.newPasswordConfirm,
                        })}
                        onChange={handleChange}
                        onFocus={inputsOnFocus}
                        onBlur={checkPasswordInput}
                      />
                      <label
                        className={styles.label}
                        htmlFor='newPasswordConfirm'
                      >
                        Confirm Password
                      </label>
                      <span
                        ref={ref}
                        className={`${styles.label__password} ${
                          showConfirmPassword ? styles.eye : styles.eyeOff
                        }`}
                        onClick={toggleShowConfirmPassword}
                        data-password='newPasswordConfirm'
                      />
                      {errors.newPasswordConfirm && (
                        <span className={styles.error_message}>
                          {errors.newPasswordConfirm}
                        </span>
                      )}
                    </div>
                    <VarificationModal />
                  </>
                )}
              </form>
              <button
                form={formName}
                className={styles.form__button}
                disabled={loading}
                onClick={handleSubmit}
              >
                {' '}
                {!loading ? submitText : <Loader />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecoveryModal;
