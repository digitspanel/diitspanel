import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, } from "reactstrap";
import { Link } from 'react-router-dom';
import './SurveyPageSurvey.css'

const SurrveyPageSurvey = (props) => {
    
    return (
        <div className="SurrveyPageSurvey">
            <div className="SurrveyPageSurveyContainer" style={{backgroundColor: props.color}}>
                <Container fluid>
                    <Row>
                        <Col xs="12" style={{display: "flex"}}>
                            <div className="SurveysText">
                                <h6><b>{props.surveyName}</b></h6>
                            </div>
                            <div style={{flex: "1"}} />
                            <div className="SurveysText">
                                <h6>{props.surveyPoints} Points</h6>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="descriptionContent"><p>{props.surveyDescription}</p></Col>
                    </Row>
                </Container>
                <div style={{flex: 1}} />
                <Link className="surveyStartingButtonDiv" to={props.url}><Button outline className="startingButton" color="primary" size="sm">Start Now</Button></Link>
            </div>
        </div>
    );

}

export default SurrveyPageSurvey