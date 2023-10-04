import React, { useState, useEffect } from "react";
import { useImperativeHandle } from "react";
import { createRoutesFromElements, useParams } from "react-router-dom";

const Quiz = () => {
  let { id } = useParams();
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [question, setQuestion] = useState(0);
  const [score, setScore] = useState(0)

  async function getQuizData() {
    const response = await fetch(`http://localhost:3002/quizes/${id}`);
    return response.json();
  }

  function updateQuiz(quiz) {
    setCurrentQuiz(quiz);
  }

  function handleEndGame() {
    const endScore = (score * currentQuiz.pointsPerQuestion);
    console.log(endScore)
    // TODO
    // add score to user xp then close off quiz. 
    // add badge to the users badges
    // redirect to user page
  }

  function verifyAnswers(e) {
    console.log(e.target.value)
    if (e.target.value) {
      setScore(currentScore => {
        return currentScore + 1;
      });
      // setQuestion(currentQuestion => {
      //   return currentQuestion + 1
      // });
    } else {
      setScore(currentScore => {
        return currentScore + 0;
      });
    }
  }

  useEffect(() => {
    if(currentQuiz.questions) {
      if (question !== (currentQuiz.questions.length - 1)) {
        setQuestion(currentQuestion => {
          return currentQuestion + 1
        });
      } else {
        handleEndGame()
      }
    }
  }, [score])

  useEffect(() => {
    getQuizData().then((data) => {
      updateQuiz(data)
    });
  }, []);


  return currentQuiz && currentQuiz.questions ? (
    <div className="quiz-container page">
      <div className="question-container">
        <img src={currentQuiz.questions[question].img} alt="" />
        <p>{currentQuiz.questions[question].question}</p>
      </div>
      <div className="answer-container">
        <ul className="answers">
          {currentQuiz.questions[question].answers.map((answer) => {
            return <li><button onClick={(e) => verifyAnswers(e)} value={answer.isCorrect}>{answer.name}</button></li>
          })}
        </ul>
      </div>
    </div>
  ) : (
    <div className="loading">
      <div className="loading-content">
        <p>Loading</p>
        <div className="o-pokeball c-loader u-tada"></div>
      </div>
    </div>
  );
};

export default Quiz;
