import React from "react";
import { Card, Preloader } from '../';
import { AxiosStateContext } from '../../Context/AxiosInstanceProvider';
import styles from './styles.module.scss';

export const Users = () => {
  const { usersData, loading, error } = React.useContext(AxiosStateContext);

  if (loading) {
    return <div className={styles.users__preload}>
      <Preloader />
    </div>
  }

  if (error) {
    return <div className={styles.users__preload}>
      Error
    </div>
  }

  return <div className={styles.users__cards}>
    {
      usersData?.users.map(i => {
        return <Card key={i.id} user={i} />
      })
    }
  </div>
}