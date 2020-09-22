import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, } from "reactstrap";
import { Link } from 'react-router-dom'
import './SignInUp.css'
import fire from '../fire'
import firebase from 'firebase'

const SignUp = (props) => {

    const [onFirstNameTextBoxEmpty, setOnFirstNameTextBoxEmpty] = useState('textBoxStyle');
    const [onLastNameTextBoxEmpty, setOnLastNameTextBoxEmpty] = useState('textBoxStyle');
    const [onEmailTextBoxEmpty, setOnEmailTextBoxEmpty] = useState('textBoxStyle');
    const [onNewPasswordTextBoxEmpty, setOnNewPasswordTextBoxEmpty] = useState('textBoxStyle');
    const [onConfirmPasswordTextBoxEmpty, setOnConfirmPasswordTextBoxEmpty] = useState('textBoxStyle');
    const [onRelationCodeTextBoxEmpty, setOnRelationCodeTextBoxEmpty] = useState('textBoxStyle');

    const [errorCaption, setErrorCaption] = useState(props.errorCaption);

    const onSubmit = () => {

        let FirstName = document.getElementById("FirstName").value;
        let LastName = document.getElementById("LastName").value;
        let EmailId = document.getElementById("EmailId").value;
        let NewPassword = document.getElementById("NewPassword").value;
        let ConfirmPassword = document.getElementById("ConfirmPassword").value;
        // let RelationCode = document.getElementById("RelationCode").value;
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        let namesReg = /^[a-z ,.'-]+$/i;
        // let authError = false;

        if(FirstName == ""){
            setOnFirstNameTextBoxEmpty('textBoxStyle heighLight');
        }
        else{
            setOnFirstNameTextBoxEmpty('textBoxStyle');
        }

        if(LastName == ""){
            setOnLastNameTextBoxEmpty('textBoxStyle heighLight');
        }
        else{
            setOnLastNameTextBoxEmpty('textBoxStyle');
        }

        if(EmailId == ""){
            setOnEmailTextBoxEmpty('textBoxStyle heighLight');
        }
        else{
            setOnEmailTextBoxEmpty('textBoxStyle');
        }

        if(NewPassword == ""){
            setOnNewPasswordTextBoxEmpty('textBoxStyle heighLight');
        }
        else{
            setOnNewPasswordTextBoxEmpty('textBoxStyle');
        }

        if(ConfirmPassword == ""){
            setOnConfirmPasswordTextBoxEmpty('textBoxStyle heighLight');
        }
        else{
            setOnConfirmPasswordTextBoxEmpty('textBoxStyle');
        }
        // if(RelationCode == ""){
        //     setOnRelationCodeTextBoxEmpty('textBoxStyle heighLight');
        // }
        // else{
        //     setOnRelationCodeTextBoxEmpty('textBoxStyle');
        // }

        if(FirstName != "" && LastName != "" && EmailId != "" && NewPassword != "" && ConfirmPassword != ""){

            if(!namesReg.test(FirstName)){
                setOnFirstNameTextBoxEmpty('textBoxStyle heighLight');
            }
            if(!namesReg.test(LastName)){
                setOnLastNameTextBoxEmpty('textBoxStyle heighLight');
            }
            if(!emailReg.test(EmailId)){
                setOnEmailTextBoxEmpty('textBoxStyle heighLight');
            }

            if(!namesReg.test(LastName) || !namesReg.test(FirstName) || !emailReg.test(EmailId))
            {
                setErrorCaption('Please correct the input format of red fields!');
            }
            else{

                fire.auth().createUserWithEmailAndPassword(EmailId, NewPassword).then(() => {

                    fire.auth().onAuthStateChanged(User => {
                        if(User.emailVerified){
                        }
                        else{
                            fire.auth().onAuthStateChanged((currentUser) => {
                                currentUser.sendEmailVerification().then(() => {
                                    setErrorCaption("Please verify your email address to login!");
                                    fire.auth().signOut();
                                });
                            });
                        }
                    });

                }, (error) => {
                    setErrorCaption('Unexpected error occured!');
                });

                setOnEmailTextBoxEmpty('textBoxStyle');
            }
        }
        else{
            setErrorCaption('Please fill the below fields. You can only skip the optional fields!');
        }
    };

    

    return (
        <div className="SignInContainer">
            <div className="SignInInnerBoxContainer">
                <Row>
                    <Col style={{height: "30px", width: "100%"}}>
                        <h5>Sign Up</h5>
                    </Col>
                </Row>
                <div className="SignInInnerBox">
                    <Container fluid>

                        <Row>
                            <Col style={{height: "100px", border: "solid 1px"}} xs="4"></Col>
                        </Row>

                        <Row style={{height: "30px"}}><span style={{color: "red", fontSize: "0.8rem"}}>{errorCaption}</span></Row>

                        <Row>
                            <Col xs="5" style={{padding: "0 0 0 0"}}><input className={onFirstNameTextBoxEmpty} id="FirstName" type="text" placeholder="First Name"></input></Col>
                            <Col xs="2" style={{padding: "0 0 0 0"}}></Col>
                            <Col xs="5" style={{padding: "0 0 0 0"}}><input className={onLastNameTextBoxEmpty} id="LastName" type="text" placeholder="Last Name"></input></Col>
                        </Row>

                        <Row style={{height: "20px"}}></Row>

                        <Row>
                                <input className={onEmailTextBoxEmpty} id="EmailId" type="text" placeholder="Email Id"></input>
                        </Row>

                        <Row style={{height: "20px"}}></Row>

                        <Row>
                                <input className={onNewPasswordTextBoxEmpty} id="NewPassword" type="password" placeholder="New Password"></input>
                        </Row>

                        <Row style={{height: "20px"}}></Row>

                        <Row>
                                <input className={onConfirmPasswordTextBoxEmpty} id="ConfirmPassword" type="password" placeholder="Confirm Password"></input>
                        </Row>

                        <Row style={{height: "20px"}}></Row>

                        <Row>
                                <input className={onRelationCodeTextBoxEmpty} id="RealtionCode" type="text" placeholder="Relation Code"></input>
                        </Row>

                        <Row style={{height: "20px"}}></Row>

                        <Row>
                            <Col xs="9">
                                <Row><p style={{fontSize: "13px"}}>Already have account <Link onClick={props.gotoSignIn}>Sign In</Link></p></Row>
                            </Col>
                            <Col xs="3" style={{padding: "0 0 0 0"}}><Button onClick={onSubmit} style={{width: "90px"}} value="SignIn">Sign Up</Button></Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );

}

export default SignUp