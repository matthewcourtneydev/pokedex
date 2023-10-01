import React, { useEffect, useState } from 'react';
import QuizCard from '../components/quiz-card';

const QuizHome = () => {
  const [quizes, setQuizes] = useState();

  async function getQuizes() {
    const response = await fetch("http://localhost:3002/quizes");
    return response.json();
  }

  useEffect(() => {
    getQuizes().then((data) => {
        setQuizes(data)
    })
  }, [])

    return quizes ? (
        <div className="quiz-home page">
            <h1>Quizes</h1>
        <div className="quiz-grid">
        {quizes.map((quiz) => {
            return <QuizCard quiz={quiz}/>
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
}

export default QuizHome;
