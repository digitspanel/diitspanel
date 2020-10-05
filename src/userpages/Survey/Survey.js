import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, } from "reactstrap";
import './Survey.css'
import SurveyPageSurvey from '../../components/SurveyPageComponents/Surveys/SurveyPageSurvey';
import fire from '../../fire';
import HistoryOfSurvey from '../../components/SurveyPageComponents/HistoryTable/historicalSurveysTable'
import SurveyObject from '../../components/SurveyPageComponents/Surveys/SurveyObject';

const Survey = (props) => {

    const activeSurveys = [
        {surveyName: 'Survey1', surveyPoints: 11, surveyDescription: "There is going to be description andkjans kjandjkasndk k jakd jkaa kj djkandua kja jkanda kj jkanjdnah kjndj danu hk onandkja kjnada h nkajsndkj adna", color: 'red'},
        {surveyName: 'Survey2', surveyPoints: 15, surveyDescription: "There is going to be description andkjans kjandjkasndk k jakd jkaa kj djkandua kja jkanda kj jkanjdnah kjndj danu hk onandkja kjnada h nkajsndkj adna", color: '#3B6272'},
        {surveyName: 'Survey3', surveyPoints: 30, surveyDescription: "There is going to be description andkjans kjandjkasndk k jakd jkaa kj djkandua kja jkanda kj jkanjdnah kjndj danu hk onandkja kjnada h nkajsndkj adna", color: '#5AB6DB'},
        {surveyName: 'Survey4', surveyPoints: 20, surveyDescription: "There is going to be description andkjans kjandjkasndk k jakd jkaa kj djkandua kja jkanda kj jkanjdnah kjndj danu hk onandkja kjnada h nkajsndkj adna", color: ''}
    ]

    const historicalData = [
        {SurveyName: "ABC", Points: 101, Date: "12-Sep", Status: "Done"},
        {SurveyName: "ABC", Points: 50, Date: "1-Sep", Status: "Done"},
        {SurveyName: "ABC", Points: 150, Date: "3-Sep", Status: "Expired"},
        {SurveyName: "ABC", Points: 20, Date: "4-Sep", Status: "Done"},
        {SurveyName: "ABC", Points: 40, Date: "5-Sep", Status: "Done"}
    ]

    return (
        <div className="SurveyContainer">
            <div className="SurveyDiv">
                <Container fluid>

                    <Row style={{ height: "20px"}}>_____________________________________________</Row>
                    <Row style={{ padding: "10px"}}><h5>Active Surveys</h5></Row>
                    <Row style={{ height: "10px"}} />

                    <Row>
                        <div className="pageContentContainer">
                            <div className="SurveyAndVideoContainer">
                                <SurveyObject SurveysObj={activeSurveys} />
                            </div>
                        </div>
                    </Row>

                    <Row style={{ height: "20px"}}>_____________________________________________</Row>
                    <Row style={{ padding: "10px"}}><h5>History</h5></Row>
                    <Row style={{ height: "10px"}} />

                    <Row>
                        <div className="pageContentContainer">
                            <HistoryOfSurvey historicalDataObj={historicalData} />
                        </div>
                    </Row>
                </Container>
            </div>
        </div>
    );

}

export default Survey