import { useCallback, useState } from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, init = { method: 'GET', body: null, headers: { 'Content-type': 'application-json' } }) => {
    setLoading(true);

    try {
      const response = await fetch(url, init);

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
};

export { useHttp };
