import React, {Fragment, useEffect, useState} from 'react';
import { ReactDOM } from 'react';
import NavBar from './component/navBar/navBar'
import SearchBox from './component/searchBox/SearchBox';
import BookCardComplete from './component/body/bookCardComplete';
import UserCard from './component/body/userCard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import UserView from './component/userView/userView';
import BookView from './component/bookView/bookView';
import SignUp from './component/signup/signup';
import AddBook from './component/addBook/addBook';
import {useCookies} from 'react-cookie';
import {useDispatch} from "react-redux"
import {currentUserAction} from "./store/currentUser"

// import {useHistory} from 'react-router-dom'

function App() {
  const [cookie, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  

  if (cookie?.currentUserId) dispatch(currentUserAction.login({id: cookie.currentUserId}))






  return (
    <Fragment>
        <NavBar />
          <SearchBox />
      <Switch >
          <Route  path='/' exact>
              <Redirect to='/books' />
          </Route>

          <Route path='/signup' exact >
                <SignUp signup={true} />
          </Route>

          <Route path='/login' exact >
                <SignUp signup={false} />
          </Route>

          <Route path='/books' exact >
                <BookCardComplete />
          </Route>

          <Route path='/users' exact> 
               <UserCard />
          </Route>

          <Route path='/users/:userId' >
              <UserView />
          </Route>

          <Route path='/books/addBook' exact>
              <AddBook />
          </Route>

          <Route path='/books/:bookId' >
              <BookView />
          </Route>
        
      </Switch>
    </Fragment>
  )
}

export default App;
