import React from 'react';
import axios from 'axios';

const baseUrl = 'https://frontend-test-assignment-api.abz.agency/';

export const useAxios = (url) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState("");
  const [loaded, setLoaded] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const controllerRef = React.useRef(new AbortController());
  const cancel = () => { controllerRef.current.abort() };
  React.useEffect(() => {
    if (url) {
      setLoading(true);
      async function updateApi() {
        try {
          const response = await axios.request({
            signal: controllerRef.current.signal,
            url: baseUrl + url
          });
          setData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoaded(true);
          setLoading(false);
        }
      }
      updateApi();
      return () => cancel
    }
  }, [url]);
  return { cancel, data, error, loaded, isLoading };
};