import React from "react";
import classNames from "classnames";
import NumberFormat from 'react-number-format';
import styles from "./styles.module.scss";

export const Card = ({ user }) => {
  const { email, name, position, phone, photo } = user;

  return <div className={styles.card__wrapper}>
    <div className={styles.card__content}>
      <img className={styles.card__avatar} width='70' height='70' src={photo} alt={name} onError={(e) => {
        e.target.onerror = null
        e.target.src = `./default-avatar.png`
      }} />
      <div className={styles.tooltip}>
        <p className={classNames(styles.ellipsis, styles.card__name)}>{name}</p>
        <span className={classNames(styles.tooltip__text, styles.tooltip__text_name)}>{name}</span>
      </div>
      <ul>
        <li className={styles.tooltip}>
          <p className={styles.ellipsis}>{position}</p>
          <span className={styles.tooltip__text}>{position}</span>
        </li>
        <li className={styles.tooltip}>
          <p className={styles.ellipsis}>{email}</p>
          <span className={styles.tooltip__text}>{email}</span>
        </li>
        <li>
          <NumberFormat value={phone} displayType={'text'} format="+## (###) ### ## ##" />
        </li>
      </ul>
    </div>
  </div>
};

export const MemoizedCard = React.memo(Card);