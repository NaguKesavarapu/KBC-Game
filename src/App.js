import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css';

const questions = [
  { question: "What is the capital of France?", options: ["A. Paris", "B. Berlin", "C. Rome", "D. Madrid"], correct: "A" },
  { question: "What is 5 + 7?", options: ["A. 10", "B. 11", "C. 12", "D. 13"], correct: "C" }
];

function App() {
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
  }, []);

  const addPlayer = (name) => {
    setPlayers([...players, { name, score: 0 }]);
  };

  const handleAnswerSubmission = (answer) => {
    if (answer === questions[currentQuestion].correct) {
      alert("Correct Answer!");
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
    } else {
      alert("Wrong Answer. Try Again!");
    }
  };

  return (
    <div className="App">
      {!isMobile ? (
        <div className="main-screen">
          <h1>Welcome to the KBC Game</h1>
          <QRCodeCanvas value={window.location.href} />
          <h2>Scan to Join</h2>
          <div className="players-list">
            <h3>Players Joined:</h3>
            {players.map((player, index) => (
              <p key={index}>{player.name}</p>
            ))}
          </div>
          {questions.length > 0 && (
            <div className="question-section">
              <h2>Current Question</h2>
              <p>{questions[currentQuestion].question}</p>
              <div className="options">
                {questions[currentQuestion].options.map((option, index) => (
                  <button key={index}>{option}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mobile-screen">
          <h1>Join the Game</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = e.target.name.value;
              if (name) addPlayer(name);
            }}
          >
            <input type="text" name="name" placeholder="Enter your name" required />
            <button type="submit">Join Game</button>
          </form>
          <div className="question-section">
            <h2>Answer the Question:</h2>
            {questions[currentQuestion] && (
              <div>
                <p>{questions[currentQuestion].question}</p>
                <div className="options">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button key={index} onClick={() => handleAnswerSubmission(option[0])}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
