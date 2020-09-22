import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput, Label, Form, FormGroup } from "reactstrap";
import './DailyQuestions.css'

const DailyQuestions = (props) => {

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
                        <Col><div><p>{props.questionText}</p></div></Col>
                    </Row>
                </Container>
                <div style={{flex: 1}} />
                <div className="answerContainer">

                    {inputType == 'text' && 
                        <Input type="text"></Input> 
                    }

                    {inputType == 'singleAnswer' &&
                        <div style={{display: "flex", flexFlow: "column"}}>
                            <label><input type="radio" value="1" name="takingValue" /> Yes </label>
                            <label><input type="radio" value="2" name="takingValue" /> No </label>
                        </div>
                    }
                </div>
            </div>
        </div>
    );

}

export default DailyQuestions