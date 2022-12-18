import "./Form1.css";
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar.js';

function Formfun() {
  const navigate = useNavigate();

  const [S_ID, setS_ID] = useState("");
  const [Cus_ID, setCus_ID] = useState("");
  const [Cus_Name, setCus_Name] = useState("");
  const [Due_Date, setDue_Date] = useState("");
  const [Progress, setProgress] = useState("");
  const [Description, setDescription] = useState("");

  function SendData(e) {
    e.preventDefault(); // normal behavior eka nathi kranna  php vage yana eka nawaththanawa

    const newSOrder = {
      S_orderID: S_ID,
      Cus_Id: Cus_ID,
      Cus_Name: Cus_Name,
      Due_date: Due_Date,
      description: Description,
      Progress: document.getElementById("Progress").value,
    };

    Axios.post("http://localhost:8070/sampleOrder/add", newSOrder)
      .then(() => {
        alert("Order added");
        navigate("/view");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (

    <div class="container1">
  <Navbar/>

    <div >
      <h1 class="Fheader">Add a new sample</h1>
      <br />
      <form onSubmit={SendData}>
        <label for="fname">Sample Order ID</label>

        <input 
          class="box"
          type="text"
          id="Sorder-ID"
          name="firstname"
          placeholder="Sampler Order ID.."
          onChange={(e) => {
            setS_ID(e.target.value);
          }}
        />
        <br />
        <label for="lname">Customer ID</label>
        <input
          class="box"
          type="text"
          id="Cus_ID"
          name="lastname"
          placeholder="Customer Order ID.."
          onChange={(e) => {
            setCus_ID(e.target.value);
          }}
        />
        <br />
        <label for="lname">Customer Name</label>
        <input
          class="box"
          type="text"
          id="Cus_Name"
          name="lastname"
          placeholder="Customer Name.."
          onChange={(e) => {
            setCus_Name(e.target.value);
          }}
        />
        <br />
        <label for="lname">Due Date</label>
        <input
          class="box"
          type="Date"
          id="Due_Date"
          name="lastname"
          placeholder="Due Date.."
          onChange={(e) => {
            setDue_Date(e.target.value);
          }}
        />
        <br />
        <label for="country">Progress</label>
        <select
          id="Progress"
          name="country"
          onChange={(e) => {
            setProgress(e.target.value);
          }}
        >
          <option value="Finished">Finished</option>
          <option value="Running">Running</option>
          <option value="Not Begun">Not Begun</option>
        </select>
        <br />
        <br />

        <label for="subject">Description</label>
        <br />
        <textarea
          id="Descrption"
          name="subject"
          placeholder="Write Description.."
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <br />
        <input class="box" type="submit" value="Submit" />
      </form>
    </div>
    </div>
  );
}

export default Formfun;
