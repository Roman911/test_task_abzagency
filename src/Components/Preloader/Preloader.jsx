import React from "react";
import styles from './styles.module.scss'

export const Preloader = () => {
  return <div className={styles.ldsRing}>
    <div />
    <div />
    <div />
    <div />
  </div>
}