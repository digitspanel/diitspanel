import React, { useState } from 'react';
import { Table } from "reactstrap";
import './historicalSurveysTable.css';

const Survey = (props) => {

    const historicalData = props.historicalDataObj

    const renderSurveyHistory = (historicalData, index) => {
        return(
            <tr key={index}>
                <td>{historicalData.SurveyName}</td>
                <td>{historicalData.Points}</td>
                <td>{historicalData.Date}</td>
                <td>{historicalData.Status}</td>
            </tr>
        )
    } 

    return (
        <>
            <div className="SurveyPageTable">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>SurveyName</th>
                            <th>Points</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historicalData.map(renderSurveyHistory)}
                    </tbody>
                </Table>
            </div>
        </>
    );

}

export default Survey