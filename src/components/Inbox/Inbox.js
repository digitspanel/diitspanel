import React, { useState, useEffect, useRef } from 'react';
import './Inbox.css'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions/inboxAction'
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, CardHeader, } from "reactstrap";

import * as socket from "../../socket";

// let useClickOutside = (handler) => {
//     let domNode = useRef();
  
//     useEffect(() => {
//       let maybeHandler = (event) => {
//         if (!domNode.current.contains(event.target)) {
//           handler();
//         }
//       };
  
//       document.addEventListener("mousedown", maybeHandler);
  
//       return () => {
//         document.removeEventListener("mousedown", maybeHandler);
//       };
//     });
  
//     return domNode;
//   };

const Inbox = (props) =>{

    const [timeCounter, setTimeCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeCounter(timeCounter + 1);
        }, 1000);
        return () => { clearInterval(interval) }
    })

    useEffect(() => {
        socket.socket.on("Notification", () => {
            props.loadInbox(localStorage.getItem("digitspanel_user_emailId"));
        });
        props.loadInbox(localStorage.getItem("digitspanel_user_emailId"));
    }, []);

    const onNotifiTimeDiff = (dbDate) => {
        let dbDateTime = dbDate;
        let date = dbDateTime.split("T")[0].split("-");
        let time = dbDateTime.split("T")[1].split(".")[0].split(":");
        let dateTime = new Date(date[0],date[1]-1,date[2],parseInt(time[0], 10) + 5,time[1],time[2]);
        let currentDateTime = new Date();
        let diff = currentDateTime - dateTime;
        let newYear = Math.round(diff / (1000 * 60 * 60 * 24 * 360));
        let newMonth = Math.round(diff / (1000 * 60 * 60 * 24 * 30));
        let newDay = Math.round(diff / (1000 * 60 * 60 * 24));
        let newHour = Math.round(diff / (1000 * 60 * 60));
        let newMin = Math.round(diff / (1000 * 60));
        let newSec = Math.round(diff / (1000));
        if(newSec < 60){
            return(newSec + " sec ago");
        }
        else if(newMin < 60){
            return(newMin + " mints ago");
        }
        else if(newHour < 24){
            return(newHour + " hours ago");
        }
        else if(newDay < 30){
            return(newDay + " day ago");
        }
        else if(newMonth < 12){
            return(newMonth + " month ago");
        }
        else {
            return(newYear + " year ago");
        }
    }

    // const [inboxShow, setInboxShow] = useState({
    //     inboxShow: false
    // });

    // setInboxShow({
    //     inboxShow: props.show
    // });

    // let domNode = useClickOutside(() => {
    //     setInboxShow({
    //         inboxShow: false
    //     });
    // });

    let inboxClass = "Inbox";
    if(props.show){
        inboxClass = "Inbox open";
    }

    return(
        <div className={inboxClass}>
            <Container>
                <CardHeader>
                    <Row>
                        <h4>
                            Notifications
                    </h4>
                    </Row>
                </CardHeader>
                    {props.messages != "" ? props.messages.map((opt, index) => <CardBody onClick={() => props.setStatus(opt.Id)} className="notificationBody" key={index}>
                    <Row className="notification">
                        <Col>
                            <Row>
                                <h6>
                                    {opt.Title}
                                </h6>
                            </Row>
                            <Row>
                                <p>
                                    {opt.Status === 'Unseen' ? <b>
                                        {opt.Description}
                                    </b> :
                                        opt.Description
                                    }
                                </p>
                            </Row>
                        </Col>
                        <Col xs="auto">
                            <Row>
                                <label>{onNotifiTimeDiff(opt.Date)}</label>
                            </Row>
                            <Row>
                                {opt.Status == "Unseen" ? <label style={{color: "red"}}><b>New</b></label> : null}
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
                )
                    :
                    <CardBody>
                        <Row className="NothingBox">
                            <h5>Nothing To Show</h5>
                        </Row>
                    </CardBody>
                }
            </Container>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        useremail: state.users.items.EmailId,
        messages: state.inbox.items,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadInbox: (emailId) => dispatch(Actions.loadInbox(emailId)),
        setStatus: (id) => dispatch(Actions.setStatus(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);