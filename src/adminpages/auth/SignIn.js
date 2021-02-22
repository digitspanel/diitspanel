import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, Spinner } from "reactstrap";
import { Redirect, useLocation } from "react-router-dom";
import './adminauth.css';
import * as Actions from '../../store/actions/authActions';
import { connect, useSelector } from 'react-redux';

const SignIn = (props) => {

    // Redirecting to Home if user is already logged in

    let location = useLocation();

    const adminLogedIn = useSelector(({ auth }) => auth.adminLogedIn);

    let authRedirect = null;
    
    let { from } = location.state || { from: { pathname: "/admin/dashboard" } };

    if (adminLogedIn) {
        authRedirect = <Redirect to={from} />;
    }

    const [adminCredentials, setAdminCredential] = useState({
        email: '',
        password: '',
    });

    
    const [onEmailTextBoxEmpty, setOnEmailTextBoxEmpty] = useState('textBoxStyle');
    const [onPasswordTextBoxEmpty, setOnPasswordTextBoxEmpty] = useState('textBoxStyle');
    const [loader, setloader] = useState(false);

    const [errorCaption, setErrorCaption] = useState('');

    const onSubmit = () => {

        if(adminCredentials.email != "" && adminCredentials.password != ""){
                console.log(adminCredentials.email, adminCredentials.password)
                props.setLogin(adminCredentials.email, adminCredentials.password);
        }
        else{
            setErrorCaption('Before you click a sign In button please, fill the below fields!');
        }
    };

    return (
        <div className="App">
            {authRedirect}
            {console.log(adminCredentials)}
            {console.log(adminLogedIn)}
            <div className="adminAuthContainer">
                <Container style={{ height: "fit-content", padding: "50px" }} fluid>

                    <Row>
                        <Col style={{ height: "30px", width: "100%" }}><h5>Login</h5></Col>
                    </Row>

                    <Row>
                        <Col>
                            <div style={{ height: "100px", width: "140px", border: "solid 1px"}}></div>
                        </Col>
                    </Row>

                    <Row style={{ height: "30px", display: "flex", alignItems: "center" }}>
                        <Col>
                            <span style={{ color: "red", fontSize: "0.8rem" }}>{errorCaption}</span>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <input className={onEmailTextBoxEmpty} onChange={(e) => setAdminCredential({ ...adminCredentials, email: e.target.value })} type="text" placeholder="Email Id"></input>
                        </Col>
                    </Row>

                    <Row style={{ height: "20px" }}></Row>

                    <Row>
                        <Col>
                            <input className={onPasswordTextBoxEmpty} onChange={(e) => setAdminCredential({ ...adminCredentials, password: e.target.value })} type="password" placeholder="Password"></input>
                        </Col>
                    </Row>

                    <Row style={{ height: "20px" }}></Row>

                    <Row>
                        <Col xs="9">
                        </Col>
                        <Col xs="3" style={{ padding: "0 0 0 0" }}>
                            {loader ?
                                <Spinner /> :
                                <Button style={{ width: "90px" }} value="SignIn" onClick={() => onSubmit()}>Sign In</Button>}
                        </Col>
                    </Row>
                    
                </Container>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLogin: (username, password) => dispatch(Actions.setAdminLogin(username, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)