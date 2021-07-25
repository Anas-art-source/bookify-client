import React, { useState } from "react";
import './cardDescription.css';
import {capitalize} from '../helper/format'
import { useHistory } from 'react-router-dom';

function CardDescription (props) {
    const [desActive, setDesActive] = useState(false);
    const history = useHistory()
    
    const bookDescriptionHandler = () => {
        setDesActive(true)
        console.log("HERE", desActive)
    }

    function onClickBook (e) {
        e.preventDefault();
        history.push(`/books/${props.id}`)
    }

    return (
        <div className='descriptionBox'>
            <a href={`/books/${props.id}`} onClick={onClickBook} className="bookTitle">{capitalize(props.name)}</a>
            <div className='descriptionTextBox'>
                <p className={desActive ? 'descriptionTextBox descriptionTextBox-reveal' : 'descriptionTextBox'} onClick={bookDescriptionHandler}> 
                    Author: {capitalize(props.author)}

                 </p>
             </div>
        </div>
    )
}

export default CardDescription;