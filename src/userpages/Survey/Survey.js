import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import { CardBody, Container, Row, Col } from "reactstrap";
import './Survey.css'
import UserHeader from '../../components/ToolBar/Header/UserHeader';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/surveysAction';
import SurveyPageSurvey from './Surveys/SurveyPageSurvey';

import * as socket from "../../socket";

const Survey = (props) => {

    useEffect(() => {
        socket.socket.on("Survey", () => {
            props.loadSurvey();
        });
    }, []);

    const data = {
        tableColumns: [
            { dataField: "Id", text: "ID", classes: "colStyle", sort: true },
            { dataField: "SurveyName", text: "Survey Name", classes: "colStyle", sort: true },
            { dataField: "Points", text: "Points", classes: "colStyle", sort: true },
            { dataField: "Date", text: "Assigning Date", classes: "colStyle", sort: true },
            { dataField: "Status", text: "Status", classes: "colStyle", sort: true },
        ],
        tableData: props.surveyshistory
    }

    return (
        <>
            <div className="mainContainer">
                <UserHeader />
                <div className="SurveyContainer">
                    <div className="SurveyDiv">
                        <Container fluid>

                            <Row style={{ height: "20px" }}>_____________________________________________</Row>
                            <Row style={{ padding: "10px" }}><h5>Active Surveys</h5></Row>
                            <Row style={{ height: "10px" }} />

                            <Row className="surveys">
                                {props.surveys != "" ? <>
                                    {props.surveys.map((survey, index) => <div key={index}>
                                        <Row>
                                            <Col lg={true}>
                                                <SurveyPageSurvey
                                                    surveyName={survey.Name}
                                                    surveyPoints={survey.Points}
                                                    surveyDescription={survey.Description}
                                                    color={survey.Color}
                                                    url={survey.Url}
                                                />
                                            </Col>
                                        </Row>
                                    </div>)}
                                </> : <div>No Survey Available!</div>}
                            </Row>

                            <Row style={{ height: "20px" }}>_____________________________________________</Row>
                            <Row style={{ padding: "10px" }}><h5>History</h5></Row>
                            <Row style={{ height: "10px" }} />

                            <Row>
                                <Container>
                                    <BootstrapTable
                                        defaultSorted={[{ dataField: "Id", order: "desc" }]}
                                        bootstrap4
                                        bordered={false}
                                        keyField="Id"
                                        columns={data.tableColumns}
                                        data={data.tableData}
                                        hover
                                        rowClasses="rowStyle"
                                    />
                                    {props.surveyshistory == "" ? <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>No History Available!</div> : null}
                                </Container>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );

}

const mapStateToProps = (state) => {
    return {
        surveys: state.surveys.items,
        surveyshistory: state.surveys.history,
        surveyList: state.surveys.list,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadSurvey: () => dispatch(Actions.loadList()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);