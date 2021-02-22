import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, } from "reactstrap";
import './Video.css'

const Video = (props) => {

    // const [videosURL, setVideosURL] = useState('');

    const consoleIT = () => {
        console.log("Workingsssssss")
    }

    return (
        <div className="HomePageVideo">
            <iframe events={{onStateChange: () => consoleIT()}} className="linkedVideo" src={props.url} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
    );

}

export default Video