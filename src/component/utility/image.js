import React from 'react';
import './image.css'

function Image (props) {
        console.log(props)
    return (
        <div className='imageBox' onClick={props.onClick}>

            {props.images.map((image) =>  
            <div className='photoBox' key={image}><img className='image' src={image} alt={`bookImage-${image}`} /></div>
            )}
            
        </div>
    )
    }

export default Image;    