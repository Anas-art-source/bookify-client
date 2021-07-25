import React from 'react';
import './userBookCard.css';
import BookCardSmall from './bookCardSmall';


export default function UserBookCard (props) {


    return (
        <div className="user-bookcard-box">
            {props.books.map(book => <BookCardSmall name={book.name} price={book.price} image={book.photos[0]} allowEdit={props.allowEdit} id={book.id} key={book.id} author={book.author} condition={book.condition} />)}
        </div>
    )
}