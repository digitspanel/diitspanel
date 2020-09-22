import React, { useState, useEffect, useRef } from 'react';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Verfication from './auth/Verfication';
import Home from './userpages/Home/Home.js';
import Survey from './userpages/Survey/Survey.js';
import Setting from './userpages/Setting/Setting.js';
import Account from './userpages/Account/Account.js';
import UserHeader from './components/ToolBar/Header/UserHeader.js';
import './App.css';
import Inbox from './components/Inbox/Inbox.js';
import fire from './fire';
import { BrowserRouter, Route, Router, Switch, IndexRoute } from 'react-router-dom';

const App = (props) => {

  //Inbox State and Handelling
  const [inboxState, setInboxState] = useState({
    inbox: false
  });

  const inboxStateHandlerShow = () => {
    setInboxState({
      inbox: !inboxState.inbox
    });
  };


  //Login State and Handelling
  const [userLogedIn, setUserLogedIn] = useState('');
  const [loader, setLoader] = useState(false);
  const [onError, setOnError] = useState('');

  const loaderHandler = () => {
    setLoader(!loader);
  }

  const Login = () =>{
    setUserLogedIn(true);
  }

  const Logout = () =>{
    setUserLogedIn(false);
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(User => {
      if (User) {
        setUserLogedIn(true);
      }
      else {
        setUserLogedIn(false);
      }
    });
  }

  useEffect(() => {
    authListener();
  }, []);


  // Toggle between SignIn and SignUp 
  const [userSignUp, setUserSignUp] = useState(false);

  const gotoSignUp = () => {
    setUserSignUp(true);
  }

  const gotoSignIn = () => {
    setUserSignUp(false);
  }

  return (
    <>
        {!userLogedIn
        ?
          <>
            {loader
            ?
              <div style={{width: "100%", height: "100vh", backgroundColor: "blue"}} />
            :
              <div className="App">
              
                {!userSignUp && <SignIn loaderHandlers={loaderHandler} gotoSignUp={gotoSignUp} gotoSignIn={gotoSignIn} Login={Login} />}
                {userSignUp && <SignUp errorCaption={onError} gotoSignIn={gotoSignIn} />}

              </div>
            }
          </>
        :
          <main>

            <UserHeader inboxShow={inboxStateHandlerShow} Logout={Logout} />
            
            <div style={{marginTop: "50px"}}>
              <Inbox show={inboxState.inbox} />
              <Switch>
                <Route path={"/survey"} component={Survey} />
                <Route path={"/account"} component={Account} />
                <Route path={"/setting"} component={Setting} />
                <Route path={"/home"} component={Home} />
                <Route path={"/"} exact component={Home} />
              </Switch>
            </div>
          </main>
        }
    </>
  );
}

export default App;