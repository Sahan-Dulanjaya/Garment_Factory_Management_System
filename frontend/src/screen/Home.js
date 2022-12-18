import React, { useState, useEffect } from "react";
import { Row, Col, Card } from 'react-bootstrap';
import Charts from "./Charts";
import Sidemenu from "./Sidemenu";
export default function Home(props) {

    return (
        <div >      
                    <Sidemenu />

                    <div style={{paddingLeft:'15vh'}}>
                    <Charts />
                    </div>
             


        </div>
    );
}
