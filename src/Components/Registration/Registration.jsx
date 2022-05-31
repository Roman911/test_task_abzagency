import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosStateContext, AxiosDispatchContext } from '../../Context/AxiosInstanceProvider';
import { useAxios } from '../../hooks/useAxios';
import { Button, SelectPosition, Preloader } from '../';
import styles from './styles.module.scss';

const MyControler = React.lazy(() => import('../Imputs/MyControler'));
const MyInput = React.lazy(() => import('../Imputs/MyInput'));
const UploadFile = React.lazy(() => import('../Imputs/UploadFile'));

const phoneRegExp = /^0([0-9]{9})/;
const baseUrl = 'https://frontend-test-assignment-api.abz.agency/';

const schema = yup.object().shape({
  name: yup.string().min(2).max(60).required('Username should contain 2-60 characters'),
  email: yup.string().required('User email, must be a valid email according to RFC2822').min(2).max(100).email(),
  phone: yup.string().matches(phoneRegExp, 'User phone number.Number should start with code of Ukraine +380').min(10),
  photo: yup.mixed().required("Image is invalid.")
});

const defaultValues = { name: '', email: '', phone: '', position_id: '1', photo: null };

const inputConfig = [
  { name: 'name', placeholder: 'Your name' },
  { name: 'email', placeholder: 'Email' }
];

const Registration = () => {
  const [responseData, setResponseData] = React.useState(null);
  const [responseErrors, setResponseError] = React.useState(null);
  const [updateUsers, setUpdateUsers] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);
  const { register, handleSubmit, setError, formState: { isValid, errors, isSubmitted }, control, watch, setValue, reset, clearErrors } =
    useForm({ mode: "onTouched", defaultValues, resolver: yupResolver(schema) });
  const { data: userData, isLoading, error } = useAxios(updateUsers);
  const { data } = useAxios('api/v1/token');

  const { token } = React.useContext(AxiosStateContext);
  const dispatch = React.useContext(AxiosDispatchContext);

  React.useEffect(() => {
    dispatch({ type: 'setToken', payload: data?.success && data?.token });
    dispatch({ type: 'setLoading', payload: isLoading });
    dispatch({ type: 'setError', payload: error });
    if (userData) dispatch({ type: 'setUsersData', payload: userData?.success && userData });
  }, [data, userData, isLoading, error, dispatch]);

  const onSubmit = value => {
    let formData = new FormData();
    formData.append('position_id', value.position_id);
    formData.append('name', value.name);
    formData.append('email', value.email);
    formData.append('phone', `+38${value.phone}`);
    formData.append('photo', value.photo[0]);
    async function updateApi() {
      try {
        const response = await axios.request({
          data: formData,
          method: 'POST',
          url: baseUrl + 'api/v1/users',
          headers: {
            token: token
          },
        });
        setUpdateUsers('api/v1/users?page=1&count=6')
        setResponseData(response.data);
        reset();
      } catch (error) {
        setResponseError(error.response.data);
      } finally {
        setLoaded(true);
      }
    }
    updateApi();
  };

  return <div className={styles.registration}>
    <h1>{responseData ? 'User successfully registered' : 'Working with POST request'} </h1>
    {responseData && <div className={styles.registration__img}>
      <img src={`./success-image.jpg`} alt="successImage" />
    </div>}
    {!responseData && <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {inputConfig.map((i, index) => {
        return <MyInput key={index} register={register} error={errors[i.name]} watch={watch(i.name)} name={i.name} placeholder={i.placeholder} />
      })}
      <MyControler control={control} watch={watch('phone')} error={errors['phone']} />
      <div>
        <p>Select your position</p>
        <SelectPosition register={register} setValue={setValue} />
      </div>
      <UploadFile register={register} watch={watch('photo')} errors={errors} setError={setError} clearErrors={clearErrors} />
      {responseErrors && <p className={styles.registration__error}>{responseErrors.message}</p>}
      <div className={styles.form__btn}>
        <Button name='Sign up' disabled={!isValid || errors?.upload} />
      </div>
    </form>}
    {isSubmitted && !loaded && <div className={styles.registration__backdrop}>
      <Preloader />
    </div>}
  </div>
};

export default Registration;