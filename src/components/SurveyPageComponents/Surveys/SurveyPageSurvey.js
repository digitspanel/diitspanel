import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, } from "reactstrap";
import './SurveyPageSurvey.css'

const SurrveyPageSurvey = (props) => {
    
    return (
        <div className="SurrveyPageSurvey">
            <div className="SurrveyPageSurveyContainer" style={{backgroundColor: props.color}}>
                <Container fluid>
                    <Row>
                        <Col xs="12" style={{display: "flex"}}>
                            <div className="SurveysText">
                                <h6>{props.surveyName}</h6>
                            </div>
                            <div style={{flex: "1"}} />
                            <div className="SurveysText">
                                <h6>{props.surveyPoints} Points</h6>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="descriptionContent"><div><p>{props.surveyDescription}</p></div></Col>
                    </Row>
                </Container>
                <div style={{flex: 1}} />
                <div className="surveyStartingButtonDiv"><button className="startingButton">Start Now</button></div>
            </div>
        </div>
    );

}

export default SurrveyPageSurvey