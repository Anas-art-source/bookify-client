import Avatar from '@material-ui/core/Avatar';
import TextField from '../utility/textField';
import SendIcon from '@material-ui/icons/Send';
import './addCommentReview.css';
import AddRating from '../utility/addRating';
import useFetch from '../hooks/useFetch';
import ErrorAlert from '../utility/errorAlert';
import { useSelector } from 'react-redux';

import React from 'react';

export default function AddReviewComment (props) {
    const [text, setText] = React.useState();
    const [rating, setRating] = React.useState(0);
    const {sendRequest, isLoading, error, setError , isValid, setIsValid} = useFetch();
    const userLogin = useSelector(state => state.currentUser.login);

    function sendHandler () {

        if (!userLogin) {
            setError("Please Login to proceed");
            setIsValid(false);
            return
            
        }


        if (!props.isComment) {
            // POST TO REVIEW ENDPOINT
            const reviewObj = {
                review: text,
                rating: rating,
                forUser: props.path === "users" ? props.pathId : undefined, 
                forBook: props.path === "books" ? props.pathId : undefined, 
                user: props.user
            }


            
            const response = sendRequest(`http://localhost:1000/api/v1/${props.path}/${props.pathId}/reviews`, "POST", reviewObj);
            setText('');
            setRating(0);


        }
        if (props.isComment) {
            // POST TO COMMENT ENDPOINT
            const commentObj = {
                comment: text,
                forUser: props.pathId,
                user: props.user
            }

            console.log(commentObj, "COMMENT")
            const response = sendRequest(`http://localhost:1000/api/v1/users/${props.pathId}/comments`, "POST", commentObj);
            setText('');

        }
    }

    return (
        <>
        <div className="review-stars">
            {!props.isComment && <AddRating value={rating} setValue={setRating}/>}
        </div>
        {!isValid && <ErrorAlert error={error}/>}
        {isLoading && <h2>Loading...</h2>}

        <div className='add-comment-review-box'>
            <Avatar src={props.img} alt={props.name} />
            <form className='comment-review-form' >
                    <TextField placeholder={props.placeholder} class='add-comment-review' setText={setText} value={text}/>                                
                    <SendIcon className="send-icon" onClick={sendHandler}/>
            </form>
        </div>
        </>
    )
}

// placeholder={props.isComment ? 'Add a comment...' : "Add a review..."} 