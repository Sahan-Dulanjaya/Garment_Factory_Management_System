import "./ViewTable.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from './Navbar.js';

const Tablefun = () => {
  const [Orders, setOrders] = useState([]);
  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const filteredData = Orders.filter((order) => {
    //if no input the return the original
    if (inputText.input == "") {
      return order;
    }
    //return the item which contains the user input
    else {
      return order.S_orderID.toLowerCase().includes(inputText);
    }
  });

  const fetchOrders = async () => {
    const response = await fetch("http://localhost:8070/sampleOrder/");
    const json = await response.json();
    if (response.ok) {
      setOrders(json);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (

<div>
  <Navbar/>


    <div className='tcontainer'>
      <div className=' searchbar111'>
        <input
          className='searchinput1'
          type='text'
          onChange={inputHandler}
          placeholder='Search...'
        />
      </div>
      <h1 className='header' style={{ paddingTop: "3%", color: "black" }}>
        Sample Orders
      </h1>
      <hr />
      <table class='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Sam Order_ID</th>
            <th scope='col'>Customer ID</th>
            <th scope='col'>Customer Name</th>
            <th scope='col'>Due Date</th>
            <th scope='col'>Description</th>
            <th scope='col'>Progress</th>
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData.map((Order, index) => (
              <tr>
                <th scope='row'>{index + 1}</th>
                <td>{Order.S_orderID}</td>
                <td>{Order.Cus_Id}</td>
                <td>{Order.Cus_Name}</td>
                <td>{Order.Due_date}</td>
                <td>{Order.description}</td>
                <td>{Order.Progress}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Tablefun;
