import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, } from "reactstrap";
import './Survey.css'
import SurveyPageSurvey from '../../components/SurveyPageComponents/Surveys/SurveyPageSurvey';
import fire from '../../fire';
import HistoryOfSurvey from '../../components/SurveyPageComponents/HistoryTable/historicalSurveysTable'

const Survey = (props) => {

    const activeSurveys = [
        {surveyName: 'Survey1', surveyPoints: 10, surveyDescription: "There is going to be description andkjans kjandjkasndk k jakd jkaa kj djkandua kja jkanda kj jkanjdnah kjndj danu hk onandkja kjnada h nkajsndkj adna", color: 'red'},
        {surveyName: 'Survey2', surveyPoints: 15, surveyDescription: "There is going to be description andkjans kjandjkasndk k jakd jkaa kj djkandua kja jkanda kj jkanjdnah kjndj danu hk onandkja kjnada h nkajsndkj adna", color: '#3B6272'},
        {surveyName: 'Survey3', surveyPoints: 30, surveyDescription: "There is going to be description andkjans kjandjkasndk k jakd jkaa kj djkandua kja jkanda kj jkanjdnah kjndj danu hk onandkja kjnada h nkajsndkj adna", color: '#5AB6DB'},
        {surveyName: 'Survey4', surveyPoints: 20, surveyDescription: "There is going to be description andkjans kjandjkasndk k jakd jkaa kj djkandua kja jkanda kj jkanjdnah kjndj danu hk onandkja kjnada h nkajsndkj adna", color: ''}
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
                                <SurveyPageSurvey surveyName={activeSurveys[0].surveyName} surveyPoints={activeSurveys[0].surveyPoints} surveyDescription={activeSurveys[0].surveyDescription} color={activeSurveys[0].color} />
                                <SurveyPageSurvey surveyName={activeSurveys[1].surveyName} surveyPoints={activeSurveys[1].surveyPoints} surveyDescription={activeSurveys[1].surveyDescription} color={activeSurveys[1].color} />
                                <SurveyPageSurvey surveyName={activeSurveys[2].surveyName} surveyPoints={activeSurveys[2].surveyPoints} surveyDescription={activeSurveys[2].surveyDescription} color={activeSurveys[2].color} />
                                <SurveyPageSurvey surveyName={activeSurveys[3].surveyName} surveyPoints={activeSurveys[3].surveyPoints} surveyDescription={activeSurveys[3].surveyDescription} color={activeSurveys[3].color} />
                            </div>
                            <div className="SurveyAndVideoContainer">
                            </div>
                        </div>
                    </Row>

                    <Row style={{ height: "20px"}}>_____________________________________________</Row>
                    <Row style={{ padding: "10px"}}><h5>History</h5></Row>
                    <Row style={{ height: "10px"}} />

                    <Row>
                        <div className="pageContentContainer">
                            <HistoryOfSurvey />
                        </div>
                    </Row>
                </Container>
            </div>
        </div>
    );

}

export default Survey