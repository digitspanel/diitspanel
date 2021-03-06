import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, } from "reactstrap";
import UserHeader from '../../components/ToolBar/Header/UserHeader';
import './Account.css'
import easypaisa from '../../assets/AccountPageImages/easypaisa-logo.png'
import jazzcash from '../../assets/AccountPageImages/jazzcash.png'
import bankicon from '../../assets/AccountPageImages/colorBankIcon.png'
import { useSelector } from "react-redux";


const Account = (props) => {

    const logedIn = useSelector(({ auth }) => auth.logedIn);

    const [CurrentBalance, setCurrentBalance] = useState(0);
    const [TotalEarnedPoints, setTotalEarnedPoints] = useState(0);
    const [TotalWithdrawnPoints, setTotalWithdrawnPoints] = useState(0);
    const [WithdrawablePoints, setWithdrawablePoints] = useState(0);

    return (
        <>
            <div className="mainContainer">
                <UserHeader />
                <div className="Account">
                    <div className="AccountContainer">
                        <div className="Accountrow verticalCenter">
                            <div className="FirstContainer">
                                <div className="AccountSpacer" />
                                <div className="AccountCenter"><h5>Points Detail</h5></div>
                                <div className="Accountrow" style={{ height: "50px" }}>
                                    <h6 style={{ width: "75%" }}>Current Balance: </h6>
                                    <div style={{ height: "50px" }}><h6>{CurrentBalance}</h6>
                                    </div>
                                </div>
                                <div className="Accountrow" style={{ height: "50px" }}><h6 style={{ width: "75%" }}>Total Earned Points: </h6><div style={{ height: "50px" }}><h6>{TotalEarnedPoints}</h6></div></div>
                                <div className="Accountrow" style={{ height: "50px" }}><h6 style={{ width: "75%" }}>Total Withdrawn Points: </h6><div style={{ height: "50px" }}><h6>{TotalWithdrawnPoints}</h6></div></div>
                                <div className="Accountrow" style={{ height: "50px" }}><h6 style={{ width: "75%" }}>Withdrawable Points: </h6><div style={{ height: "50px" }}><h6>{WithdrawablePoints}</h6></div></div>
                                <div className="AccountCenter"><h5>Withdraw Amount</h5></div>
                                <div className="Accountrow verticalCenter horizentalCenter">
                                    <div><img className="financeIcon" style={{ height: "50px", padding: "0 10px" }} src={easypaisa} /></div>
                                    <img className="financeIcon" style={{ height: "80px", padding: "0 30px" }} src={jazzcash} />
                                    <img className="financeIcon" style={{ height: "60px" }} src={bankicon} />
                                </div>
                            </div>

                        </div>
                        <div className="Accountrow verticalCenter">
                            <div className="SecondContainer">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {console.log("Workingsssss", logedIn)}
        </>
    );
}

export default Account