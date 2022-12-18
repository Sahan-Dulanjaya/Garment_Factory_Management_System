import React, { useState, useEffect } from "react";
import { Row, Col, Card,Button } from 'react-bootstrap';
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import Sidemenu from "./Sidemenu";
export default function Reports() {
    const [order, setorder] = useState([]);
    const [product, setproduct] = useState([]);

    useEffect(() => {

        //get order funtion
        function getorder() {
            axios.get("http://localhost:8070/order/view").then((res) => {
                setorder(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }

        //get product funtion
        function getproduct() {
            axios.get("http://localhost:8070/product/view").then((res) => {
                setproduct(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getorder();
        getproduct();
    }, [])


    const generateorderReport = () => {
        const doc = new jsPDF();
        const title = "Order Data Summary";
        doc.setFontSize(15);
        doc.setTextColor(128, 0, 0);
        doc.text(title, 100, 10, null, null, "center");
        doc.setTextColor(0);
        doc.setFontSize(12);

        doc.setFontSize(8);
        doc.text(
            `*This Report is automatically generated.`,
            20,
            35,
            null,
            null
        );

        const headers = [
            [
                "No",
                "Order ID",
                "Name",
                "Category",
                "Price",
                "Quantity",
                "Total",
                "Date",

            ],
        ];

        const data = order.map((reserve, index) => [
            index,
            reserve.orderid,
            reserve.name,
            reserve.category,
            reserve.price,
            reserve.quantity,
            reserve.price * reserve.quantity,
            reserve.date,

        ]);
        let contents = {
            startY: 20,
            head: headers,
            body: data,
        };
        doc.autoTable(contents);
        doc.save("Order_Data_Report.pdf");
    };

    const generateproductReport = () => {
        const doc = new jsPDF();
        const title = "Products  Summary";
        doc.setFontSize(15);
        doc.setTextColor(128, 0, 0);
        doc.text(title, 100, 10, null, null, "center");
        doc.setTextColor(0);
        doc.setFontSize(12);

        doc.setFontSize(8);
        doc.text(
            `*This Report is automatically generated.`,
            20,
            35,
            null,
            null
        );

        const headers = [
            [
                "No",
                "Product ID",
                "Name",
                "Category",
                "Price",
                "Quantity",
                "Total",
                "Date",

            ],
        ];

        const data = product.map((product, index) => [
            index,
            product.productid,
            product.name,
            product.category,
            product.price,
            product.quantity,
            product.price * product.quantity,
            product.date,

        ]);
        let contents = {
            startY: 20,
            head: headers,
            body: data,
        };
        doc.autoTable(contents);
        doc.save("Product_Data_Report.pdf");
    };

    return (
        <div>
            <Sidemenu />
            <div style={{ paddingLeft: '15vh' }} >
                <div style={{ paddingLeft: '160vh', paddingBottom: '2vh',paddingTop:'3vh' }}>

                    <Button>Logout</Button>
                </div>
                <center><h1>Reports</h1></center>
                <div style={{ paddingLeft: '8vh', paddingTop: '5vh' }}>
                    <Row>

                        <Col>
                            <button type="button"
                                id="downloadBtn"
                                onClick={() => generateproductReport()}>
                                <Card style={{ width: '38rem', height: '20rem', background: '#0066FF' }}>
                                    <div style={{ paddingTop: '7rem' }}>

                                        <FaShoppingBag /> <h1 style={{ color: 'white' }}>Products</h1>
                                    </div>
                                </Card>
                            </button>
                        </Col>
                        <Col>
                            <button type="button"
                                id="downloadBtn"
                                onClick={() => generateorderReport()}>
                                <Card style={{ width: '38rem', height: '20rem', background: '#00A86B' }}>
                                    <div style={{ paddingTop: '7rem' }}>

                                        <FaShoppingCart style={{ width: '2vh' }} /> <h1 style={{ color: 'white' }}>Orders</h1>
                                    </div>
                                </Card>
                            </button>
                        </Col>

                    </Row>
                </div>

            </div>
        </div>
    );
}