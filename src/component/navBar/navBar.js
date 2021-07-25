import React, { useEffect, useState, Fragment } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import './navBar.css';
import {useHistory} from 'react-router-dom';
import NavBarRight from './navBarRight';
import { useSelector } from 'react-redux';

function NavBar () {

    const [URL, setURL] = useState('')
    const history = useHistory();
    const login = useSelector(state => state.currentUser.login)


    const changeURLHandler = (event, newValue) => {
        setURL(prevValue => newValue);
    }

    useEffect( () => {
        // API CALL WILL BE DONE HERE
        // WE WILL USE REDUX TO STORE DATA
        if (URL === "") return
        history.push(URL)
        console.log(URL)
    }, [URL, history])

    return (

        <div className="navBar-box">
            <div className="navBar-left">
                <h1>Bookify</h1>

            </div>

            <div className="navBar-center">
                <nav className="navigation">
                    <a href="/books" onClick={(e) => {
                        e.preventDefault();
                        history.push('/books')
                    }}>
                        <MenuBookIcon />
                        <h4>Books</h4>
                        
                    </a>
                    <a href="/users" onClick={(e) => {
                        e.preventDefault();
                        history.push('/users')
                    }}>
                        <PeopleIcon />
                        <h4>Users</h4>

                    </a>
                    {login && <a href="/users/my-profile" className='navigation-anchor' onClick={(e) => {
                        e.preventDefault();
                        history.push('/users/my-profile')
                    }}>
                        <PersonIcon />
                        <h4>My Profile</h4>
                    </a>}
                </nav>
            </div>

            
               <NavBarRight />
          
            
        </div>

       
    )
}

export default NavBar;



// <div className='navBar-box'>
// <NavBarRight />
// <BottomNavigation
// value={URL}
// onChange={changeURLHandler}
// showLabels
// className="navBar"
// >
//  <a href='/books'><MenuBookIcon /></a>
//  <a href='/users'><PeopleIcon /></a>
//  {login && <a href='/users/my-profile'><PersonIcon /></a>}
//   {/* <BottomNavigationAction label="Books" value='/books' icon={<MenuBookIcon />} /> */}
//   {/* <BottomNavigationAction label="Users" value='/users' icon={<PeopleIcon />}  /> */}
//   {/* {login && <BottomNavigationAction label="My Profile" value='/users/my-profile' icon={<PersonIcon />} />} */}
  
// </BottomNavigation>


//   <NavBarRight />
// </div>