import React, { useEffect} from 'react';
import { useParams } from 'react-router';
import Cover from '../utility/cover';
import UserImage from '../utility/userImage';
import img from '../../image/hero.jpg';

import Card from '../utility/card';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import TabBar from '../utility/tabBar';
import Review from '../utility/reviews';
import Comment from '../utility/comment';

import UserBookCard from '../utility/userBookCard';
import AddReviewComment from '../utility/addCommentReview';
import './userView.css';
import useFetch from '../hooks/useFetch';
import { useSelector, useDispatch } from 'react-redux';
import { userAction } from '../../store/user';
import ErrorAlert from '../utility/errorAlert';
import Loading from '../utility/loading';
import { formatDate, capitalize, roundingNumber } from '../helper/format';
import { Button } from '@material-ui/core';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';


export default function UserView () {
    const [isComment, setIsComment] = React.useState(true)
    const params = useParams();
    const {sendRequest, isLoading, isValid, error, setIsValid} = useFetch();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user)
    const [cookies] = useCookies()
    const [allowEdit , setAllowEdit] = React.useState(false);
    const history = useHistory()



    let userId = params.userId;
    console.log(isLoading, "LOADING IS USERVIEW")

    function tabBarHandler (value) {
        console.log(value, "VALUE USERVIEW ME AGAYE")
        if (value === 0) {
            setIsComment(true)
        } else {
            setIsComment(false)
        }
    }


    useEffect( () => {

        if (userId === 'my-profile') {
            userId = cookies.currentUserId;
            // dispatch(currentUserAction.login({id: userId}))
            setAllowEdit(true)
        }

        async function getData () {
        const response = await sendRequest(`http://localhost:1000/api/v1/users/${userId}`, 'GET');
        if (response?.data) dispatch(userAction.setUser(response.data.doc))

        // console.log(userData)
       
        }
        getData()
    }, []);


    if (isLoading) {
        return (
            <div className='loading-div'>
                <Loading />
            </div>
        )
    }

    if (!isValid) {
        return (
            <ErrorAlert error={error} />
        )
    }

    if (userData.email.length === 0) {
        return null
    }


    return (
        <div className='user-view'>
            <Cover coverImage={img} />
            <UserImage image={userData.photo} />
            <div className='name-plate-user-view'>
                <h2>{capitalize(userData.name)}</h2>
                <p>{userData.description || "description"}</p>
            </div>

           
            <Card class='card-detail'>
                <div className='card-detail-tab'>
                    <LocationOnOutlinedIcon />
                    <p>Lives in: {capitalize(userData.location.city)}</p>
                </div>

                <div className='card-detail-tab'>
                    <AccountBoxOutlinedIcon />
                    <p>Member since {formatDate(userData.date)}</p>
                </div>

                <div className='card-detail-tab'>
                    <StarOutlinedIcon />
                    <p>Rating: {roundingNumber(userData.averageRating) || 0} ({userData.ratingCount || "No Reviews"}) </p>
                </div>

            </Card>

            {allowEdit && <div className="btn-addbook-wrapper"><Button onClick={() => history.push('/books/addBook')}>Post Book</Button></div>}

            {userData.books.length > 0 && <UserBookCard  allowEdit={allowEdit} books={userData.books}/> }
           
            {userData.books.length === 0 && <div className="btn-addbook-wrapper"><h3>No book to show</h3></div>}
                

            <Card class="card-comment-review">
                     <TabBar labels={['Comments', "Reviews"]} onChange={tabBarHandler} />
                     <div className='comment-review-box'>
                        {isComment ? <Comment comments={userData.comments} />  :  <Review  reviews={userData.reviews}/>}
                       
                        <AddReviewComment placeholder={isComment ? 'Add a comment...' : "Add a review..."} isComment={isComment} pathId={userData.id} path="users" user={userData.id}/>
                        
                     </div>
            </Card>
        </div>
    )

}


{/* <div className='add-comment-review-box'>
                            <Avatar src={img} alt="Anas" />
                            <form className='comment-review-form'>
                                <TextField placeholder={isComment ? 'Add a comment...' : "Add a review..."} class='add-comment-review'/>
                                {/* <textarea onKeyUp={grow}  ref={reviewCommentRef} type='text' placeholder={isComment ? "Add a comment..." : "Add a review..."} className='add-comment-review'/> */}
                                
                        //         <SendIcon className="send-icon" />
                        //     </form>
                        // </div>
                    
                    
                    // */}