import React, {useEffect, useReducer, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '../utility/button'
import SearchIcon from '@material-ui/icons/Search';
import './SearchBox.css'
import FilterBox from './FilterBox';
import {useLocation} from 'react-router-dom';
import { booksAction } from '../../store/book';
import {userSearchAction} from '../../store/userSearch'
import useFetch from '../hooks/useFetch'
import { useDispatch } from 'react-redux';
import LinearLoading from '../utility/linearLoading'


const initialState = {
    name: "",
    lessThanPrice: 0,
    greaterThanPrice: 0,
    geoSpatial: "",
    condition: "",
    sort: "", //price and post
    category: ""

}


const searchQueryReducer = (state, action) => {
    if (action.type === "searchText") {
        return state = {...state, name: action.name}
    }

    if (action.type === "price") {
        return state = {...state, lessThanPrice: action.lessThanPrice, greaterThanPrice: action.greaterThanPrice}
    }

    if (action.type === "location") {
        return state = {...state, geoSpatial: action.geoSpatial}

    }

    if (action.type === "condition") {
        return state = {...state, condition: action.condition}
    }

    if (action.type === 'priceSort') {
        const sort = state.sort ? `${state.sort},${action.sort}` : `${action.sort}`
        return state = {...state, sort: sort}
    }

    if (action.type === "category") {
        return state = {...state, category: action.category}
    }

    if (action.type === "recentPost") {
        const sort = state.sort ? `${state.sort},${action.sort}` : `${action.sort}`
        console.log(sort, "SORT")
        return state = {...state, sort: sort }
    }

    if (action.type === "ratingSort") {
        const sort = state.sort ? `${state.sort},${action.sort}` : `${action.sort}`
        return state = {...state, sort: sort}
    }
    return state

}

function SearchBox (props) {

    const [ search, setSearch] = useState("Book");
    const [isFilter, setIsFilter] = useState(false)
    const location = useLocation();
    const [pathname, setPathname] = useState('');
    const [isDisplaySearch, setIsDisplaySearch] = useState(true);
    const [searchQuery, dispatch] = useReducer(searchQueryReducer, initialState);
    const {sendRequest, isLoading, isValid, setError, error, setIsValid} = useFetch();
    const dispatchBookAndUser = useDispatch()

    function filterClickHandler (e) {
         e.preventDefault();
         setIsFilter((prevState) => !prevState)
    }

    async function searchButtonHandler (e) {
        e.preventDefault();
        let queryString = ''
        console.log(searchQuery, "SEARCHQUERY")
        for (let [key, value] of Object.entries(searchQuery)) {

            if (!value) continue

            if (key === 'lessThanPrice') {
                key = 'price[lte]'
            }

            if (key === 'greaterThanPrice') {
                key = 'price[gte]'
            }

            queryString += `${key}=${value}&`
        }

        if (pathname === "Books") {
        const response = await sendRequest(`http://localhost:1000/api/v1/books?${queryString}`, "GET")

        if (response?.message === 'successful') {
            dispatchBookAndUser(booksAction.book(response.data[0]))
        }

        }

        if (pathname === "Users") {
            const response = await sendRequest(`http://localhost:1000/api/v1/users?${queryString}`, "GET");

            if (response?.status === 'successful') {
                dispatchBookAndUser(userSearchAction.user(response.data.doc))
            }
        }
    }

    useEffect(() => {
        if (location.pathname === '/users' || location.pathname === '/books') {
            const path = location.pathname.slice(1)[0].toUpperCase() + location.pathname.slice(2);
            setPathname(path)
            setIsDisplaySearch(true)
           
        } else {
            setIsDisplaySearch(false);
        }
    
        
    }, [pathname, location.pathname])

    function searchTextHandler (e) {
        dispatch({type: "searchText", name: e.target.value})
    }


    return (
            
            <div className={isDisplaySearch ? 'search-wrapper' : "display-none"}>

            <form className='search-box'>
                 <TextField id="outlined-basic" label={`Search ${pathname}`} variant="outlined" className="search-field" onChange={searchTextHandler} />
                 <Button icon={FilterListIcon} class="btn-filter" onClick={filterClickHandler}/>
                 <Button value="Search" class='btn-search' icon={SearchIcon} onClick={searchButtonHandler}/>
         </form>

         {isLoading && <LinearLoading /> }
         {!isValid && <div className="error-div"><h1 className="error">{error}</h1></div>}
            
            {isFilter && <FilterBox path={pathname} dispatch={dispatch} />}
            
                
        </div> 
       
    )
}

export default SearchBox;