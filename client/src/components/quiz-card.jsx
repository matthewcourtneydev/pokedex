import React from 'react';

const QuizCard = (props) => {
    console.log(props.quiz._id);
    // /Users/shrek/Desktop/coding_projects/pokedex/client/src/imgs/gym-leaders/6519bb726d92e1555760ddb5.webp
    const imgPath = `./imgs/gym-leaders/${props.quiz.leader}.webp`;
    // import img from `client/src/imgs/gym-leaders/${props.quiz._id}.webp`;
    return (
        
        <div className="quiz-card">
            <img src={imgPath} alt="trainer" />
            <p>{props.quiz.title}</p>
        </div>
    );
}

export default QuizCard;
