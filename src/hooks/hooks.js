import { useCallback, useState } from 'react';

const useHttp = () => {
  const [process, setProcess] = useState('waiting');

  const request = useCallback(async (url, init = { method: 'GET', body: null, headers: { 'Content-type': 'application-json' } }) => {
    setProcess('fetching');

    try {
      const response = await fetch(url, init);

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      setProcess('error');
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    setProcess('fetching');
  }, []);

  return { request, clearError, process, setProcess };
};

export { useHttp };
