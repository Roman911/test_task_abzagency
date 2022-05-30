import React from "react";
import { useAxios } from '../../hooks/useAxios';
import styles from './styles.module.scss';
import { Button, Users } from '../';
import { AxiosStateContext, AxiosDispatchContext } from '../../Context/AxiosInstanceProvider';

export const GetRequestLayout = () => {
  const { usersData, page } = React.useContext(AxiosStateContext);
  const dispatch = React.useContext(AxiosDispatchContext);
  const handleClick = () => dispatch({ type: 'setPage' });
  const { data, isLoading, error } = useAxios(`api/v1/users?page=${page}&count=6`);

  React.useEffect(() => {
    dispatch({ type: 'setLoading', payload: isLoading });
    dispatch({ type: 'setError', payload: error });
    if (data) dispatch({ type: 'setUsersData', payload: data?.success && data });
  }, [data, isLoading, error, dispatch]);

  return <div className={styles.getRequest__wrapper}>
    <h1 className={styles.getRequest__title}>Working with GET request</h1>
    <Users />
    {
      usersData?.total_pages !== page && < div className={styles.getRequest__btn}>
        <Button name='Show more' handleClick={handleClick} disabled={isLoading} />
      </div>
    }
  </div>
}