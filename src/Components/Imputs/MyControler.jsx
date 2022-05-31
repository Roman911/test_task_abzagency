import React from "react";
import { Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import classNames from "classnames";
import styles from './styles.module.scss';

const MyControler = ({ control, watch, error }) => {
  return <label className={styles.label}>
    <Controller
      render={({ field: { onChange, value, onBlur } }) => (
        <NumberFormat
          onBlur={onBlur}
          className={classNames(styles.input, { [styles.input_error]: error })}
          allowNegative={false}
          format="+38 (###) ### - ## - ##"
          mask="_"
          onValueChange={(v) => onChange(v.value)}
          value={value}
        />
      )}
      name={'phone'}
      control={control}
      fixedDecimalScale
    />
    <span className={classNames(styles.input__placeholder,
      { [styles.input__placeholder_transform]: watch !== '' },
      { [styles.input__placeholder_error]: error }
    )}>
      Phone
    </span>
    <span className={classNames(styles.input__helper, { [styles.input__helper_red]: error })}>
      {error ? error?.message : '+38 (XXX) XXX - XX - XX'}
    </span>
  </label>
};

export default MyControler;