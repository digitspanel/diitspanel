import React, { useEffect, useState } from 'react';
import { Card, CardBody, Container, Row, Col, Input, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter, CardHeader, Label, Spinner } from "reactstrap";
import * as Actions from '../../store/actions/surveysAction';
import BootstrapTable from 'react-bootstrap-table-next';
import Sidebar from '../../components/AdminComponents/sidebar';
import paginationFactory from "react-bootstrap-table2-paginator";
import * as UserActions from '../../store/actions/usersAction';
import Select from 'react-select';
import MultiSelect from '../../components/ReactstrapMultiSelect/MultiSelect';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';

const ManageSurveys = (props) => {

    useEffect(() => {
        props.loadAllSurveys();
    }, []);

    const [CreateSurvey, setCreateSurvey] = useState(false);
    const [AssignSurveyModel, setAssignSurveyModel] = useState({show: false, data: null});

    const [filteringInfo, setFilteringInfo] = useState({});

    const [surveyData, setSurveyData] = useState({
        Name: null,
        Description: null,
        Points: null,
        Color: null,
        Url: null,
        SampleSize: null,
    });

    const data = {
        tableColumns: [
            { dataField: "Id", text: "ID", classes: "colStyle", sort: true },
            { dataField: "Name", text: "Survey Name", classes: "colStyle", sort: true },
            { dataField: "Points", text: "Points", classes: "colStyle", sort: true },
            { dataField: "SampleSize", text: "Sample Size", classes: "colStyle", sort: true },
            { dataField: "Url", text: "Url", classes: "colStyle", sort: true },
            { dataField: "StartDate", text: "Start Date", classes: "colStyle", sort: true },
            { dataField: "EndDate", text: "End Date", classes: "colStyle", sort: true },
            {
                dataField: "CreationDate", text: "Creation Date",
                formatter: (cell) => {
                    return cell
                        ? cell.split("T")[0]
                        : null;
                }, 
                classes: "colStyle", sort: true
            },
            {
                dataField: "", text: "",
                formatter: (cell, row) => {
                    return <Button
                        style={{ background: "#4285F4", border: "none" }}
                        onClick={() => setAssignSurveyModel({show: true, data: row})}>
                        Assign
                    </Button>
                }, 
                classes: "colStyle"
            },
        ],
        tableData: props.surveys
    }

    const userData = {
        tableColumns: [
            { dataField: "Id", text: "Id", classes: "colStyle", sort: true },
            { dataField: "EmailId", text: "Email Id", classes: "colStyle", sort: true },
            { dataField: "FirstName", text: "Name", classes: "colStyle", sort: true },
            { dataField: "PQ1", text: "Age", classes: "colStyle", sort: true },
            { dataField: "PQ2", text: "Gender", 
                formatter: (cell) => {
                    return cell
                    ? cell == 1 ? "Male" : "Female": null;
                },
                classes: "colStyle", sort: true
            },
        ],
        tableData: props.users
    }

    return (
        <div className="manageSurveys" style={{ marginLeft: "300px" }}>
            <Sidebar />
            <Container style={{ padding: "50px 20px" }}>
                <Col>
                    <Row style={{padding: "10px"}}>
                        <h3>
                            Surveys
                            </h3>
                        <div style={{ flex: "1" }} />
                        <Button
                            color="primary"
                            onClick={() => setCreateSurvey(true)}
                            style={{
                                margin: 0,
                                padding: 0,
                                borderRadius: "10rem",
                                width: "40px",
                                height: "40px",
                                fontSize: "1.5rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "0 0 4px 0",
                            }}
                            type="button"
                        >
                            +
                        </Button>
                    </Row>
                    <Row>
                        <Card style={{ padding: "20px", width: "100%" }}>
                            <CardBody>
                                <BootstrapTable
                                    defaultSorted={[{ dataField: "Id", order: "desc" }]}
                                    bootstrap4
                                    bordered={false}
                                    keyField="Id"
                                    columns={data.tableColumns}
                                    data={data.tableData}
                                    hover
                                    rowClasses="rowStyle"
                                    pagination={paginationFactory({
                                        sizePerPage: 10,
                                        sizePerPageList: [5, 10, 25, 50],
                                    })}
                                />
                            </CardBody>
                        </Card>
                    </Row>
                </Col>
            </Container>

            <Modal isOpen={CreateSurvey} toggle={() => setCreateSurvey(false)} fade={false}>
                <ModalHeader>Create Survey</ModalHeader>
                <ModalBody>
                    <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                        <Col>
                            <Row style={{ padding: "5px" }}><Input type="text" placeholder="URL:" defaultValue="" onChange={(e) => setSurveyData({
                                ...surveyData,
                                Url: e.target.value,
                            })} /></Row>
                            <Row style={{ padding: "5px" }}><Input type="text" placeholder="Name" onChange={(e) => setSurveyData({
                                ...surveyData,
                                Name: e.target.value,

                            })} /></Row>
                            <Row style={{ padding: "5px" }}><Input type="textarea" placeholder="Description" onChange={(e) => setSurveyData({
                                ...surveyData,
                                Description: e.target.value,
                            })} /></Row>
                            <Row style={{ padding: "5px" }}><Input type="text" placeholder="Points" onChange={(e) => setSurveyData({
                                ...surveyData,
                                Points: e.target.value,
                            })} /></Row>
                            <Row style={{ padding: "5px" }}><Input type="text" placeholder="Color" onChange={(e) => setSurveyData({
                                ...surveyData,
                                Color: e.target.value,
                            })} /></Row>
                            <Row style={{ padding: "5px" }}><Input type="text" placeholder="Sample" onChange={(e) => setSurveyData({
                                ...surveyData,
                                SampleSize: e.target.value,
                            })} /></Row>
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setCreateSurvey(false)}>Close</Button>
                    <Button color="primary" onClick={() => {
                        props.createSurvey(surveyData);
                        setCreateSurvey(false)
                    }
                    }>Create</Button>
                </ModalFooter>
            </Modal>

            <Modal size="xl" isOpen={AssignSurveyModel.show} toggle={() => {
                    setAssignSurveyModel({show: false, data: null});
                }}>
                <ModalHeader>Assign Survey ({AssignSurveyModel.data ? AssignSurveyModel.data.Name : null})</ModalHeader>
                <ModalBody>
                    <Container style={{ height: "450px", display: "flex", flexDirection: "row" }}>
                        <Col sm="4">
                            <CardHeader>
                                User Filter
                            </CardHeader>
                            <Card style={{ height: "365px", overflow: "auto" }}>
                                <Col>
                                    <Row style={{ padding: "5px" }}>
                                        <Col>
                                            <Row>
                                                <h6>Age Group</h6>
                                            </Row>
                                            <Row>
                                                <Col><Input placeholder="Start" onChange={(e) => setFilteringInfo({
                                                    ...filteringInfo,
                                                    ageStart: e.target.value
                                                })}></Input></Col>
                                                <Col xs="auto">to</Col>
                                                <Col><Input placeholder="EndStart" onChange={(e) => setFilteringInfo({
                                                    ...filteringInfo,
                                                    ageEnd: e.target.value
                                                })}></Input></Col>
                                                {console.log(filteringInfo)}
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "5px" }}>
                                        <Col>
                                            <Row>
                                                <h6>Gender</h6>
                                            </Row>
                                            <Row>
                                                <Col style={{ display: "flex", flexDirection: "column", padding: "0 0 0 40px" }}>
                                                    <MultiSelect
                                                        options={[
                                                            { value: "1", label: "Male" },
                                                            { value: "2", label: "Female" }
                                                        ]}
                                                        onChangeResult={(val) => setFilteringInfo({
                                                                ...filteringInfo,
                                                                gender: val
                                                        })}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "5px" }}>
                                        <Col>
                                            <Row>
                                                <h6>Province</h6>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Select
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        options= {[
                                                            {value: "1", label: "Punjab"},
                                                            {value: "2", label: "Sindh"}
                                                        ]}
                                                        isMulti
                                                        isSearchable
                                                        onChange={(e) => {
                                                            let combiningValues = e ? e.map(val => val.value) : "";
                                                            let values = combiningValues ? combiningValues.join(",") : "";
                                                            setFilteringInfo({
                                                                ...filteringInfo,
                                                                province: values
                                                            })
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "5px" }}>
                                        <Col>
                                            <Row>
                                                <h6>City</h6>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Select
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        options= {[
                                                            {value: "1", label: "Lahore"},
                                                            {value: "2", label: "Karachi"}
                                                        ]}
                                                        isMulti
                                                        isSearchable
                                                        onChange={(e) => {
                                                            let combiningValues = e ? e.map(val => val.value) : "";
                                                            let values = combiningValues ? combiningValues.join(",") : "";
                                                            setFilteringInfo({
                                                                ...filteringInfo,
                                                                city: values
                                                            })
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "5px" }}>
                                        <Col>
                                            <Row>
                                                <h6>Maritial Status</h6>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Select
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        options={[
                                                            { name: "PQ4", value: "1", label: "Single" },
                                                            { name: "PQ4", value: "2", label: "Married" },
                                                            { name: "PQ4", value: "3", label: "Divorced" },
                                                            { name: "PQ4", value: "4", label: "Withdrawn" }
                                                        ]}
                                                        isMulti
                                                        isSearchable
                                                        onChange={(e) => {
                                                            console.log(e)
                                                            let combiningValues = e ? e.map(val => val.value) : "";
                                                            let values = combiningValues ? combiningValues.join(",") : "";
                                                            setFilteringInfo({
                                                                ...filteringInfo,
                                                                martialStatu: values
                                                            })
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "5px" }}>
                                        <Col>
                                            <Row>
                                                <h6>Network</h6>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Select
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        options={[
                                                            { name: "PQ6", value: "1", label: "Zong" },
                                                            { name: "PQ6", value: "2", label: "Jazz" },
                                                            { name: "PQ6", value: "3", label: "Telenore" },
                                                            { name: "PQ6", value: "4", label: "Warid" },
                                                        ]}
                                                        isMulti
                                                        isSearchable
                                                        onChange={(e) => {
                                                            let combiningValues = e ? e.map(val => val.value) : "";
                                                            let values = combiningValues ? combiningValues.join(",") : "";
                                                            setFilteringInfo({
                                                                ...filteringInfo,
                                                                network: values
                                                            })
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "5px" }}>
                                        <Col>
                                            <Row>
                                                <h6>No. Of Household Members</h6>
                                            </Row>
                                            <Row>
                                                <Col><Input placeholder="Start" onChange={(e) => setFilteringInfo({
                                                    ...filteringInfo,
                                                    householdStart: e.target.value
                                                })}></Input></Col>
                                                <Col xs="auto">to</Col>
                                                <Col><Input placeholder="End" onChange={(e) => setFilteringInfo({
                                                    ...filteringInfo,
                                                    householdEnd: e.target.value
                                                })}></Input></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "5px" }}>
                                        <Col>
                                            <Row>
                                                <h6>Family</h6>
                                            </Row>
                                            <Row>
                                                <Col style={{ display: "flex", flexDirection: "column", padding: "0 0 0 40px" }}>
                                                    <MultiSelect
                                                        options={[
                                                            { name: "PQ8", value: "1", label: "Single" },
                                                            { name: "PQ8", value: "2", label: "Joint" },
                                                        ]}
                                                        onChangeResult={(val) =>
                                                            setFilteringInfo({
                                                                ...filteringInfo,
                                                                family: val
                                                            })
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "5px" }}>
                                        <Col>
                                            <Row>
                                                <h6>House Own/Rent</h6>
                                            </Row>
                                            <Row>
                                                <Col style={{ display: "flex", flexDirection: "column", padding: "0 0 0 40px" }}>
                                                    <MultiSelect
                                                        options={[
                                                            { name: "PQ10", value: "1", label: "Own" },
                                                            { name: "PQ10", value: "2", label: "Rent" },
                                                        ]}
                                                        onChangeResult={(val) =>
                                                            setFilteringInfo({
                                                                ...filteringInfo,
                                                                houseStatus: val
                                                            })
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "5px" }}>
                                        <Col>
                                            <Row>
                                                <h6>Average Income</h6>
                                            </Row>
                                            <Row>
                                                <Col style={{ display: "flex", flexDirection: "column", padding: "0 0 0 40px" }}>
                                                    <MultiSelect
                                                        options={[
                                                            { name: "PQ11", value: "1", label: "Below 15000" },
                                                            { name: "PQ11", value: "2", label: "Between 15001 to 40000" },
                                                            { name: "PQ11", value: "3", label: "Between 40001 to 100000" },
                                                            { name: "PQ11", value: "4", label: "Above 100000" },
                                                        ]}
                                                        onChangeResult={(val) =>
                                                            setFilteringInfo({
                                                                ...filteringInfo,
                                                                avgIncome: val
                                                            })
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "5px" }}>
                                        <Col>
                                            <Row>
                                                <h6>No. Of Sims</h6>
                                            </Row>
                                            <Row>
                                                <Col><Input placeholder="Start" onChange={(e) => setFilteringInfo({
                                                    ...filteringInfo,
                                                    numOfSimStart: e.target.value
                                                })}></Input></Col>
                                                <Col xs="auto">to</Col>
                                                <Col><Input placeholder="End" onChange={(e) => setFilteringInfo({
                                                    ...filteringInfo,
                                                    numOfSimEnd: e.target.value
                                                })}></Input></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "5px" }}>
                                        <Col>
                                            <Row>
                                                <h6>Smartphone User</h6>
                                            </Row>
                                            <Row>
                                                <Col style={{ display: "flex", flexDirection: "column", padding: "0 0 0 40px" }}>
                                                    <MultiSelect
                                                        options={[
                                                            { name: "PQ13", value: "1", label: "Yes" },
                                                            { name: "PQ13", value: "2", label: "No" },
                                                        ]}
                                                        onChangeResult={(val) =>
                                                            setFilteringInfo({
                                                                ...filteringInfo,
                                                                smartPhone: val
                                                            })
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "5px" }}>
                                        <Col>
                                            <Row>
                                                <h6>Featured Phone User</h6>
                                            </Row>
                                            <Row>
                                                <Col style={{ display: "flex", flexDirection: "column", padding: "0 0 0 40px" }}>
                                                    <MultiSelect
                                                        options={[
                                                            { name: "PQ13", value: "1", label: "Yes" },
                                                            { name: "PQ13", value: "2", label: "No" },
                                                        ]}
                                                        onChangeResult={(val) =>
                                                            setFilteringInfo({
                                                                ...filteringInfo,
                                                                featurePhonne: val
                                                            })
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "5px" }}>
                                        <Col>
                                            <Row>
                                                <h6>SEC Urban</h6>
                                            </Row>
                                            <Row>
                                                <Col style={{ display: "flex", flexDirection: "column", padding: "0 0 0 40px" }}>
                                                    <MultiSelect
                                                        options={[
                                                            { name: 'QSEC', value: '1', label: 'A' },
                                                            { name: 'QSEC', value: '2', label: 'B' },
                                                            { name: 'QSEC', value: '3', label: 'C' },
                                                            { name: 'QSEC', value: '4', label: 'D' },
                                                            { name: 'QSEC', value: '5', label: 'E' },
                                                        ]}
                                                        onChangeResult={(val) =>
                                                            setFilteringInfo({
                                                                ...filteringInfo,
                                                                SECURBAN: val
                                                            })
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "5px" }}>
                                        <Col>
                                            <Row>
                                                <h6>SEC Rural</h6>
                                            </Row>
                                            <Row>
                                                <Col style={{ display: "flex", flexDirection: "column", padding: "0 0 0 40px" }}>
                                                    <MultiSelect
                                                        options={[
                                                            { name: 'QSEC', value: '1', label: 'A' },
                                                            { name: 'QSEC', value: '2', label: 'B' },
                                                            { name: 'QSEC', value: '3', label: 'C' },
                                                            { name: 'QSEC', value: '4', label: 'D' },
                                                            { name: 'QSEC', value: '5', label: 'E' },
                                                        ]}
                                                        onChangeResult={(val) =>
                                                            setFilteringInfo({
                                                                ...filteringInfo,
                                                                SECRURAL: val
                                                            })
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Card>
                            <CardBody style={{padding: "0.5rem 0 0 0"}}>
                                <Col>
                                    <Row>
                                        <div style={{ flex: "1" }} />
                                        <Button disabled={props.loader} onClick={() => {props.setLoader(true); props.loadUsers(filteringInfo);}}>Fetch</Button>
                                    </Row>
                                </Col>
                            </CardBody>
                        </Col>
                        <Col>
                            <CardHeader>
                                <Col>
                                    <Row>
                                        <Label>Users</Label>
                                        <div style={{ flex: "1" }} />
                                        <Label>{props.users.length}</Label>
                                    </Row>
                                </Col>
                            </CardHeader>
                            <Card>
                                <CardBody style={{ height: "365px", padding: "0", overflow: "auto" }}>
                                    { props.loader ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%"}}><Spinner animation="border" role="status" /></div> : <BootstrapTable
                                        defaultSorted={[{ dataField: "Id", order: "desc" }]}
                                        bootstrap4
                                        bordered={false}
                                        keyField="Id"
                                        columns={userData.tableColumns}
                                        data={userData.tableData}
                                        hover
                                        rowClasses="rowStyle"
                                    />}
                                </CardBody>
                            </Card>
                        </Col>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => {
                        setFilteringInfo({});
                        setAssignSurveyModel({ show: false, data: null })
                    }}>Close</Button>

                    <Button color="primary" onClick={() => {
                        toastr.success("Survey Assigned", "Survey has been successfully assigned to the filltered users!")
                        let UserIds = props.users.map(user => user.Id).join(",");
                        props.assignSurvey({
                            SurveyId: AssignSurveyModel.data.Id,
                            SurveyName: AssignSurveyModel.data.Name,
                            Points: AssignSurveyModel.data.Points,
                            UserIds: UserIds
                        })
                        setFilteringInfo(null);
                        setAssignSurveyModel({ show: false, data: null });
                    }
                    }>Assign</Button>
                    
                </ModalFooter>
            </Modal>
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        surveys: state.surveys.adminItems,
        users: state.users.adminItems,
        loader: state.users.loader
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllSurveys: () => dispatch(Actions.loadAllSurveys()),
        assignSurvey: (body) => dispatch(Actions.assignSurveys(body)),
        createSurvey: (data) => dispatch(Actions.createSurvey(data)),
        loadUsers: (data) => dispatch(UserActions.loadUsers(data)),
        setLoader: (val) => dispatch(UserActions.setLoader(val))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSurveys);