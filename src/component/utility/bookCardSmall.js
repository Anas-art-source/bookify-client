import React, { useState, Fragment} from 'react';
import './bookCardSmall.css';
import {useHistory} from 'react-router-dom'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Modal from '../utility/modal';
import ModalDeleteBook from './modalDeleteBook';
import ModalEditBook from './modalEditBook';
import BackdropTrans from './backdropTrans';

export default function BookCardSmall (props) {
    const history = useHistory();
    const [displayEditOption, setDisplayEditOption] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false);
    const isProfile = true // false 

    function bookCardClickHandler () {
            history.push(`/books/${props.id}`)
    }

    function displayOptionHandler () {
        setDisplayEditOption((prevState) => !prevState)
    }

    function deleteBookHandler () {
        setDeleteModal((prevState) => !prevState)
    }

    function editBookHandler () {
        setEditModal((prevState) => !prevState)
    }

    function closeOptionHandler () {
        setDisplayEditOption(false)
    }

    return (

        <Fragment>
                {editModal && <ModalEditBook  bookId={props.id} name={props.name}  author={props.author} price={props.price} condition={props.condition}/>}
                {deleteModal && <ModalDeleteBook bookId={props.id}/>}

        <div className="single-bookcard" >
        
        
           {props.allowEdit && <div className='edit-icon' onClick={displayOptionHandler}>
                <MoreVertIcon />
            </div>}

           {displayEditOption && 
           <div className='edit-box'>  
           <BackdropTrans onClick={closeOptionHandler} />
           <p onClick={editBookHandler}>
               Edit
               </p>
          <p onClick={deleteBookHandler}>
               Delete
               </p>
            </div>
             }
           
            <img src={props.image} onClick={bookCardClickHandler} alt={props.name} />
            <div className='detail-box'>
                <h4>{props.name}</h4>
                <p>Rs {props.price}</p>
            </div>
        </div>

        </Fragment>
    )
}