import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Card, CardBody, Col, Container, Input, Row, CustomInput, Label, Modal, ModalHeader, ModalBody, ModalFooter, CardHeader, CardTitle, FormGroup } from "reactstrap";

const MultiSelect = (props) => {

    const [result, setResult] = useState([]);

    const options = props.options;

    const checked = (e) => {
        var results = result;
        var newArraylist = [];

        if (e.target.checked) {
            results.push(e.target.value);
            setResult(results);
            if(typeof props.onChangeResult !== 'undefined'){
                props.onChangeResult(JSON.stringify(results).replace(/[\[\]\"]/g ,""));
            }
        }
        else {
            newArraylist = results.filter(res => res != e.target.value);
            setResult(newArraylist);
            if(typeof props.onChangeResult !== 'undefined'){
                props.onChangeResult(JSON.stringify(newArraylist).replace(/[\[\]\"]/g ,""));
            }
        }
    }

    const checkCheckBoxs = (Code) => {
        
        for (var i = 0; i <= props.defaultValues.length - 1; i++) {
            var newArray = props.defaultValues;
            if (newArray[i] === Code) {
                return true;
            }
        }

        if (i === props.defaultValues.length - 1) {
            return false;
        }

    }

    return (
        <>
            {options.map((opt, index) => {
                return (
                    <Label key={index} check>
                        <Input type="checkbox" id={opt.id} name={opt.value} value={opt.value} onChange={checked} disabled={props.disabled} />
                        {opt.label}
                    </Label>
                )
            })}
        </>
    )

}

export default MultiSelect;