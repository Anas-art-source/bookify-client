import { Fragment, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import BookCard from './bookCard';
import { booksAction } from '../../store/book';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export default function BookCardComplete () {
    const {sendRequest, isLoading, isValid, error, setIsValid} = useFetch();
    const {books} = useSelector(state => state.book)
    const dispatch = useDispatch()


    useEffect(  () =>  {

        async function getData () {
            const response = await sendRequest('http://localhost:1000/api/v1/books', "GET")

            if (response?.data) {
                dispatch(booksAction.book(response.data[0]))

            }
        }
        getData()

  }, [])


  if (!books) return null


    return (
        <Fragment>
           {books.map(book => <BookCard book={book} key={book._id}/>)} 
        </Fragment>
    )
}