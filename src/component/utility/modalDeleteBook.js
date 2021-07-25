import Modal from '../utility/modal'
import './modalDeleteBook.css'
import useFetch from '../hooks/useFetch';
import { LinearProgress } from '@material-ui/core';
import { useState } from 'react';

export default function ModalDeleteBook (props) {
    const {sendRequest, isLoading, isValid, setError, error, setIsValid} = useFetch()
    const [response, setResponse] = useState(null)


    async function deleteBookHandler () {
        const response = await sendRequest(`http://localhost:1000/api/v1/books/${props.bookId}`, "DELETE");
        console.log(response)

        if (response?.status === "SUCCESSFULLY DELETED") {
            setResponse(response.status)
        }
    
    }

    return (

        <Modal class="delete-modal">
            {isLoading && <LinearProgress />}
            {response && <div className="delete-modal"><h4>{response}</h4></div>}
            {error && <div className="delete-modal"><h4>{error}</h4></div>}
            {!response && <div  className="delete-modal">
                <h3>Are you sure you want to delete this book!</h3>
                <h4>Name of Book</h4>
            <div className='delete-modal-action'>
                <button>Cancel</button>
                <button className="btn-confirm" onClick={deleteBookHandler}>Confirm</button>
            </div>
            </div> }
        </Modal>
    )
}