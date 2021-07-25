import Card from "../utility/card"
import './userCard.css';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { useHistory } from "react-router";
import React, {useEffect} from "react";
import useFetch from "../hooks/useFetch";
import { capitalize, roundingNumber } from "../helper/format";
import { useSelector } from "react-redux";
import { userSearchAction } from "../../store/userSearch";
import { useDispatch } from "react-redux";

export default function UserCard () {

    const history = useHistory();
    const {sendRequest, isLoading, isValid, error, setIsValid} = useFetch();
    const userSearch = useSelector(state => state.userSearch.userSearch)
    const dispatchUserSearch = useDispatch()
    console.log(userSearch, "USERSEARCH")
  

    useEffect(() => {
        // API CALL HERE
        async function getData () {
            const response = await sendRequest('http://localhost:1000/api/v1/users', 'GET');
            if (response?.data) {
                dispatchUserSearch(userSearchAction.user(response.data.doc))
            }
        }
        getData()
    }, [])

    

    return (
        <>
        {userSearch.map(user =>
        <Card class='user-card' onClick={() => history.push(`/users/${user._id}`)} key={user.id}>
            <div className="introduction">
                     <Avatar alt={user.name} src={user.photo} />
                     <h1 className='name' onClick={() => history.push(`/users/${user._id}`)}>{capitalize(user.name)}</h1>
            </div>
            <Rating name="read-only" value={roundingNumber(user.averageRating)} readOnly />
            <div className='locationBox'>
                <LocationOnOutlinedIcon />
                <h3 className='city-name'>{user.location.city}</h3>
            </div>
            
        </Card>
         )}
        </>
    )
}