import './cover.css'
import React, {useState} from 'react';
import Modal from '../utility/modal';

export default function Cover (props) {
    const [displayModal, setDisplayModal] = useState(false)


    return (
        <div className='cover' onClick={() => setDisplayModal((prevState) => !prevState)}>
            <img src={props.coverImage} className="cover-image"/>
            {displayModal && <Modal image={props.coverImage}/>}
            
        </div>
    )
}