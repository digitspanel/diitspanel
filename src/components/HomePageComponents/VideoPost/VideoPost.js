import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput,Label, } from "reactstrap";
import './Video.css'

const Video = (props) => {

    const [videosURL, setVideosURL] = useState('https://www.youtube-nocookie.com/embed/X9_h4xcyxlk?controls=0');

    return (
        <div className="HomePageVideo">
            <iframe className="linkedVideo" src={videosURL} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
        </div>
    );

}

export default Video