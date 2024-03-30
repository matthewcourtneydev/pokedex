import React from 'react';

const MiniButton = (props) => {
    return (
        <div className={`mini-button ${props.name}`}>
            <h3>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h3>
        </div>
    );
}

export default MiniButton;
