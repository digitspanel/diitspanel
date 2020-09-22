import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, } from "reactstrap";
import './Home.css'
import profilePics from './Farhan-Picture.PNG'
import HomePageSurvey from '../../components/HomePageComponents/Surveys/HomePageSurvey.js';
import Video from '../../components/HomePageComponents/VideoPost/VideoPost';
import DailyQuestion from '../../components/HomePageComponents/DailyQuestions/DailyQuestions';
import ShareableLink from '../../components/HomePageComponents/ShareableLink/ShareableLink';
import fire from '../../fire';

const Home = (props) => {

    const [balanceAmount, setBalanceAmount] = useState(30);
    const [UserName, setUserName] = useState('Ananyomous');
    const [EarnedPoints, setEarnedPoints] = useState(0);
    const [WithdrawnPoints, setWithdrawnPoints] = useState(0);
    const [surveyName, setSurveyName] = useState('Available Survey');
    const [surveyPoints, setSurveyPoints] = useState('30');
    const [surveyDescription, setSurveyDescription] = useState('There is going to be description andkjans kjandjkasndk k jakd jkaa kj djkandua kja jkanda kj jkanjdnah kjndj danu hk onandkja kjnada h nkajsndkj adna');
    const [surveyColor, setSurveyColor] = useState('');
    const [QuestionPoints, setQuestionPoints] = useState(10);
    const [QuestionText, setQuestionText] = useState('It worked you tell me which statement best descript for this and that');
    const [QuestionType, setQuestionType] = useState('singleAnswer');
    const [ShareableLinks, setShareableLinks] = useState('http://Localhost:300/code');
    const [profilePic, setProfilePic] = useState('');

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
        <div className="HomeContainer">
            <Container fluid>

                <Row style={{ height: "30px" }}></Row>

                <Row>
                    <div className="centerTheItems" style={{ padding: "0 0 10px 0" }}><h4>You have {balanceAmount} points balance!</h4></div>
                </Row>

                <Row>
                    <div className="centerTheItems"><div className="profilePicDivContainer"><div className="profilePicDiv"><img src={profilePic} style={{ height: "180px" }} /></div><h5 style={{ padding: "10px 0" }}>{UserName}</h5></div></div>
                </Row>

                <Row style={{ height: "20px" }}></Row>

                {/* <Row>
                    <div className="userearninglabel"><h4>Your earned points {EarnedPoints}</h4></div>
                </Row>

                <Row style={{ height: "7px" }}></Row>

                <Row>
                    <div className="userearninglabel"><h4>Your withdrawn points {WithdrawnPoints}</h4></div>
                </Row>

                <Row style={{ height: "10px" }}></Row> */}

                <Row>
                    <div className="pageContentContainer">
                        <div className="SurveyAndVideoContainer">
                            <HomePageSurvey surveyName={surveyName} surveyPoints={surveyPoints} surveyDescription={surveyDescription} color={surveyColor} />
                            <Video />
                        </div>
                        <div className="SurveyAndVideoContainer">
                            <DailyQuestion type={QuestionType} surveyPoints={QuestionPoints} questionText={QuestionText} />
                            <ShareableLink link={ShareableLinks} />
                        </div>
                    </div>
                </Row>

                <Row style={{ height: "20px" }}></Row>

                <Row>
                </Row>
            </Container>
        </div>
    );

}

export default Home