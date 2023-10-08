import React, { useState, useEffect, useContext } from "react";
import { useImperativeHandle } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const Quiz = () => {
  let { id } = useParams();
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [question, setQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const userData = useContext(UserContext);
  const navigate = useNavigate();

  async function getQuizData() {
    const response = await fetch(`http://localhost:3002/quizes/${id}`);
    return response.json();
  }

  function updateQuiz(quiz) {
    setCurrentQuiz(quiz);
  }

  async function updateUser(updatedInfo) {
    console.log(userData)
    const response = await fetch(`http://localhost:3002/users/${userData.user._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedInfo),
    });

    const updatedUser = response.json();
    return updatedUser;
  }

  async function handleEndGame() {
    const endScore = (score * currentQuiz.pointsPerQuestion);
    console.log(currentQuiz)
    const updatedInfo = {
      "newQuiz": {
        "quizId": currentQuiz._id,
        "score": endScore,
        "badge": currentQuiz.badge
      }
    };
    try {
      updateUser(updatedInfo).then((data) => {
        localStorage.setItem("user", JSON.stringify({
          ...JSON.parse(localStorage.getItem("user")),
          "user": data
        }));
        window.location.reload();
        navigate('/quizes')
      })
  
    } catch(err) {
      console.log("ERROR: ", err)
    }
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
