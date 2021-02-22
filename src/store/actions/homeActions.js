import axios from '../../axios-order';
import fire from '../../fire';

export const LOADHOMESURVEY = 'LOADHOMESURVEY';
export const LOADDAILYQUESTION = 'LOADDAILYQUESTION';
export const LOADADDVIDEO = 'LOADADDVIDEO';

let emailId = null;

fire.auth().onAuthStateChanged(User => {
    if (User) {
        emailId = User.email;
    }
});

export const loadSurvey = (surveys) => {
    return dispatch => {
        if (surveys && surveys.length > 0) {
            let profileQuestion = surveys.find(survey => survey.Id === 6);
            if (!profileQuestion) {
                console.log(Math.max.apply(Math, surveys.map((survey) => survey.Id)));
                let latestSurveyId = Math.max.apply(Math, surveys.map((survey) => survey.Id));
                let latestSurvey = surveys.find(survey => survey.Id === latestSurveyId);
                dispatch({ type: LOADHOMESURVEY, survey: latestSurvey });
            }
            else {
                dispatch({ type: LOADHOMESURVEY, survey: profileQuestion });
            }
        }
    }
}

export const loadDailyQuestion = () => {
    return dispatch => {
        axios
            .get('/homedailyquestion/' + emailId,{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
                dispatch({ type: LOADDAILYQUESTION, dailyQuestion: res.data });
            })
            .catch((e) => {
                console.log(e);
            })
    }
}

export const loadAddVideo = () => {
    return dispatch => {
        axios
            .get('/homeaddvideo/' + emailId,{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
                dispatch({ type: LOADADDVIDEO, addVideo: res.data });
            })
            .catch((e) => {
                console.log(e);
            })
    }
}