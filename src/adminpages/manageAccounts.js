import React, { useEffect, useState } from 'react';
import { CardBody, Container, Row, Col } from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import Sidebar from '../components/AdminComponents/sidebar';
import { connect } from 'react-redux';

const manageAccounts = (props) => {

    return (
        <div className="manageSurveys" style={{marginLeft: "300px"}}>
            <Sidebar />
            <p>Accounts</p>
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(manageAccounts);