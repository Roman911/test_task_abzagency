import React from "react";
import classNames from 'classnames';
import styles from './styles.module.scss';

const MyInput = ({ register, error, watch, name, placeholder }) => {

  return <label className={styles.label}>
    <input type="text" {...register(name)} className={classNames(styles.input, { [styles.input_error]: error })} />
    <span className={
      classNames(styles.input__placeholder,
        { [styles.input__placeholder_transform]: watch !== '' },
        { [styles.input__placeholder_error]: error })
    }>
      {placeholder}
    </span>
    {error && <span className={classNames(styles.input__helper, styles.input__helper_red)}>
      {error?.message}
    </span>}
  </label>
};

export default MyInput;