// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Quiz() {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/quiz')
//       .then(response => setQuestions(response.data))
//       .catch(error => console.log(error));
//   }, []);

//   const handleAnswerChange = (questionId, answer) => {
//     setAnswers(prevAnswers => 
//       prevAnswers.filter(ans => ans.questionId !== questionId).concat({ questionId, answer })
//     );
//   };

//   const handleSubmit = async () => {
//     try {
//       const userId = 'user-id'; // Retrieve this from local storage or context
//       const response = await axios.post('http://localhost:5000/api/quiz/submit', { userId, answers });
//       navigate('/results', { state: { score: response.data.score } });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       {questions.map(question => (
//         <div key={question._id}>
//           <h3>{question.question}</h3>
//           {question.options.map(option => (
//             <button key={option} onClick={() => handleAnswerChange(question._id, option)}>{option}</button>
//           ))}
//         </div>
//       ))}
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }

// export default Quiz;

import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    // Fetch quiz questions from the backend
    fetch('http://localhost:5000/api/quiz')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching quiz data:', error));
  }, []);

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedAnswer,
    }));
  };

  const handleSubmit = () => {
    fetch('http://localhost:5000/api/quiz/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers: Object.values(answers) }),
    })
      .then((response) => response.json())
      .then((data) => setScore(data.score))
      .catch((error) => console.error('Error submitting quiz:', error));
  };

  return (
    <div>
      <h1>Quiz</h1>
      {questions.length > 0 ? (
        <div>
          {questions.map((question, index) => (
            <div key={index}>
              <p>{question.question}</p>
              {question.options.map((option, idx) => (
                <div key={idx}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleAnswerChange(index, option)}
                    checked={answers[index] === option}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <p>Loading quiz...</p>
      )}
      {score !== null && <p>Your score: {score}</p>}
    </div>
  );
};

export default Quiz;
