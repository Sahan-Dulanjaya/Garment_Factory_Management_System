import React, { useState, useEffect } from "react";
import { Table, Button, Card, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { FaPencilAlt, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidemenu from "./Sidemenu";

function ViewOrder(props) {
    const [order, setorder] = useState([]);
    const [search, setSearch] = useState("");
    const [orderid, setordertid] = useState(" ");
    const [name, setName] = useState(" ");
    const [category, setcategory] = useState(" ");
    const [price, setprice] = useState(" ");
    const [quantity, setquantity] = useState(" ");
    const [total, settotal] = useState(" ");
    const [date, setdate] = useState(" ");
    const [_id, setid] = useState(" ");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (_id, orderid, name, category, price, quantity, total, date) => {
        setShow(true);
        setid(_id);
        setordertid(orderid);
        setName(name);
        setcategory(category);
        setprice(price);
        setquantity(quantity);
        settotal(total);
        setdate(date);

    }
    useEffect(() => {

        //get funtion
        function getorder() {
            axios.get("http://localhost:8070/order/view").then((res) => {
                setorder(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getorder();
    }, [])

    //delete funtion
    function onDelete(_id) {
        console.log(_id);
        axios.delete("http://localhost:8070/order/delete/" + _id).then((res) => {
            alert('Deleted Successfully');
            window.location.reload();
        }).catch((err) => {
            alert(err.message);
        })
    }

    const updateUser = (e) => {
        e.preventDefault();
        update(e)
    };


    function update() {
        const newTime = {
            _id, orderid, name, category, price, quantity, total, date
        }

        axios.put("http://localhost:8070/order/update/" + _id, newTime).then(() => {


            setordertid('');
            setName('');
            setcategory('');
            setprice('');
            setquantity('');
            settotal('');
            setdate('');
            alert("Updated Successfully");
            window.location.reload();
        }).catch((err => {
            alert(err)
        }))


    }
    return (
        <div>
            <Sidemenu />
            <div style={{ paddingLeft: "10vh", color: 'white', paddingTop: '4vh' }}>
                <div style={{ paddingLeft: '170vh' }}>

                    <Button>Logout</Button>
                </div>
            </div>
            <div style={{ paddingLeft: '28vh', paddingRight: '7vh', paddingTop: '1vh', paddingBottom: '2vh' }}>
                <Card border="secondary">
                    <div style={{ paddingBottom: "8vh", paddingTop: "5vh", paddingLeft: "8vh", paddingRight: "5vh" }}>
                        <div style={{ paddingBottom: "5vh", paddingTop: "5vh", paddingLeft: "5vh", paddingRight: "5vh" }}>
                            <h1 style={{ paddingLeft: "40%", paddingBottom: "5vh" }}>Orders List</h1>

                            <Link
                                to={{
                                    pathname: "/addorder",
                                }}
                            >

                                <Button><FaPlus /> Add Order</Button>

                            </Link>

                            <div style={{ paddingleft: "10vh", paddingBottom: "1vh", paddingTop: "1vh" }} >

                                <div style={{ paddingleft: "2vh", paddingBottom: "1vh", paddingTop: "1vh" }}>
                                    <div style={{ paddingBottom: "1vh", paddingTop: "1vh" }}>
                                        <input type="text" placeholder="Search from 'Name' " className="mr-2"
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                            }} />
                                    </div>

                                </div>

                            </div>
                            <Table striped bordered hover size="sm" variant="light" >
                                <thead>

                                    <tr>
                                        <th>Order ID</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Date</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {order.filter(Order => {
                                        if (search === "") {
                                            return Order
                                        }
                                        else if (Order.name.toLowerCase().includes(search.toLowerCase())) {
                                            return Order
                                        }
                                    }).
                                        map((Order) => {

                                            return (
                                                <tr key={Order._id}>
                                                    <td>{Order.orderid}</td>
                                                    <td>{Order.name}</td>
                                                    <td>{Order.category}</td>
                                                    <td>{Order.price}</td>
                                                    <td>{Order.quantity}</td>
                                                    <td>{Order.price * Order.quantity}</td>
                                                    <td>{Order.date}</td>
                                                    <td>
                                                        <Button variant="outline-success" onClick={() => handleShow(Order._id, Order.orderid, Order.name, Order.category, Order.price, Order.quantity, Order.total, Order.date)} ><FaPencilAlt /></Button>
                                                    </td>

                                                    <td>
                                                        <Button variant="outline-danger" onClick={() => onDelete(Order._id)}><FaTrashAlt /></Button>

                                                    </td>
                                                </tr>

                                            );
                                        })}

                                </tbody>

                            </Table >

                        </div>
                    </div>



                </Card>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Details </Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <div >
                                <Form.Label>Order ID :</Form.Label>
                                <Form.Control placeholder="orderid"
                                    value={orderid}
                                    onChange={(e) => setordertid(e.target.value)} />
                            </div>

                            <div >
                                <Form.Label>Name : </Form.Label >
                                <Form.Control placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div >
                                <Form.Label>Category :</Form.Label >
                                <Form.Control placeholder="category"
                                    value={category}
                                    onChange={(e) => setcategory(e.target.value)} />
                            </div>
                            <div >

                                <Form.Label>Price :</Form.Label >
                                <Form.Control placeholder="Price"
                                    value={price}
                                    onChange={(e) => setprice(e.target.value)} />
                            </div>

                            <div >

                                <Form.Label>Quantity :</Form.Label >
                                <Form.Control placeholder="quantity"
                                    value={quantity}
                                    onChange={(e) => setquantity(e.target.value)} />
                            </div>
                            <div >
                                <Form.Label>Date: </Form.Label >
                                <Form.Control placeholder="date"
                                    type='date'
                                    value={date}
                                    onChange={(e) => setdate(e.target.value)} />
                            </div>

                            <div style={{ paddingBottom: '2vh', paddingTop: '2vh' }}>

                                <Button variant="outline-success" type="submit" onClick={(e) => updateUser(e)}>Edit</Button>
                                {' '}<Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </div >

                        </Form>
                    </Modal.Body>

                </Modal>
            </div>
        </div>


    );

}
export default ViewOrder;



