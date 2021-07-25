import React, {Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import { capitalize, formatDate } from '../helper/format';

import './review.css';



function Review (props) {

    if (props.reviews.length === 0 ) {
        return (
        <div className='mainReviewBox'>
            <h1 className='review-heading'>Reviews </h1>
            <div className="review">
                <h3 className='no-reviews'>No Reviews Yet</h3>
            </div>
        </div>
        )
    }


    return (
        <div className='mainReviewBox'>
            <h1 className='review-heading'>Reviews </h1>
      
            {props.reviews.map(review =>
            <div className="review" key={review._id}>
                <Avatar src={review.user.photo} alt="Anas" />
                <div className='rightBox'>
                    <div className="name-and-rating-box"> 
                        <a href={`/users/${review.user._id}`} className='user-name'>{capitalize(review.user.name)} <span className="review-date"> {`( ${formatDate(review.date)} )`}</span></a>
                        <Rating name="read-only" value={review.rating} readOnly />
                    </div>
                    <div className='review-box'>
                        <p className='review-content'>{review.review}</p>
                    </div>
                </div>
            </div>
            )}
      
        </div>
    )
}

export default Review;