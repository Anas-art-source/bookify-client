import React, { useState } from 'react';
import Card from '../utility/card';
import CardHeader from '../utility/cardHeader';
import CardDescription from '../utility/cardDescription';
import Image from '../utility/image';
import Review from '../utility/reviews';
import Button from '../utility/button';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '../utility/textField';
import AddRating from '../utility/addRating'
import ImageModal from '../utility/imageModal';
import useFetch from '../hooks/useFetch';
import { useCookies } from 'react-cookie';
import ErrorAlert from '../utility/errorAlert'
import LinearLoading from '../utility/linearLoading'
import SuccessAlert from '../utility/successfulAlert';
import {useSelector} from 'react-redux';


import './bookCard.css';

function BookCard ({book}) {

    const [isReviewClicked, setIsReviewClicked] = useState(false)
    const [displayModal, setDisplayModal] = useState(false);
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [submitedReview, setSubmitedReview] = useState(false);
    const userIsOnline = useSelector(state => state.currentUser.login)
    console.log(userIsOnline, "CHECKING USER LOG IN")

    let {sendRequest, isLoading, isValid, setError, error, setIsValid} = useFetch();
    const [cookie, setCookie, removeCookie] = useCookies();
    const currentUserId = cookie.currentUserId;

    function reviewButtonHandler () {
        setIsReviewClicked((prevState) => !prevState)
    }

    function displayModalHandler () {
        setDisplayModal(true)
    }

    function setDisplayModalFalse () {
        setDisplayModal(false)
    }

    async function submitReviewHandler () {

        if (!userIsOnline) {
            setError("Please Login to proceed")
            setIsValid(false)
            return
        }
        const reviewObj = {
            review: review,
            rating: rating,
            forBook: book._id,
            user: currentUserId
        }
        const response = await sendRequest(`http://localhost:1000/api/v1/books/${book._id}/reviews`, "POST", reviewObj, false)

        if (response?.status === 'successful') {
            setSubmitedReview(true)
        }
        console.log(response, "RESPONSE OF REVIEW ADDING")

    }


    return (
        <Card >
            <CardHeader  ownerName={book.owner.name} ownerPhoto={book.owner.photo} ownerId={book.owner._id} date={book.date} price={book.price} averageRating={book.averageRating} />
            <CardDescription name={book.name} author={book.author} id={book._id} />
            <Image images={book.photos} onClick={displayModalHandler} />
            <Review reviews={book.reviews} />

            {!isValid && <ErrorAlert error={error}/> }
            {isLoading && <LinearLoading />}
            {submitedReview && <SuccessAlert success="Successfully added review" />}

            <div className={isReviewClicked ? 'review-write' : 'review-write hidden'}>
                {isReviewClicked &&  <AddRating setValue={setRating} />   }
               {isReviewClicked && <TextField placeholder="Add a review..."  setText={setReview}/>}
            </div>

            <div className='action'>
            {isReviewClicked ? <Button value="Post Review" icon={CreateIcon} class="btn-review-bookcard" onClick={submitReviewHandler}/> : <Button value="Review" icon={CreateIcon} class="btn-review-bookcard" onClick={reviewButtonHandler} /> }
            </div>
            {displayModal && <ImageModal images={book.photos} display={setDisplayModalFalse}/>}
        </Card>
    )

}

export default BookCard;