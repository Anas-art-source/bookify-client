import React from 'react';
import './card.css'

function Card (props) {

    const styleClasses = `card ${props.class}`
    return (
        <div className={styleClasses} onClick={props.onClick}>
            {props.children}
        </div>
    )
}

export default Card;