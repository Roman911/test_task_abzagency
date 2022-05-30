import React from "react";
import { Button } from '../';
import styles from './styles.module.scss';

export const Header = () => {
  return <header className={styles.header}>
    <div className={styles.wrapper}>
      <img src={`./Logo.png`} width='104' height='26' alt="Logo" />
      <div className={styles.buttonGrup}>
        <Button name='Users' user={true} />
        <Button name='Sign up' />
      </div>
    </div>
  </header>
}