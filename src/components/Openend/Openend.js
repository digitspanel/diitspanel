import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput, Label, Modal, ModalHeader, ModalBody, ModalFooter, CardHeader, CardTitle, FormGroup } from "reactstrap";

const Openend = (props) => {

    let id = 0;

    const [result, setResult] = useState([]);
    const [values, setValues] = useState([]);

    const options = props.options;

    const captured = (e) => {
        var results = result;
        var value = values;

        if (results.find(res => res == e.target.id) === undefined) {
            console.log("notfound");
            while(results.length < e.target.id){
                results.push(e.target.id - results.length);
                value.push("");
            }
            results.push(e.target.id);
            setResult(results);
            value.push(e.target.value);
            setValues(value);

            if(typeof props.onChangeResult !== 'undefined'){
                props.onChangeResult(JSON.stringify(value).replace(/[\[\]\"]/g ,""));
            }
        }
        else {
            value[e.target.id] = e.target.value;
            setValues(value);

            if(typeof props.onChangeResult !== 'undefined'){
                props.onChangeResult(JSON.stringify(value).replace(/[\[\]\"]/g ,""));
            }
        }
    }

    return (
        <>
            {options.map((opt, index) => {
                return (
                    <Label key={index}>
                        <Row>
                            <Col>
                                {opt.label}
                            </Col>
                            <Col>
                                <Input type={props.inputType ? props.inputType == "numeric" ? "number" : "textbox" : "textbox" } id={id++} onChange={captured} defaultValue={props.defaultValue ? props.defaultValue[id-1] : ""} />
                            </Col>
                        </Row>
                    </Label>
                )
            })}
        </>
    )

}

export default Openend;