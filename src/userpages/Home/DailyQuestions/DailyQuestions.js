import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput, Label, Form, FormGroup } from "reactstrap";
import './DailyQuestions.css'

const DailyQuestions = (props) => {
    
    let inc = 0;

    const [inputType, setInputType] = useState(props.type);

    return (
        <div className="DailyQuestions">
            <div className="DailyQuestionsContainer">
                <Container fluid>
                    <Row>
                        <Col xs="8"><div className="Question"><h5>Daily Question</h5></div></Col>
                        <Col xs="4"><div className="Points"><h5>{props.surveyPoints} Points</h5></div></Col>
                    </Row>
                    <Row>
                        <Col xs="12"><div className="questionText"><p>{props.questionText}</p></div></Col>
                    </Row>
                    <Row>
                        <Col><div><p></p></div></Col>
                    </Row>
                </Container>
                <div style={{flex: 1}} />
                <div className="answerContainer">
                    <div style={{ display: "flex", flexFlow: "column" }}>
                        {props.options.map((option, index) => {
                            return <label key={index}><input type="radio" value={inc++} name="dailyquestionvalue" /> {option} </label>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default DailyQuestions