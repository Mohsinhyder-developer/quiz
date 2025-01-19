import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      <Link to="/quiz">Start Quiz</Link> | <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default Home;
