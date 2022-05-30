import React from "react";
import classNames from "classnames";
import styles from './styles.module.scss';

export const Button = ({ name, handleClick, disabled, user }) => {
  return <button
    onClick={handleClick ? () => handleClick() : void (0)}
    className={classNames(styles.button, { [styles.button_user]: user })}
    disabled={disabled}
  >
    {name}
  </button>
}