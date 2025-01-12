import React from 'react';
import { useLocation } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const { score } = location.state;

  return (
    <div>
      <h1>Your Score: {score}</h1>
    </div>
  );
}

export default Results;
