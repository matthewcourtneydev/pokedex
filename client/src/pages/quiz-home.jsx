import React, { useEffect, useState, useContext } from "react";
import QuizCard from "../components/quiz-card";
import { UserContext } from "../contexts/userContext";

const QuizHome = () => {
  const [quizes, setQuizes] = useState();
  const userData = useContext(UserContext);

  async function getQuizes() {
    const response = await fetch("http://localhost:3002/quizes");
    return response.json();
  }

  useEffect(() => {
    getQuizes().then((data) => {
      setQuizes(data);
    });
  }, []);

  return quizes ? (
    <div className="quiz-home page">
      <h1>Quizes</h1>
      <div className="quiz-grid">
        {quizes.map((quiz) => {
          if (userData.user.completedQuizes.includes(quiz._id)) {
            return (
              <a href={`/quizes/${quiz._id}`}>
                <QuizCard quiz={quiz} completed={true} />
              </a>
            );
          } else {
            return (
              <a href={`/quizes/${quiz._id}`}>
                <QuizCard quiz={quiz} completed={false} />
              </a>
            );
          }
        })}
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

export default QuizHome;
