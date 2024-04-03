import React from 'react';
import AttackCard from './attack-card';

const Moves = (props) => {
    console.log(props.movesArray);

    let twoRandomMoves = props.movesArray.sort(() => Math.random() - 0.5).slice(0, 2);
    console.log(twoRandomMoves);
    return (
        <div className="wrapper moves">
            <div className="left">
                <AttackCard move={twoRandomMoves[0]} />
            </div>
            <div className="right">
                <AttackCard move={twoRandomMoves[1]} />
            </div>
        </div> 
    );
}

export default Moves;
