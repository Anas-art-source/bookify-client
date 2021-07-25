import Modal from '../utility/modal';
import React, {useEffect, useRef, useState} from 'react';
import './modalEditBook.css';
import Select from '../utility/select'
import useFetch from '../hooks/useFetch';
import  Loading  from '../utility/loading'

export default function ModalEditBook (props) {
    
    const inputRef = useRef();
    const {sendRequest, isLoading, isValid, setError, error, setIsValid} = useFetch();
    const [name, setName] = useState();
    const [author, setAuthor] = useState();
    const [price, setPrice] = useState();
    const [condition, setCondition] = useState();



    useEffect(() => {
        inputRef.current.focus()
    }, [])


    function nameHandler (e) {
        setName(e.target.value)
    }

    function authorHandler (e) {
        setAuthor(e.target.value)
    }

    function priceHandler (e) {
        setPrice(e.target.value)
    }

    function conditionHandler (e) {
        setCondition(e)
    }

    async function editBookHandler (e) {
        e.preventDefault();
        const updateBookObj = {
            name: name,
            price: price,
            condition: condition,
            author: author
        }
        const response = await sendRequest(`http://localhost:1000/api/v1/books/${props.bookId}`, "PATCH", updateBookObj, false);
 
        if (response?.status === "SUCCESSFUL") {
            setIsValid(true)
        }
    }

    return (

        <Modal>
            <div className='edit-book-modal'>
                <h1>
                    Edit Book
                </h1>
                {isLoading && <Loading />}
                {!isValid && <h4 className='error'>{error}</h4>}
                
                <form className="edit-form">
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input defaultValue={props.name} type='text' id='name' ref={inputRef} onChange={nameHandler}></input>
                    </div>

                    <div>
                        <label htmlFor='author'>Author</label>
                        <input defaultValue={props.author} type='text' id='author' onChange={authorHandler}></input>
                    </div>

                    <div>
                        <label htmlFor='price'>Price</label>
                        <input defaultValue={props.price} type='number' id='price' min='0' max='3000' onChange={priceHandler}></input>
                    </div>

                    <div>
                        <Select name="Condition" selectionOptions={['used', 'new']} onChange={conditionHandler} defaultValue={props.condition}/>
                    </div>

                    <div>
                        <a href="/books" onClick={editBookHandler} className="btn-submit">Submit</a>
                    </div>
                </form>

            </div>
        </Modal>
    )
}