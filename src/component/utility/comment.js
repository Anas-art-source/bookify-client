import React, {Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import {formatDate, capitalize} from '../helper/format'
import './comment.css';



function Comment (props) {

    if (!props.comments || props.comments.length === 0) {
        return (
        <div className='mainReviewBox'>
            <h1 className='review-heading'>Comments </h1>
        <div className="review">
            <h4 className="no-comments">No Comments Yet</h4>
        </div>
        </div>
        )
    } 


    return (
        <div className='mainReviewBox'>
            <h1 className='review-heading'>Comments </h1>
        {props.comments.map(comment => 
        <div className="review" key={comment._id}>
             <Avatar src={comment.user.photo} alt="Anas" />
                <div className='rightBox'>
                    <a className='user-name' href={`/users/${comment.user._id}`}>{capitalize(comment.user.name)} <span className="date-label"> {`( ${formatDate(comment.date)} )`} </span></a>
                    <div className='review-box'>
                        <p className='review-content'>{comment.comment}</p>
                    </div>
                </div>

        </div>
        )}
        </div>
    )
}

export default Comment;