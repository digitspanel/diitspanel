import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import AppLoader from './components/AppLoader'
import * as UserActions from './store/actions/usersAction';
import * as AuthActions from './store/actions/authActions';
import * as Actions from './store/actions/usersAction';
import * as SurveyActions from './store/actions/surveysAction';
import { connect, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from 'react-router-dom';
import createActivityDetector from 'activity-detector';
import Routes from "./routes/Routes";

const App = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthActions.authentication());
  },[]);

  // Checking user Activity Status

  useEffect(() => {
    const activityDetector = createActivityDetector({timeToIdle: 1000 * 60 * 30 });
    activityDetector.on('idle', () => {
      const interval = setInterval(() => {
        props.setActivityStatus("Inactive");
      }, 6000000);
      // 120000
      return () => { clearInterval(interval) }
    });
    activityDetector.on('active', () => props.setActivityStatus("Active"));
  }, []);


  return (
    <>
        <AppLoader />
        <Routes />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActivityStatus: (val) => dispatch(UserActions.updateUserActivityStatus(val)),
    setLogin: (val) => dispatch(AuthActions.setLogin(val)),
    loadSurvey: () => dispatch(SurveyActions.loadList()),
    fetchUserData: () => dispatch(Actions.loadUser()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);