import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/usersAction';
import UserHeader from '../../components/ToolBar/Header/UserHeader';
import { Progress, Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, FormGroup, CardHeader, Fade, } from "reactstrap";
import Question from '../../components/Question/Question';
import FormFeedback from 'reactstrap/lib/FormFeedback';

const ProfileQuestions = (props) => {

    const [data, setData] = useState({
        ...props.user
    });
    const [initialed, setInitialed] = useState(false);

    const [questionIndex, setQuestionIndex] = useState(1);
    const [questionNext, setQesutonNext] = useState(true);

    var questionIndexes = 1;

    const [pipings, setPipings] = useState({
        Q2: "",
    });

    //Methods

    const onPrevious = () => {
        // setInitialed(true);
        // setQesutonNext(false);
        questionIndexes--;
    }

    const onNext = () => {
        // props.postAnswers(props.useremail, data);
        // setQesutonNext(true);
        questionIndexes++;
    }

    const onSubmit = () => {
        console.log("OnSubmit Running!!");
    }

    const CurrentQuestion = () => {

        switch (questionIndexes) {
            case 1:
                if (true) {
                    return (
                        <Col>
                            <Row style={{ flex: "1" }}>
                                <Question
                                    type="Openend"
                                    inputType="numeric"
                                    questiontext="PQ1. Can you please write your age in below given textbox?"
                                    defaultValue={[data.PQ1]}
                                    options={[
                                        { label: "Age" },
                                    ]}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            PQ1: e
                                        });
                                    }}
                                />
                            </Row>
                            <Row>
                                <div style={{ flex: "1" }} />
                                <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ1 ? false : true}>Next</Button></div>
                            </Row>
                        </Col>
                    )
                }
            case 2:
                return (
                    <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="Openend"
                                questiontext="PQ3. Your Province and City where you live."
                                defaultValue={[props.user.PQ3_1, props.user.PQ3_2]}
                                options={[
                                    { label: "Province" },
                                    { label: "City" }
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ3_1: e.split(",")[0],
                                        PQ3_2: e.split(",")[1]
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ3_1 && data.PQ3_2 ? false : true}>Next</Button></div>
                        </Row>
                    </Col>
                )
            default:
                return (
                    <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="SingleAnswer"
                                questiontext="PQ2. Select your gender"
                                defaultValue={[data.PQ2]}
                                options={[
                                    { name: "PQ2", value: "1", label: "Male" },
                                    { name: "PQ2", value: "2", label: "Female" }
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ2: e
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ2 ? false : true}>Next</Button></div>
                        </Row>
                    </Col>
                )
        }

        // if (questionIndexes == 1) {
        //     if (true) {
        //         console.log(questionIndexes)
        //         Question = 
        //     }
        //     else {
        //         questionIndexes++;
        //         console.log(questionIndexes)
        //     }
        // }
        // else {
        //     questionIndexes++;
        //     console.log(questionIndexes)
        // }

        // if (questionIndexes == 2) {
        //     if (!props.user.PQ2 || initialed) {
        //         Question = 
        //     }
        //     else {
        //         questionIndexes++;
        //         console.log(questionIndexes)
        //     }
        // }
        // else {
        //     questionIndexes++;
        //     console.log(questionIndexes)
        // }
    }

    return (
        <>
            <div className="mainContainer">
                {console.log(data)}
                <UserHeader />
                <Container style={{ padding: "10px 0" }}>

                    <div className="text-center">{questionIndex} of {30}</div>
                    <Progress value={questionIndex} max="30" />

                    <Col>{CurrentQuestion(questionIndex)}</Col>

                    {/* {!props.user.PQ1 || initialed ? questionIndex == 1 ? <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="Openend"
                                inputType="numeric"
                                questiontext="PQ1. Can you please write your age in below given textbox?"
                                defaultValue={[data.PQ1]}
                                options={[
                                    { label: "Age" },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ1: e
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ1 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndexes + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.PQ2 || initialed ? questionIndex == 2 ? <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="SingleAnswer"
                                questiontext="PQ2. Select your gender"
                                defaultValue={[data.PQ2]}
                                options={[
                                    { name: "PQ2", value: "1", label: "Male" },
                                    { name: "PQ2", value: "2", label: "Female" }
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ2: e
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ2 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.PQ3_1 || initialed ? questionIndex == 3 ? <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="Openend"
                                questiontext="PQ3. Your Province and City where you live."
                                defaultValue={[props.user.PQ3_1, props.user.PQ3_2]}
                                options={[
                                    { label: "Province" },
                                    { label: "City" }
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ3_1: e.split(",")[0],
                                        PQ3_2: e.split(",")[1]
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ3_1 && data.PQ3_2 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.PQ4 || initialed ? questionIndex == 4 ? <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="SingleAnswer"
                                questiontext="PQ4. What is your maritial status?"
                                defaultValue={props.user.PQ4}
                                options={[
                                    { name: "PQ4", value: "1", label: "Single" },
                                    { name: "PQ4", value: "2", label: "Married" },
                                    { name: "PQ4", value: "3", label: "Divorced" },
                                    { name: "PQ4", value: "4", label: "Withdrawn" }
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ4: e
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ4 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.PQ5 || initialed ? questionIndex == 5 ? <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="Openend"
                                inputType="numeric"
                                questiontext="PQ5. Can you please provide your contact number?"
                                defaultValue={[props.user.PQ5]}
                                options={[
                                    { label: "Phone #" },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ5: e
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ5 ? data.PQ5.split("").length == 11 ? false : true : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.PQ6 || initialed ? questionIndex == 6 ? <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="SingleAnswer"
                                questiontext="PQ6. Which network you use?"
                                defaultValue={props.user.PQ6}
                                options={[
                                    { name: "PQ6", value: "1", label: "Zong" },
                                    { name: "PQ6", value: "2", label: "Jazz" },
                                    { name: "PQ6", value: "3", label: "Telenore" },
                                    { name: "PQ6", value: "4", label: "Warid" },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ6: e
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ6 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.PQ7 || initialed ? questionIndex == 7 ? <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="Openend"
                                inputType="numeric"
                                questiontext="PQ7. How many household members are in your house?"
                                defaultValue={[props.user.PQ7]}
                                options={[
                                    { label: "Household Size" },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ7: e
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ7 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.PQ8 || initialed ? questionIndex == 8 ? <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="SingleAnswer"
                                questiontext="PQ8. Single/JointFamily?"
                                defaultValue={props.user.PQ8}
                                options={[
                                    { name: "PQ8", value: "1", label: "Single" },
                                    { name: "PQ8", value: "2", label: "Joint" },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ8: e
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ8 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.PQ9_1 || initialed ? questionIndex == 9 ? <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="Openend"
                                inputType="numeric"
                                questiontext="PQ9. Please write number of household members within below age brackets?"
                                defaultValue={[props.user.PQ9_1, props.user.PQ9_2, props.user.PQ9_3, props.user.PQ9_4]}
                                options={[
                                    { label: "24 Months" },
                                    { label: "2-15 Years" },
                                    { label: "16-40 Years" },
                                    { label: "Above 40 Years" },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ9_1: e.split(",")[0],
                                        PQ9_2: e.split(",")[1],
                                        PQ9_3: e.split(",")[2],
                                        PQ9_4: e.split(",")[3]
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ9_1 && data.PQ9_2 && data.PQ9_3 && data.PQ9_4 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.PQ10 || initialed ? questionIndex == 10 ? <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="SingleAnswer"
                                questiontext="PQ10. You are living in your own house or on rent?"
                                defaultValue={props.user.PQ10}
                                options={[
                                    { name: "PQ10", value: "1", label: "Own" },
                                    { name: "PQ10", value: "2", label: "Rent" },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ10: e
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ10 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.PQ11 || initialed ? questionIndex == 11 ? <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="SingleAnswer"
                                questiontext="PQ11. What is an average income of your household?"
                                defaultValue={props.user.PQ11}
                                options={[
                                    { name: "PQ11", value: "1", label: "Below 15000" },
                                    { name: "PQ11", value: "2", label: "Between 15001 to 40000" },
                                    { name: "PQ11", value: "3", label: "Between 40001 to 100000" },
                                    { name: "PQ11", value: "4", label: "Above 100000" },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ11: e
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ11 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.PQ12 || initialed ? questionIndex == 12 ? <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="Openend"
                                inputType="numeric"
                                questiontext="PQ12. How many network sims do you have?"
                                defaultValue={[props.user.PQ12]}
                                options={[
                                    { label: "No. of Sims" },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ12: e
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ12 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) :setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.PQ13 || initialed ? questionIndex == 13 ? <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="SingleAnswer"
                                questiontext="PQ13. Do you have smartphone?"
                                defaultValue={props.user.PQ13}
                                options={[
                                    { name: "PQ13", value: "1", label: "Yes" },
                                    { name: "PQ13", value: "2", label: "No" },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ13: e
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ13 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.PQ14 || initialed ? questionIndex == 14 ? <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="SingleAnswer"
                                questiontext="PQ14. Do you have Featured Phone?"
                                defaultValue={props.user.PQ14}
                                options={[
                                    { name: "PQ14", value: "1", label: "Yes" },
                                    { name: "PQ14", value: "2", label: "No" },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ14: e
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ14 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.PQ15 || initialed ? questionIndex == 15 ? <Col>
                        <Row style={{ flex: "1" }}>
                            {console.log(props.user.PQ15)}
                            <Question
                                type="MultiAnswer"
                                questiontext="PQ15. LifestyleInfo?"
                                defaultValue={props.user.PQ15}
                                options={[
                                    { name: "PQ15", value: "1", label: "Microwave" },
                                    { name: "PQ15", value: "2", label: "Fridge" },
                                    { name: "PQ15", value: "3", label: "Tablet" },
                                    { name: "PQ15", value: "4", label: "Laptop" },
                                    { name: "PQ15", value: "5", label: "Desktop" },
                                    { name: "PQ15", value: "6", label: "Printer" },
                                    { name: "PQ15", value: "7", label: "Smart TV" },
                                    { name: "PQ15", value: "8", label: "LED TV" },
                                    { name: "PQ15", value: "9", label: "DVD player" },
                                    { name: "PQ15", value: "10", label: "Gaming console" },
                                    { name: "PQ15", value: "11", label: "Camera" },
                                    { name: "PQ15", value: "12", label: "Car(s)" }
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        PQ15: e
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={data.PQ15 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.SECQ1_1 || initialed ? questionIndex == 16 ? <Col>
                        <Row style={{ flex: "1" }}>
                            <Question
                                type="SingleAnswer"
                                questiontext="Q1. Please tell me who is the main wage earner in your household? By main wage earner I mean the person who contributes the most to your monthly family expenditures? [SA]"
                                defaultValue={props.user.SECQ1_1, props.user.SECQ1_2}
                                options={[
                                    { name: "Q1", value: "1", label: "MySelf" },
                                    { name: "Q1", value: "2", label: "Other", openend: true }
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        SECQ1_1: e.split(",")[0],
                                        SECQ1_2: e.split(",")[1] ? e.split(",")[1] : null
                                    });
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={!props.user.SECQ1_1 || data.SECQ1_1 == 2 && !props.user.SECQ1_2 ? true : false}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.SECQ2_1 || initialed ? questionIndex == 17 ? <Col style={{ width: "100%" }}>
                        <Row>
                            <Question
                                type="Openend"
                                questiontext="Q2. Can you please tell me your occupation, Designation Nature of Work?"
                                defaultValue={
                                    props.user.SECQ2_1, 
                                    props.user.SECQ2_2, 
                                    props.user.SECQ2_3
                                }
                                options={[
                                    { label: "Company Name:" },
                                    { label: "Designation:" },
                                    { label: "Nature of Work:" },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        SECQ2_1: e.split(",")[0],
                                        SECQ2_2: e.split(",")[1],
                                        SECQ2_3: e.split(",")[2]
                                    })
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={
                                data.SECQ2_1 && data.SECQ2_1 != "" && data.SECQ2_2 && data.SECQ2_2 != "" && data.SECQ2_3 && data.SECQ2_3 != "" ? false : true
                            }>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.SECQ2A || initialed ? questionIndex == 18 ? <Col>
                        <Row>
                            <Question
                                type="SingleAnswer"
                                questiontext="Q2A. Code the relevant profession"
                                defaultValue={props.user.SECQ2A}
                                options={[
                                    { name: 'Q2A', value: '1', label: 'Unskilled worker' },
                                    { name: 'Q2A', value: '2', label: 'Petty Trader' },
                                    { name: 'Q2A', value: '3', label: 'Skilled worker' },
                                    { name: 'Q2A', value: '4', label: 'Non-Executive staff' },
                                    { name: 'Q2A', value: '5', label: 'Supervisory level' },
                                    { name: 'Q2A', value: '6', label: 'Small shop keeper/businessman' },
                                    { name: 'Q2A', value: '7', label: 'Lower/Middle Executive/ Officer' },
                                    { name: 'Q2A', value: '8', label: 'Self Employed/Employed Professionals e.g. Doctor, Lawyer and Engineer etc' },
                                    { name: 'Q2A', value: '9', label: 'Medium Businessman' },
                                    { name: 'Q2A', value: '10', label: 'Senior Executive/Officer' },
                                    { name: 'Q2A', value: '11', label: 'Large Businessman/Factory Owner' },
                                    { name: 'Q2A', value: '12', label: 'Retired' },
                                    { name: 'Q2A', value: '13', label: 'Student' },
                                    { name: 'Q2A', value: '14', label: 'Unemployed' },
                                    { name: 'Q2A', value: '15', label: 'Housewife' }
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        SECQ2A: e
                                    })
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={props.user.SECQ2A ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.SECQ3_1 || initialed ? questionIndex == 19 ? <Col>
                        <Row>
                            <Question
                                type="Openend"
                                questiontext="Q3. Can you please tell me occupation, Designation & Nature of Work of [Pipe in response from Q]"
                                defaultValue={
                                    props.user.SECQ3_1, 
                                    props.user.SECQ3_2, 
                                    props.user.SECQ3_3
                                }
                                options={[
                                    { label: "Company Name:" },
                                    { label: "Designation:" },
                                    { label: "Nature of Work:" },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        SECQ3_1: e.split(",")[0],
                                        SECQ3_2: e.split(",")[1],
                                        SECQ3_3: e.split(",")[2]
                                    })
                                }}
                            />
                        </Row>

                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={props.user.SECQ3_1 && props.user.SECQ3_1 != "" && props.user.SECQ3_2 && props.user.SECQ3_2 != "" && props.user.SECQ3_3 && props.user.SECQ3_3 != "" ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.SECQ3A || initialed ? questionIndex == 20 ? <Col>
                        <Row>
                            <Question
                                type="SingleAnswer"
                                questiontext="Q3A. Code the relevant profession"
                                defaultValue={
                                    props.user.SECQ3A
                                }
                                options={[
                                    { name: 'Q3A', value: '1', label: 'Unskilled worker' },
                                    { name: 'Q3A', value: '2', label: 'Petty Trader' },
                                    { name: 'Q3A', value: '3', label: 'Skilled worker' },
                                    { name: 'Q3A', value: '4', label: 'Non-Executive staff' },
                                    { name: 'Q3A', value: '5', label: 'Supervisory level' },
                                    { name: 'Q3A', value: '6', label: 'Small shop keeper/businessman' },
                                    { name: 'Q3A', value: '7', label: 'Lower/Middle Executive/ Officer' },
                                    { name: 'Q3A', value: '8', label: 'Self Employed/Employed Professionals e.g. Doctor, Lawyer and Engineer etc' },
                                    { name: 'Q3A', value: '9', label: 'Medium Businessman' },
                                    { name: 'Q3A', value: '10', label: 'Senior Executive/Officer' },
                                    { name: 'Q3A', value: '11', label: 'Large Businessman/Factory Owner' },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        SECQ3A: e
                                    })
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={props.user.SECQ3A ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.SECQ4 || initialed ? questionIndex == 21 ? <Col>
                        <Row>
                            <Question
                                type="SingleAnswer"
                                questiontext="Q4. Could you please tell me what is your level of education?"
                                defaultValue={
                                    props.user.SECQ4
                                }
                                options={[
                                    { name: 'Q4', value: '1', label: 'Illiterate/ Cannot read' },
                                    { name: 'Q4', value: '2', label: 'Less than Primary (studied less than class 5)' },
                                    { name: 'Q4', value: '3', label: 'Studied between Class 5-9th class' },
                                    { name: 'Q4', value: '4', label: 'Matric' },
                                    { name: 'Q4', value: '5', label: 'Inter' },
                                    { name: 'Q4', value: '6', label: 'Graduate' },
                                    { name: 'Q4', value: '7', label: 'Post Graduate' },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        SECQ4: e
                                    })
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={props.user.SECQ4 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.SECQ5 || initialed ? questionIndex == 22 ? <Col>
                        <Row>
                            <Question
                                type="SingleAnswer"
                                questiontext="Q5. Could you please tell me the level of education of your household’s chief wage earner?"
                                defaultValue={
                                    props.user.SECQ5
                                }
                                options={[
                                    { name: 'Q5', value: '1', label: 'Illiterate/ Cannot read' },
                                    { name: 'Q5', value: '2', label: 'Less than Primary (studied less than class 5)' },
                                    { name: 'Q5', value: '3', label: 'Studied between Class 5-9th class' },
                                    { name: 'Q5', value: '4', label: 'Matric' },
                                    { name: 'Q5', value: '5', label: 'Inter' },
                                    { name: 'Q5', value: '6', label: 'Graduate' },
                                    { name: 'Q5', value: '7', label: 'Post Graduate' },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        SECQ5: e
                                    })
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={props.user.SECQ5 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.SECURBAN || initialed ? questionIndex == 23 ? <Col>
                        <Row>
                            <Question
                                type="SingleAnswer"
                                questiontext="SEC"
                                defaultValue={
                                    props.user.SECURBAN
                                }
                                options={[
                                    { name: 'QSEC', value: '1', label: 'A' },
                                    { name: 'QSEC', value: '2', label: 'B' },
                                    { name: 'QSEC', value: '3', label: 'C' },
                                    { name: 'QSEC', value: '4', label: 'D' },
                                    { name: 'QSEC', value: '5', label: 'E' },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        SECURBAN: e
                                    })
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={props.user.SECURBAN ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.SECQ6 || initialed ? questionIndex == 24 ? <Col>
                        <Row>
                            <Question
                                type="SingleAnswer"
                                questiontext="Q6. In your house, what material is the roof constructed out of?"
                                defaultValue={
                                    props.user.SECQ6
                                }
                                options={[
                                    { name: 'Q6', value: '1', label: 'Concrete' },
                                    { name: 'Q6', value: '2', label: 'Metal girders/ wooden bales/ bricks' },
                                    { name: 'Q6', value: '3', label: 'Metal  Sheets' },
                                    { name: 'Q6', value: '4', label: 'Mud and stone' },
                                    { name: 'Q6', value: '5', label: 'Readymade concrete' },
                                    { name: 'Q6', value: '6', label: 'Girdrs / bricks' },
                                    { name: 'Q6', value: '7', label: 'Mud' },
                                    { name: 'Q6', value: '8', label: 'Wood and Mud' },
                                    { name: 'Q6', value: '9', label: 'Wood / Bamboo' },
                                    { name: 'Q6', value: '10', label: 'Mud / Grass' },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        SECQ6: e
                                    })
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={props.user.SECQ6 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.SECQ7 || initialed ? questionIndex == 25 ? <Col>
                        <Row>
                            <Question
                                type="SingleAnswer"
                                questiontext="Q7. In your house, what material are the walls constructed out of?Q6. In your house, what material is the roof constructed out of?"
                                defaultValue={
                                    props.user.SECQ7
                                }
                                options={[
                                    { name: 'Q7', value: '1', label: 'Cement & Bricks' },
                                    { name: 'Q7', value: '2', label: 'Bricks & Mortar' },
                                    { name: 'Q7', value: '3', label: 'Wood, Mud, Stone' },
                                    { name: 'Q7', value: '4', label: 'Metal Sheet' },
                                    { name: 'Q7', value: '5', label: 'Concrete' },
                                    { name: 'Q7', value: '6', label: 'Mud' },
                                    { name: 'Q7', value: '7', label: 'Wood' },
                                    { name: 'Q7', value: '8', label: 'Grass' },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        SECQ7: e
                                    })
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={props.user.SECQ7 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.SECQ8 || initialed ? questionIndex == 26 ? <Col>
                        <Row>
                            <Question
                                type="SingleAnswer"
                                questiontext="Q8. Do you have a kitchen in your house?"
                                defaultValue={
                                    props.user.SECQ8
                                }
                                options={[
                                    { name: 'Q8', value: '1', label: 'Yes' },
                                    { name: 'Q8', value: '2', label: 'No' },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        SECQ8: e
                                    })
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={props.user.SECQ8 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.SECQ9 || initialed ? questionIndex == 27 ? <Col>
                        <Row>
                            <Question
                                type="SingleAnswer"
                                questiontext="Q9. Do you have a latrine in your house?"
                                defaultValue={
                                    props.user.SECQ9
                                }
                                options={[
                                    { name: 'Q9', value: '1', label: 'Yes' },
                                    { name: 'Q9', value: '2', label: 'No' },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        SECQ9: e
                                    })
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={props.user.SECQ9 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.SECQ10 || initialed ? questionIndex == 28 ? <Col>
                        <Row>
                            <Question
                                type="SingleAnswer"
                                questiontext="Q10 Type of House"
                                defaultValue={
                                    props.user.SECQ10
                                }
                                options={[
                                    { name: 'Q10', value: '1', label: 'Kacha' },
                                    { name: 'Q10', value: '2', label: 'Kacha-Pakka' },
                                    { name: 'Q10', value: '3', label: 'Pakka Lower' },
                                    { name: 'Q10', value: '4', label: 'Pakka Upper' },
                                ]}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        SECQ10: e
                                    })
                                }}
                            />
                        </Row>
                        <Row>
                            <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                            <div style={{ flex: "1" }} />
                            <div style={{ padding: "20px" }}><Button onClick={() => onNext()} disabled={props.user.SECQ10 ? false : true}>Next</Button></div>
                        </Row>
                    </Col> : questionNext ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(questionIndex - 1) : null}

                    {!props.user.SECRURAL || initialed ? questionIndex == 29 ? <Col>
                                <Row>
                                    <Question
                                        type="SingleAnswer"
                                        questiontext="SEC"
                                        defaultValue={
                                            props.user.SECRURAL
                                        }
                                        options={[
                                            { name: 'QSEC', value: '1', label: 'A' },
                                            { name: 'QSEC', value: '2', label: 'B' },
                                            { name: 'QSEC', value: '3', label: 'C' },
                                            { name: 'QSEC', value: '4', label: 'D' },
                                            { name: 'QSEC', value: '5', label: 'E' },
                                        ]}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                SECRURAL: e
                                            })
                                        }}
                                    />
                                </Row>
                                <Row>
                                    <div style={{ padding: "20px" }}><Button onClick={() => onPrevious()}>Previous</Button></div>
                                    <div style={{ flex: "1" }} />
                                    <div style={{ padding: "20px" }}><Button onClick={() => onSubmit()} disabled={props.user.SECRURAL ? false : true}>Submit</Button></div>
                                </Row>
                            </Col>
                            :
                            questionNext
                                ?
                                setQuestionIndex(questionIndex + 1)
                                :
                                setQuestionIndex(questionIndex - 1)
                        :
                        null} */}
                </Container>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.users.items,
        useremail: state.users.items.EmailId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserData: (value) => dispatch(Actions.setUserData(value)),
        postAnswers: (emailid, data) => dispatch(Actions.postAnswers(emailid, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileQuestions);