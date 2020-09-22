import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, Spinner, } from "reactstrap";
import fire from '../fire';
import firebase from 'firebase'
import { Route, Link } from 'react-router-dom'
import './SignInUp.css'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const SignIn = (props) => {

    const [user, setUser] = useState('');
    const [userCredentials, setUserCredential] = useState({
        email: '',
        password: '',
    });

    const [onEmailTextBoxEmpty, setOnEmailTextBoxEmpty] = useState('textBoxStyle');
    const [onPasswordTextBoxEmpty, setOnPasswordTextBoxEmpty] = useState('textBoxStyle');
    const [loader, setloader] = useState(false);

    const [errorCaption, setErrorCaption] = useState('');
    let loginError = false;

    const [uiConfig, setUiConfig] = useState({
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                return true;
            },
            uiShown: function() {
                return true;
            }
          }
    });

    const onSubmit = () => {

        let emailId = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

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
                setloader(true);
                fire.auth().signInWithEmailAndPassword(emailId, password).then(() =>{

                    fire.auth().onAuthStateChanged(User => {
                        if(User.emailVerified){
                            setloader(false);
                            props.Login();
                        }
                        else{
                            fire.auth().onAuthStateChanged((currentUser) => {
                                currentUser.sendEmailVerification().then(() => {
                                    setErrorCaption("Please verify your email address to login!");
                                    fire.auth().signOut();
                                });
                            });
                            setloader(false);
                        }
                    });
                    
                }, (error) => {
                    setErrorCaption('Incorrect email id or password!');
                    loginError = true;
                    setloader(false);
                });
            }
        }
        else{
            setErrorCaption('Before you click a sign In button please, fill the below fields!');
        }
    };

    return (
        <div className="SignInContainer">
            <div className="SignInInnerBoxContainer">
                <Row>
                    <Col style={{height: "30px", width: "100%"}}>
                        <h5>Login</h5>
                    </Col>
                </Row>
                <div className="SignInInnerBox">
                    <Container fluid>
                        <Row>
                            <Col style={{height: "100px", border: "solid 1px"}} xs="4"></Col>
                        </Row>

                        <Row style={{height: "30px", display: "flex", alignItems: "center"}}><span style={{color: "red", fontSize: "0.8rem"}}>{errorCaption}</span></Row>

                        <Row>
                                <input className={onEmailTextBoxEmpty} id="loginEmail" type="text" placeholder="Email Id"></input>
                        </Row>

                        <Row style={{height: "20px"}}></Row>

                        <Row>
                                <input className={onPasswordTextBoxEmpty} id="loginPassword" type="password" placeholder="Password"></input>
                        </Row>

                        <Row style={{height: "20px"}}></Row>

                        <Row>
                            <Col xs="9">
                                <Row><a href="" style={{fontSize: "13px"}}>Forget your password?</a></Row>
                                <Row><p style={{fontSize: "13px"}}>Don't have account? <Link onClick={props.gotoSignUp}>Sign Up</Link></p></Row>
                            </Col>
                            <Col xs="3" style={{padding: "0 0 0 0"}}>{loader ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : <Button style={{width: "90px"}} value="SignIn" onClick={onSubmit}>Sign In</Button>}</Col>
                        </Row>

                        <Row style={{height: "20px"}}></Row>

                        <Row>
                            <Col xs="5"></Col>
                            <Col xs="7"><h5>Or</h5></Col>
                        </Row>

                        <Row style={{display: "flex", justifyContent: "center"}}>
                            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()} />
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default SignIn