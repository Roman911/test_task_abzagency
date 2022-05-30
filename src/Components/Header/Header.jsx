import React from "react";
import { Button } from '../';
import styles from './styles.module.scss';

export const Header = () => {
  return <header className={styles.header}>
    <div className={styles.wrapper}>
      <a href="/">
        <img src={`./Logo.png`} alt="Logo" />
      </a>
      <div className={styles.buttonGrup}>
        <Button name='Users' user={true} />
        <Button name='Sign up' />
      </div>
    </div>
  </header>
}