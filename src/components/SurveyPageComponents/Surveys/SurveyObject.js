import React, { useState } from 'react'
import SurveyPageSurvey from './SurveyPageSurvey'

const SurveyObject = (props) => {

    const surveyObj = props.SurveysObj;

    const Surveys = (surveyObj, index) => {
        return (
            <div key={index}>
                <SurveyPageSurvey
                    surveyName={surveyObj.surveyName}
                    surveyPoints={surveyObj.surveyPoints}
                    surveyDescription={surveyObj.surveyDescription}
                    color={surveyObj.color}
                />
            </div>
        )
    }

    return (
        <>
            {surveyObj.map(Surveys)}
        </>
    );

}

export default SurveyObject