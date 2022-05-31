import React from "react";
import { Header, TopBlock } from "../";
import styles from './styles.module.scss';

const GetRequestLayout = React.lazy(() => import('../Layouts/GetRequestLayout'));
const Registration = React.lazy(() => import('../Registration/Registration'));

export const MainLayout = () => {
  return <main className={styles.wrapper}>
    <Header />
    <TopBlock />
    <GetRequestLayout />
    <Registration />
  </main>
}