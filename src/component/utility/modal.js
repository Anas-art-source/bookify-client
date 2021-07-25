import { Fragment, useState } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';

import './modal.css';


function ModalJS (props) {
    const [isClicked, setIsClicked] = useState(false);


    return (
        <Fragment>
            <div className={isClicked ? 'display-none' : 'backdrop-modal'} onClick={() => setIsClicked((prevState) => !prevState)}> </div>
            <div className={isClicked ? 'display-none' : 'modal-window'}>
                <div className="close-btn" onClick={() => setIsClicked((prevState) => !prevState)}>
                    <CloseIcon />
                </div>
         
            {props.image && <img src={props.image} className='modal-user-image' />}
            {props.children}
        
            </div>
        </Fragment>
    )
}


export default function Modal (props) {
           return createPortal(<ModalJS image={props.image} children={props.children}/>, document.querySelector('.modal'))
}

