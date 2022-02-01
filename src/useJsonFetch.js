import {useState, useEffect} from 'react';

export default function useJsonFetch(url, opts) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function getData() {
    setLoading(true);
    fetch(url, opts).then(response => {
      response.ok ? response.json() : setError('Response error!');
    }).then(result=> {
      setData(result);
      setLoading(false);
    })
  }

  useEffect(() => getData());
  return [{data, loading, error}];
}