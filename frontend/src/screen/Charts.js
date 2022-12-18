import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from 'react-bootstrap';
import axios from "axios";
import { BarChart, Bar, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Sidemenu from "./Sidemenu";

export default function Charts() {
    const [order, setorder] = useState([]);
    const [product, setproduct] = useState([]);
    const [ordercount, setordercount] = useState('');
    const [productcount, setproductcount] = useState('');


    useEffect(() => {

        //get order funtion
        function getorder() {
            axios.get("http://localhost:8070/order/view").then((res) => {
                setorder(res.data);
                console.log(res.data.length);
                setordercount(res.data.length);
            }).catch((err) => {
                alert(err.message);
            })
        }

        //get product funtion
        function getproduct() {
            axios.get("http://localhost:8070/product/view").then((res) => {
                setproduct(res.data);
                console.log(res.data.length);
                setproductcount(res.data.length);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getorder();
        getproduct();
    }, [])



    return (
        <div>
            <Sidemenu />


            <div style={{ paddingLeft: '23vh', paddingTop: '5vh' }}>
                <div style={{ paddingLeft: '160vh',paddingBottom:'2vh' }}>

                    <Button>Logout</Button>
                </div>
                <Row>
                    <Col>
                        <Card style={{ width: '25rem' }}>

                            <div style={{ paddingLeft: '2vh', paddingTop: '2vh' }}>
                                <h5>{productcount} Products</h5>
                                <div >
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={product}>
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="price" fill="rgba(106, 110, 229)" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '25rem' }}>

                            <div style={{ paddingLeft: '2vh', paddingTop: '2vh' }}>
                                <h5>{ordercount} Orders</h5>
                            </div>

                            <ResponsiveContainer width="100%" height={200}>

                                <AreaChart
                                    data={order}
                                >
                                    <Area dataKey="price" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis dataKey="date" />
                                    <Tooltip />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '25rem' }}>
                            <h3>Products Summery</h3>
                            <ResponsiveContainer width="100%" height={200}>

                                <LineChart
                                    data={product}
                                >
                                    <Line dataKey="price" stroke="#8884d8" />
                                    <Line dataKey="quantity" stroke="#00FF00" />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis dataKey="date" />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>
                </Row>
                <div style={{ paddingLeft: '3vh', paddingTop: '5vh', paddingRight: '5vh' }}>
                    <Row>
                        <div>
                            <h3>Orders Summery</h3>
                            <ResponsiveContainer width="100%" height={300}>

                                <LineChart
                                    data={order}
                                >
                                    <Line dataKey="price" stroke="#8884d8" />
                                    <Line dataKey="quantity" stroke="#00FF00" />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis dataKey="date" />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                    </Row>
                </div>
            </div>
        </div>
    );
}
