import React, { useState } from 'react';
import Modal from './modal';
import './userImage.css'

export default function UserImage (props) {

    const [displayModal, setDisplayModal] = useState(false)


    return (
        <div className='user-image-box' onClick={() => setDisplayModal((prevState) => !prevState)}>
            <img src={props.image} className='user-image'/>
            {displayModal && <Modal image={props.image} />}
        </div>
    )
}

