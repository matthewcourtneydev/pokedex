import React from 'react';

const QuizCard = (props) => {
    const imgPath = `./imgs/gym-leaders/${props.quiz.leader}.webp`;

    return (
        <div className="quiz-card">
            <img src={imgPath} alt="trainer" />
            <p>{props.quiz.title}</p>
        </div>
    );
}

export default QuizCard;
