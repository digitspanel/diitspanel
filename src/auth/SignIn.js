import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, Spinner, } from "reactstrap";
import * as AppActions from '../store/actions/appActions';
import AppLoader from '../components/AppLoader'
import fire from '../fire';
import { Redirect, useLocation } from "react-router-dom";
import firebase from 'firebase';
import './SignInUp.css';
import * as Actions from '../store/actions/authActions';
import * as SurveyActions from '../store/actions/surveysAction';
import * as UserActions from '../store/actions/usersAction';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

const SignIn = (props) => {

    // Redirecting to Home if user is already logged in

    let location = useLocation();

    const logedIn = useSelector(({ auth }) => auth.logedIn);

    let authRedirect = null;
    let { from } = location.state || { from: { pathname: "/" } };

    if(sessionStorage.getItem("digitspanel-userAuth")){
        props.loadUser(JSON.parse(sessionStorage.getItem("digitspanel-userAuth")).user);
    }

    if (logedIn) {
        authRedirect = <Redirect to={from} />;
    }
    
    const [onEmailTextBoxEmpty, setOnEmailTextBoxEmpty] = useState('textBoxStyle');
    const [onPasswordTextBoxEmpty, setOnPasswordTextBoxEmpty] = useState('textBoxStyle');

    const [errorCaption, setErrorCaption] = useState('');
    let loginError = false;

    const onSubmit = () => {

        let emailId = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        props.setbuttonLoader(true);

        if(emailId == ""){
            setOnEmailTextBoxEmpty('textBoxStyle heighLight');
        }
        else{
            setOnEmailTextBoxEmpty('textBoxStyle');
        }

        if(password == ""){
            setOnPasswordTextBoxEmpty('textBoxStyle heighLight');
        }
        else{
            setOnPasswordTextBoxEmpty('textBoxStyle');
        }

        if(emailId != "" && password != ""){

            if(!emailReg.test(emailId)){
                setErrorCaption('You have entered an incorrect format of email id!');
            }
            else{
                props.loginUser(null, emailId, password);
            }
        }
        else{
            setErrorCaption('Before you click a sign In button please, fill the below fields!');
        }
    };

    return (
        <div className="App">
            {authRedirect}
            <div className="SignInContainer">
                <div className="SignInInnerBoxContainer">
                    <Row>
                        <Col style={{ height: "30px", width: "100%" }}>
                            <h5>Login</h5>
                        </Col>
                    </Row>
                    <div className="SignInInnerBox">
                        <Container fluid>
                            <Row>
                                <Col style={{ height: "100px", border: "solid 1px" }} xs="4"></Col>
                            </Row>

                            <Row style={{ height: "30px", display: "flex", alignItems: "center" }}><span style={{ color: "red", fontSize: "0.8rem" }}>{errorCaption}</span></Row>

                            <Row>
                                <input className={onEmailTextBoxEmpty} id="loginEmail" type="text" placeholder="Email Id"></input>
                            </Row>

                            <Row style={{ height: "20px" }}></Row>

                            <Row>
                                <input className={onPasswordTextBoxEmpty} id="loginPassword" type="password" placeholder="Password"></input>
                            </Row>

                            <Row style={{ height: "20px" }}></Row>

                            <Row>
                                <Col>
                                    <Row>
                                        <Col xs="8">
                                            <Row><a href="" style={{ fontSize: "13px" }}>Forget your password?</a></Row>
                                            <Row><p style={{ fontSize: "13px" }}>Don't have account?<Link to="/signup">Sign Up</Link></p></Row>
                                        </Col>
                                        <div style={{ flex: "1" }} />
                                        {props.buttonLoader ?
                                            <Spinner /> :
                                            <Button style={{ height: "40px", width: "80px" }} value="SignIn" onClick={onSubmit}>Sign In</Button>
                                            }
                                    </Row>
                                </Col>
                            </Row>

                            <Row style={{ height: "20px" }}></Row>

                            <Row>
                                <Col xs="5"></Col>
                                <Col xs="7"><h5>Or</h5></Col>
                            </Row>

                            <Row style={{ display: "flex", justifyContent: "center" }}>
                                <StyledFirebaseAuth uiConfig={
                                    {
                                        signInOptions: [
                                          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                                          firebase.auth.FacebookAuthProvider.PROVIDER_ID
                                        ],
                                        callbacks: {
                                            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                                                props.loginUser(authResult.user);
                                                return true;
                                            },
                                            uiShown: function() {
                                                return true;
                                            }
                                          }
                                    }
                                } firebaseAuth={fire.auth()} />
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        buttonLoader: state.users.buttonLoader,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setbuttonLoader: (val) => dispatch(UserActions.buttonLoader(val)),
        loginUser: (user, email, password) => dispatch(UserActions.loginUser(user, email, password)),
        loadSurvey: (user) => dispatch(SurveyActions.loadList(user)),
        loadUser: (user) => dispatch(UserActions.loadUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)