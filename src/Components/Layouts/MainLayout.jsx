import React from "react";
import { Header, GetRequestLayout, Registration, TopBlock } from "../";
import styles from './styles.module.scss';

export const MainLayout = () => {
  return <main className={styles.wrapper}>
    <Header />
    <TopBlock />
    <GetRequestLayout />
    <Registration />
  </main>
}