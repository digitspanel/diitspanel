import React from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, } from "reactstrap";

const Verification = (props) => {
    return (
        <div className="SignInContainer">
            <div className="SignInInnerBoxContainer">
                <Row>
                    <Col style={{height: "30px", width: "100%"}}>
                        <h5>Verification</h5>
                    </Col>
                </Row>
                <div className="SignInInnerBox">
                    <Container fluid>

                        <Row style={{height: "20px"}}></Row>

                        <Row>
                            <Col style={{height: "100px", border: "solid 1px"}} xs="4"></Col>
                        </Row>

                        <Row style={{height: "50px"}}></Row>

                        <Row>
                                <h5>Please verify your email id or phone number!</h5>
                        </Row>

                        <Row style={{height: "20px"}}></Row>

                        <Row>
                            <Col style={{padding: "0 0 0 0"}}><p>Email Verification:</p></Col>
                            <Col><Input type="text"></Input></Col>
                        </Row>

                        <Row style={{height: "20px"}}></Row>

                        <Row>
                            <Col style={{padding: "0 0 0 0"}}><p>Phone Verification:</p></Col>
                            <Col><Input type="text"></Input></Col>
                        </Row>

                        <Row style={{height: "20px"}}></Row>

                        <Row>
                            <Col xs="8"></Col>
                            <Col xs="4"><Button style={{width: "90px"}} value="SignIn">Sign In</Button></Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );

}

export default Verification