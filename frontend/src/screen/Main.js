import React, { useState, useEffect } from "react";
import { Row, Col, Card } from 'react-bootstrap';
import AddStudent from "./AddProduct";
export default function Main(props) {

    return (
        <div >
            <Row>
                <Col>
                    <AddStudent />
                </Col>

            </Row>


        </div>
    );
}
