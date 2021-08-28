import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Loading = () => {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(currentCount => --currentCount);
    }, 1000);

    // redirect when count is 0
    if (count === 0) {
      history.push('/');
    }

    // cleanup for memory leak
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container p-5 text-center">
      <p className="lead">Redirecting you in {count} seconds</p>
    </div>
  );
};

export default Loading;
