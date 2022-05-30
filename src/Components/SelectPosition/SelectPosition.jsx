import React from "react";
import { useAxios } from '../../hooks/useAxios';
import { Preloader } from "../Preloader";
import styles from './styles.module.scss';

export const SelectPosition = ({ register, setValue }) => {
  const { data, isLoading, error } = useAxios('api/v1/positions', 'GET');

  if (isLoading) return <div className={styles.radio__preloader}>
    <Preloader />
  </div>

  if (error) return <div className={styles.radio__preloader}>
    {error.response.status === 404 && <p>"Page not found"</p>}
    {error.response.status === 422 && <p>"Positions not found"</p>}
  </div>

  return <div>
    {data?.positions.map(i => {
      return <div key={i.id} className={styles.radio}>
        <input type="radio" {...register('position_id')} id={i.id} value={i.id} />
        <label htmlFor={i.id} className={styles.radio__label}>{i.name}</label>
      </div>
    })}
  </div>
}