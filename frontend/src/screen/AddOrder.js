import React, { useState } from "react"
import { FaLock } from "react-icons/fa";
import { Fragment } from "react";
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import axios from "axios";
import { Link } from "react-router-dom";
import Sidemenu from "./Sidemenu";


export default function AddOrder() {
  const [orderid, setorderid] = useState(" ");
  const [name, setName] = useState(" ");
  const [category, setcategory] = useState(" ");
  const [price, setprice] = useState(" ");
  const [quantity, setquantity] = useState(" ");
  const [date, setdate] = useState(" ");



  function sendData(e) {


    e.preventDefault();

    const newProducr = {
        orderid, name, category, price, quantity, date
    }

    axios.post("http://localhost:8070/order/add", newProducr).then(() => {
      ("Order added")
      setorderid('');
      setName('');
      setcategory('');
      setprice('');
      setquantity('');
      setdate('')
      alert("Order added ..");
      window.location.reload();

    }).catch((err) => {
      alert("error");
    })
  }
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div>
        <Sidemenu/>
      <div >
      </div>

      <div style={{ paddingLeft: '30vh', paddingTop: '5vh', paddingBottom: '5vh', paddingRight:'5vh' }}>
      <div style={{ paddingLeft: '160vh'}}>
 
        <Button>Logout</Button>
      </div>
      <h1>New Order</h1>

        <Card style={{
        }} >
          <Card.Body>


            <Form onSubmit={sendData}>

              <br />
              <div >
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Order ID :</Form.Label>
                      <Form.Control type="text" name='Order'
                        onChange={(e) => setorderid(e.target.value)}
                        placeholder=" Enter Order ID  .." />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label >Name : </Form.Label>
                      <Form.Control type="text"
                        onChange={(e) => setName(e.target.value)}

                        placeholder=" Enter Name .." />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label >Category: </Form.Label>
                      <Form.Control type="text"
                        onChange={(e) => setcategory(e.target.value)}

                        placeholder=" Enter Categoryr .." />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label >Price : </Form.Label>
                      <Form.Control type="text"
                        onChange={(e) => setprice(e.target.value)}
                        placeholder=" Enter Price .." />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label >Quantity: </Form.Label>
                      <Form.Control type="text"
                        onChange={(e) => setquantity(e.target.value)}

                        placeholder=" Enter Quantity .." />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label >Date:  </Form.Label>

                      <Form.Control type="date"
                        onChange={(e) => setdate(e.target.value)}

                        placeholder='Date ..' />

                    </Form.Group>
                  </Col>
                </Row>

              </div>

              <div style={{ paddingLeft: "40%" }}>
                <Button type="submit">~ ~ Save ~ ~</Button>{' '} {' '}<Button variant="danger" onClick={refreshPage}>- Clear -</Button>

              </div>
            </Form>

          </Card.Body>
        </Card>
      </div>


    </div>
  );
}
