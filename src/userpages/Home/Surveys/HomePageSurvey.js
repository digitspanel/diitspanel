import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, } from "reactstrap";
import { Link } from 'react-router-dom';
import './HomePageSurvey.css'

const HomePageSurvey = (props) => {

    return (
        <Container className="HomePageSurvey" style={{width: 'inherit'}} fluid>
            <div className="HomePageSurveyContainer" style={{ padding: "0rem 1.25rem", margin: 0, backgroundColor: props.color }}>
                <Row>
                    <Col xs="12" style={{ display: "flex" }}>
                        <div className="SurveyText">
                            <h5>{props.surveyName}</h5>
                        </div>
                        <div style={{ flex: '1' }} />
                        <div className="SurveyText">
                            { props.surveyName ? <h5>{props.surveyPoints} Points</h5> : null }
                        </div>
                    </Col>
                </Row>
                <Row style={{flex: "1"}}>
                    <Col> { props.surveyName ? <div><p>{props.surveyDescription}</p></div> : <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}><p>No Survey Available!</p></div> }</Col>
                </Row>
                <Row>
                    {/* <div style={{ flex: 1 }} />
                    <div className="surveyStartButtonDiv"><button className="startButton">Start Now</button></div> */}
                    <div style={{flex: 1}} />
                    { props.surveyName ? <Link className="surveyStartingButtonDiv" to={props.url}><Button outline className="startingButton" color="primary" size="sm">Start Now</Button></Link> : null }
                </Row>
            </div>
        </Container>
    );
}

export default HomePageSurvey