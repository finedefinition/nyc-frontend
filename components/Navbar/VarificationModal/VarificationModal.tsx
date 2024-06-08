import { ChangeEvent, useEffect, useRef } from 'react';

import classNames from 'classnames';

import { Nullable } from '@/interfaces/any.type';
import { useAuth } from '@/context/AuthContext';
import styles from './varificationModal.module.scss';

const VarificationModal = () => {
  const { setCode, varificationCode } = useAuth();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inputRefs = [
    useRef<Nullable<HTMLInputElement>>(null),
    useRef<Nullable<HTMLInputElement>>(null),
    useRef<Nullable<HTMLInputElement>>(null),
    useRef<Nullable<HTMLInputElement>>(null),
    useRef<Nullable<HTMLInputElement>>(null),
    useRef<Nullable<HTMLInputElement>>(null),
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const input = e.target;
    const nextInput = inputRefs[index + 1];
    const currentInput = inputRefs[index];
    const previousInput = inputRefs[index - 1];
    if (!/^[0-9]$/.test(input.value)) {
      input.value = '';
      return;
    }

    const newCode = [...varificationCode];
    newCode[index] = input.value;
    setCode(newCode.join(''));
    input.select();

    if (index === 5 && input.value !== '' && currentInput.current) {
      currentInput.current.blur();
    }
    if (input.value === '') {
      if (previousInput.current) {
        previousInput.current.focus();
      }
    } else if (nextInput && nextInput.current) {
      nextInput.current.select();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = e.target as HTMLInputElement;
    const previousInput = inputRefs[index - 1];
    const currentInput = inputRefs[index];

    if ((e.key === 'Backspace' || e.key === 'Delete') && input.value === '') {
      setCode(
        varificationCode.slice(0, index) + varificationCode.slice(index + 1)
      );

      if (index === 0 && currentInput.current) {
        currentInput.current.focus();
        return;
      }

      if (previousInput.current && index >= 1) {
        previousInput.current.focus();
        return;
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedCode = e.clipboardData.getData('text');
    if (pastedCode.length === 6) {
      setCode(pastedCode);

      inputRefs.forEach((inputRef, index) => {
        if (inputRef.current) {
          inputRef.current.value = pastedCode.charAt(index);
        }
      });
    }
  };

  function handleFocus(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') {
      e.target.select();
    }
  }

  return (
    <>
      <p className={styles.modal__text}>
        Enter the verification code we just sent to you e-mail
      </p>
      <div className={styles.form_group}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <>
            <input
              key={index}
              id={`varificationCode-${index}`}
              name="varificationCode"
              ref={inputRefs[index]}
              type="number"
              maxLength={1}
              autoFocus={index === 0}
              className={classNames(styles.input, styles.varificationInput)}
              onPaste={handlePaste}
              onChange={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={handleFocus}
            />
            {index === 2 && <span className={styles.devider}></span>}
          </>
        ))}
      </div>
    </>
  );
};

export default VarificationModal;
