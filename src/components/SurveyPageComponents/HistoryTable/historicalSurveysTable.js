import React, { useState } from 'react';
import { Table } from "reactstrap";
import './historicalSurveysTable.css';

const Survey = (props) => {

    const historicalData = [
        {SurveyName: "ABC", Points: 100, Date: "12-Sep", Status: "Done"},
        {SurveyName: "ABC", Points: 50, Date: "1-Sep", Status: "Done"},
        {SurveyName: "ABC", Points: 150, Date: "3-Sep", Status: "Expired"},
        {SurveyName: "ABC", Points: 20, Date: "4-Sep", Status: "Done"},
        {SurveyName: "ABC", Points: 40, Date: "5-Sep", Status: "Done"}
    ]

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