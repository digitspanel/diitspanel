import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, } from "reactstrap";
import './HomePageSurvey.css'

const HomePageSurvey = (props) => {

    return (
        <div className="HomePageSurvey">
            <div className="HomePageSurveyContainer" style={{backgroundColor: props.color}}>
                <Container fluid>
                    <Row>
                        <Col xs="8"><div className="SurveyText"><h5>{props.surveyName}</h5></div></Col>
                        <Col xs="4"><div className="SurveyText"><h5>{props.surveyPoints} Points</h5></div></Col>
                    </Row>
                    <Row>
                        <Col><div><p>{props.surveyDescription}</p></div></Col>
                    </Row>
                </Container>
                <div style={{flex: 1}} />
                <div className="surveyStartButtonDiv"><button className="startButton">Start Now</button></div>
            </div>
        </div>
    );

}

export default HomePageSurvey