import React, { useEffect, useState } from 'react';
import { CardBody, Container, Row, Col, CardHeader, Card } from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import Sidebar from '../components/AdminComponents/sidebar';
import { Chart } from 'react-charts'
import { connect } from 'react-redux';
import * as UserActions from '../store/actions/usersAction';
import { routerActions } from 'react-router-redux';

const Dashboard = (props) => {

    useEffect(() => {
        props.loadUsersInfo();
    },[])

    const userRegLineChart = [
        {
          label: 'Series 1',
          data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
        },
    ];

    const userRegLineChartAxis = [
        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left' }
    ];

    return (
        <div className="dashboard" style={{marginLeft: "300px"}}>
            <Sidebar />
            <Container style={{ padding: "50px 20px" }}>
                <Col>
                    <Row><Col>
                        <Row><h2>Users</h2></Row>
                        <Row>
                            <CardBody style={{ width: '100%', height: '100px' }}>
                                <Col>
                                    <Row>
                                        <Col style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Card style={{display: "flex", alignItems: "center", justifyContent: "center", width: "200px", padding: "1rem"}}>
                                                <h5>{props.totalUsers} Users</h5>
                                            </Card>
                                        </Col>
                                        <Col style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Card style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "200px", padding: "1rem"}}>
                                                <h5>{props.totalPQUsers} PQ Users</h5>
                                            </Card>
                                        </Col>
                                        <Col style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Card style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "200px", padding: "1rem"}}>
                                                <h5>{30} Active Users</h5>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </CardBody>
                        </Row>
                        <Row
                            style={{
                                width: '100%',
                                height: '300px'
                            }}
                        >
                            <CardHeader style={{ width: '100%', display: "flex", alignItems: "center", justifyContent: "center" }}>
                                User Registered Per Day
                            </CardHeader>
                            <Chart
                                data={userRegLineChart}
                                axes={userRegLineChartAxis}
                            />
                        </Row>
                    </Col></Row>
                    <Row style={{height: "70px"}} />
                    <Row>
                        <Col>
                            <h2>Surveys</h2>
                        </Col>
                    </Row>
                </Col>
            </Container>
            {console.log(props.totalUsers)}
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        totalUsers: state.users.totalUsers,
        totalPQUsers: state.users.totalPQUsers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsersInfo: () => dispatch(UserActions.loadUsersInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);