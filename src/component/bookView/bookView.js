import { useParams } from "react-router"
import React, { useState, useEffect } from 'react';
import Card from '../utility/card';
import ImageModal from "../utility/imageModal";
import PersonIcon from '@material-ui/icons/Person';
import TitleIcon from '@material-ui/icons/Title';
import CreateIcon from '@material-ui/icons/Create';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import Review from '../utility/reviews';
import AddReviewComment from "../utility/addCommentReview";
import useFetch from "../hooks/useFetch";
import Loading from '../utility/loading'
import { capitalize, roundingNumber} from '../helper/format';
import StarsIcon from '@material-ui/icons/Stars';
import './bookView.css'

function BookView () {
    const {bookId} = useParams();
    const [displayModal, setDisplayModal] = useState(false);
    const {sendRequest, isLoading, isValid, error, setIsValid} = useFetch();
    const [book, setBook] = useState()

    function setDisplayModalFalse () {
        setDisplayModal(false)
        console.log("FALSE HERE AT BOOKVIEW Display modal", displayModal)
    }

    function displayModalHandler () {
        console.log("TRUE HERE AT BOOKVIEW Display modal", displayModal)

        setDisplayModal(true)
    }
    
    useEffect (() => {

        async function getData () {
        const response = await sendRequest(`http://localhost:1000/api/v1/books/${bookId}`, "GET")
        setBook(response.data.doc)
        }

        getData()

    }, [])


    if (!book) return <div className="loading-div"><Loading /> </div>

    return (
    <div className='book-view-box'>
        {displayModal && <ImageModal images={book.photos} display={setDisplayModalFalse}/>}

        <div className='book-view-picture-box' onClick={displayModalHandler}>
            <div className='picture-primary-box'>
                            <img src={book.photos[0]} alt={book.name}/>
            </div>

            <div className='picture-secondary-box'>
            {book.photos.length > 1 && book.photos.forEach((photo, index) => {
                             <div className='picture-secondary'><img src={photo} alt={index} key={index}/> </div>
                        
            })}
            </div>  

         

        </div>
            <Card class='book-view-content-box'>
                    <div>
                        <TitleIcon/>
                    <p>Title: {book.name} </p>
                    </div>

                    <div>
                        <CreateIcon/>
                        <p>Author: {book.author}</p>
                    </div>

                    <div>
                        <PersonIcon/>
                        <p>Seller: {capitalize(book.owner.name)}</p>
                    </div>

                    <div>
                        <MonetizationOnIcon/>
                        <p>Price: Rs {book.price}</p>
                    </div>

                    <div>
                        <ImportContactsIcon/>
                        <p>Condition: {book.condition}</p>
                    </div>

                    <div>
                        <LocationOnIcon/>
                        <p>Location: {book.owner.location.city}</p>
                    </div>
                    
                    <div>
                        <StarsIcon/>
                        <p>Rating: {`${roundingNumber(book.averageRating)} ( ${book.ratingCount} reviews )`}</p>
                    </div>


                   
    
            </Card>

            <div className="reviews">
                <Review reviews={book.reviews} />
                <AddReviewComment placeholder="Add a review..." path="books" pathId={book.id}/>
            </div>

          
           
    </div>
    )
}

export default BookView;