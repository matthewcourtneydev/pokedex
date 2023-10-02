import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Quiz = () => {
  let { id } = useParams();
  const [currentQuiz, setCurrentQuiz] = useState();
  async function getQuizData() {
    const response = await fetch(`http://localhost:3002/quizes/${id}`);
    return response.json();
  }

  useEffect(() => {
    getQuizData().then((data) => {
      setCurrentQuiz(data);
    });
  }, []);

  return currentQuiz ? (
    <div className="quiz page">this is a quiz page the quiz is {id}</div>
  ) : (
    <div className="loading">
      <div className="loading-content">
        <p>Loading</p>
        <div class="o-pokeball c-loader u-tada"></div>
      </div>
    </div>
  );
};

export default Quiz;
