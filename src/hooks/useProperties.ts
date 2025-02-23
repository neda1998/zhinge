import { useState, useEffect } from 'react';
import type { IProperty } from '../@types/Property';

const useProperties = (apiUrl: string) => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data: IProperty[]) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return { properties, loading, error };
};

export default useProperties;
