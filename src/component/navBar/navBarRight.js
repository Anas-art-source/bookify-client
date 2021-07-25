import { useHistory } from 'react-router-dom'
import './navBarRight.css';
import { useSelector, useDispatch } from 'react-redux';
import {useCookies} from "react-cookie";
import { currentUserAction } from '../../store/currentUser';

export default function NavBarRight () {
    const history = useHistory();
    const login = useSelector(state => state.currentUser.login);
    const [cookie, setCookie, removeCookie] = useCookies()
    const dispatch = useDispatch();

    const anchorClickHandler = (e) => {
        e.preventDefault()
         history.push(`/${e.target.href.split('/')[3]}`)   
        
    }

    function logoutHandler (e)  {
        e.preventDefault();
        removeCookie("currentUserId");
        removeCookie('jwt')
        dispatch(currentUserAction.logout())
        history.push('/login')

        console.log(cookie.userId, "HERE IN SIGNOUT")
    }
    
    
    return (
        
        <div className="navbar-right">
            {!login && <a href='/login'  onClick={anchorClickHandler}>Log in</a> }
            {!login && <a href='/signup' onClick={anchorClickHandler} >Sign up</a> }
            {login && <a href="/login" onClick={logoutHandler} >Log Out</a> }
            
        </div>
    )
}