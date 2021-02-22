import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, } from "reactstrap";
import './ShareableLink.css'

const ShareableLink = (props) => {

    return (
        <div className="ThisShareableLink">
            <div className="ShareableLinkContainer">
                <Container fluid>
                    <Row style={{height: "20px", width: "100%"}} />
                    <Row>
                        <Col xs="12"><h5 style={{color: "black"}}>Share a link with your friends and earn:</h5></Col>
                    </Row>
                    <Row>
                        <Col xs="9"><div className="ShareableLink"><h6 className="link">{props.link}</h6></div></Col>
                        <Col xs="3"><div className="CopyButton"><Button style={{backgroundColor: "blue"}}>Copy</Button></div></Col>
                    </Row>
                </Container>
            </div>
        </div>
    );

}

export default ShareableLink