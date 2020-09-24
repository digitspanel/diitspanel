import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, } from "reactstrap";
import './Account.css'

const Account = (props) => {

    const [EarnedPoints, setEarnedPoints] = useState(0);

    return (
        <div className="Account">
            <div className="AccountContainer">
                <div className="Accountrow verticalCenter">
                    <div className="PointsDetail">
                        <div className="AccountCenter"><h5>Points Detail</h5></div>
                        <div className="Accountrow" style={{height: "50px"}}><h6 style={{width: "75%"}}>Current Balance: </h6><div style={{height: "50px"}}><h6>{EarnedPoints}</h6></div></div>
                        <div className="Accountrow" style={{height: "50px"}}><h6 style={{width: "75%"}}>Total Earned Points: </h6><div style={{height: "50px"}}><h6>{EarnedPoints}</h6></div></div>
                        <div className="Accountrow" style={{height: "50px"}}><h6 style={{width: "75%"}}>Total Withdrawn Points: </h6><div style={{height: "50px"}}><h6>{EarnedPoints}</h6></div></div>
                        <div className="Accountrow" style={{height: "50px"}}><h6 style={{width: "75%"}}>Withdrawable Points: </h6><div style={{height: "50px"}}><h6>{EarnedPoints}</h6></div></div>
                    </div>
                </div>
                <div className="Account verticalCenter"><div className="PointsDetail"></div></div>
            </div>
        </div>
    );
}

export default Account