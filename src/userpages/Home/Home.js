import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, } from "reactstrap";
import UserHeader from '../../components/ToolBar/Header/UserHeader';
import './Home.css';
import profilePics from '../../components/Ananyomous-dp.png';
import Survey from './Surveys/HomePageSurvey.js';
import Video from './VideoPost/VideoPost';
import * as Actions from '../../store/actions/homeActions'
import DailyQuestion from './DailyQuestions/DailyQuestions';
import ShareableLink from './ShareableLink/ShareableLink';
import fire from '../../fire';
import { connect, useSelector } from 'react-redux';

const Home = (props) => {

    useEffect(() => {
        onGreeting();
    }, []);

    useEffect(() => {
        props.loadAddVideo();
        props.loadDailyQuestion(props.useremailid);
        props.updateSurvey(props.surveys);
    }, [props.surveys]);

    const [balanceAmount, setBalanceAmount] = useState(30);
    const [greeting, setGreeting] = useState();
    const [UserName, setUserName] = useState('Ananyomous');
    const [ShareableLinks, setShareableLinks] = useState('http://Localhost:300/code');
    const [profilePic, setProfilePic] = useState('');

    const onGreeting = () => {
        let currDate = new Date();
        let currHour = currDate.getHours();
        let currGreeting;
        if(currHour >= 5 && currHour <= 11){
            currGreeting = "Good Morning";
        }
        else if(currHour >= 12 && currHour <= 16){
            currGreeting = "Good Afternoon";
        }
        else if(currHour >= 17 && currHour <= 20){
            currGreeting = "Good Evening";
        }
        else if(currHour >= 21 && currHour <= 4){
            currGreeting = "Good Night";
        }
        setGreeting(currGreeting);
    }

    fire.auth().onAuthStateChanged(User => {
        if (User) {
            if (User.photoURL != null) {
                setProfilePic(User.photoURL);
            }
            else{
                setProfilePic(profilePics);
            }
            if(User.displayName != null){
                setUserName(User.displayName);
            }
        }
    });

    return (
        <>
            <div className="mainContainer">
                <UserHeader />
                <div className="HomeContainer">
                    <Container fluid>

                        <div className="profileInfo">
                            <Row style={{ height: "30px" }}></Row>

                            <Row>
                                <Col xs="auto"><h6>{greeting}</h6></Col>
                                <div style={{ flex: "1" }} />
                                <Col xs="auto"><h6>{balanceAmount} Points</h6></Col>
                            </Row>

                            <Row>
                                <div className="centerTheItems">
                                    <div className="profilePicDivContainer">
                                        <div className="profilePicDiv"><img src={profilePic} style={{ height: "180px" }} /></div>
                                        <h5 style={{ padding: "10px 0" }}>{props.user.FirstName + " " + props.user.LastName}</h5>
                                    </div>
                                </div>
                            </Row>
                        </div>

                        <Row style={{ height: "20px" }}></Row>

                        <Row>
                            <Container>
                                <Row>
                                    <Col lg={true}>
                                        <Survey
                                            surveyName={props.survey.Name}
                                            surveyPoints={props.survey.Points}
                                            surveyDescription={props.survey.Description}
                                            color={props.survey.Color}
                                            url={props.survey.Url}
                                        />
                                    </Col>
                                    <Col lg={true}>
                                        <Video url={props.addvideo[0] ? props.addvideo[0].URL : null} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={true}>
                                        <DailyQuestion
                                            questionText={props.dailyquestion[0] ? props.dailyquestion[0].Question : null}
                                            options={props.dailyquestion[0] ? props.dailyquestion[0].Options.split(",") : []}
                                            surveyPoints={props.dailyquestion[0] ? props.dailyquestion[0].Points : null}
                                        />

                                    </Col>
                                    <Col lg={true}>
                                        <ShareableLink
                                            link={ShareableLinks}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </Row>

                        {/* <div className="pageContentContainer">
                        <div className="SurveyAndVideoContainer">
                            
                        </div>
                        <div className="SurveyAndVideoContainer">
                            
                        </div>
                    </div> */}

                        <Row style={{ height: "20px" }}></Row>

                        <Row>
                        </Row>
                    </Container>
                </div>
                {console.log(props.user)}
            </div>
        </>
    );

}

const mapStateToProps = (state) => {
    return {
        user: state.users.items,
        surveys: state.surveys.items,
        survey: state.home.survey,
        addvideo: state.home.addVideo,
        dailyquestion: state.home.dailyQuestion,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSurvey: (surveys) => dispatch(Actions.loadSurvey(surveys)),
        loadDailyQuestion: () => dispatch(Actions.loadDailyQuestion()),
        loadAddVideo: () => dispatch(Actions.loadAddVideo()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)