import styles from './input.module.scss';

type Props = {
  title: string;
  inputType?: string;
  textarea?: boolean;
};

const Input = ({ title, inputType, textarea }: Props) => {
  const textareaPlaceholder = "Hello,\nI'd like to learn more about your services.";
  const labelText = textarea ? '' : `Your ${title}`;

  return (
    <div className={styles.form_group}>
      {textarea ? (
        <textarea
          id={title}
          className={`${styles.input} ${styles.input__textarea}`}
          placeholder={textareaPlaceholder}
        />
      ) : (
        <input
          id={title}
          type={inputType}
          className={styles.input}
          required
        />
      )}
      <label
        className={styles.label}
        htmlFor={title}
      >
        {labelText}
      </label>
    </div>
  );
};

export default Input;
