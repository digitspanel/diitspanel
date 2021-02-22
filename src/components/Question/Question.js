import React, { useState } from 'react';
import { Card, CardBody, Col, Input, Row,Label, FormGroup, CardHeader, Button } from "reactstrap";
import MultiSelect from '../ReactstrapMultiSelect/MultiSelect';
import Openend from '../Openend/Openend'
import { connect } from 'react-redux';

const Question = (props) => {

    const [showOpenend, setShowOpenend] = useState(0);
    const [result, setResult] = useState([]);

    const onClick = (e) => {
        let res = result;
        if(result.length == 0) {
            res.push([e.target.value]);
        }
        else{
            res[0] = e.target.value;
        }
        setResult(res);
        setShowOpenend(e.target.value);
        props.onChange(JSON.stringify(res[0]).replace(/[\[\]\"]/g ,""));
    }

    const onchange = (e) => {
        let res = result;
        console.log(res)
        if(result.length == 2){
            res[1] = e.target.value;
        }
        else{
            res.push([e.target.value]);
        }
        
        setResult(res);
        props.onChange(JSON.stringify(res).replace(/[\[\]\"]/g ,""));
    }

    return (
        <>
            {props.type == "SingleAnswer" ?
                <Card style={{ minWidth: "100%", padding: "20px" }}>
                    <CardHeader >
                        {props.questiontext}
                    </CardHeader>
                    <CardBody>
                        <Col>
                            <Row>
                                <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                                    {props.options.map((opt, index) => <Label key={index}>
                                        <Input onClick={(e) => onClick(e)} name={opt.name} value={opt.value} type="radio" defaultChecked={ opt.value == props.defaultValue ? true : false} /> {opt.label}
                                        {opt.openend && opt.value == showOpenend ? <Input onChange={(e) => onchange(e)} type="textbox" /> : null}
                                    </Label>)}
                                </FormGroup>
                            </Row>
                        </Col>
                    </CardBody>
                </Card>
                : null}
            {props.type == "MultiAnswer" ?
                <Card style={{ minWidth: "100%", padding: "20px" }}>
                    <CardHeader>
                        {props.questiontext}
                    </CardHeader>
                    <CardBody>
                        <Col>
                            <Row>
                                <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                                    <MultiSelect
                                        options={props.options}
                                        disabled={false}
                                        onChangeResult={props.onChange}
                                    />
                                </FormGroup>
                            </Row>
                        </Col>
                    </CardBody>
                </Card>
                : null}
            {props.type == "Openend" ?
                <Card style={{ minWidth: "100%", padding: "20px" }}>
                    <CardHeader>
                        {props.questiontext}
                    </CardHeader>
                    <CardBody>
                        <Col>
                            <Row>
                                <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                                    <Openend
                                        options={props.options}
                                        inputType={props.inputType}
                                        defaultValue={props.defaultValue}
                                        disabled={false}
                                        onChangeResult={props.onChange}
                                    />
                                </FormGroup>
                            </Row>
                        </Col>
                    </CardBody>
                </Card>
                : null}
        </>
    )
}

export default Question;