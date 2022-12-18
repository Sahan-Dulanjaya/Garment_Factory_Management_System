import "./quotaion.css";
import axios from "axios";
import { saveAs } from "file-saver";
import { useState } from "react";
import Navbar from './Navbar.js';

const Quotaion = () => {
  const [username, setName] = useState("");
  const [sampleid, setSampleid] = useState("");
  const [totcost, setTotcost] = useState("");
  const [tottime, setTottime] = useState("");

  const state = {
    name: username,
    receiptId: sampleid,
    price1: totcost,
    price2: tottime,
  };
  const createAndDownloadPdf = () => {
    axios
      .post("http://localhost:8070/create-pdf", state)
      .then(() =>
        axios.get("http://localhost:8070/fetch-pdf", { responseType: "blob" })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  return (

    <div>
  <Navbar/>

    <div className='quatform'>
      <h1>Quotation Generator</h1>
      <br />
      <br />
      <br />
      <form>
        <div class='form-group'>
          <label for='exampleName'>Name</label>
          <input
            type='text'
            onChange={(e) => {
              setName(e.target.value);
            }}
            class='form-control'
            id='exampleName'
            aria-describedby='emailHelp'
            placeholder='Enter name'
          />
          <br/>
          <label for='exampID'>Sample ID</label>
          <input
            type='text'
            onChange={(e) => {
              setSampleid(e.target.value);
            }}
            class='form-control'
            id='exampID'
            aria-describedby='emailHelp'
            placeholder='Enter ID'
          />
          <br/>
          <label for='totCost'>TotalCost in LKR</label>
          <input
            type='text'
            onChange={(e) => {
              setTotcost(e.target.value);
            }}
            class='form-control'
            id='totCost'
            aria-describedby='emailHelp'
            placeholder='Enter Cost'
          />
          <br/>
          <label for='totTime'>TotalTime in hours</label>
          <input
            type='text'
            onChange={(e) => {
              setTottime(e.target.value);
            }}
            class='form-control'
            id='totTime'
            aria-describedby='emailHelp'
            placeholder='Enter Time'
          />
        </div>
        <br/>
        <button
          type='button'
          class='btn btn-primary'
          onClick={() => createAndDownloadPdf()}
        >
          Generate
        </button>
      </form>
    </div>
    </div>
  );
};

export default Quotaion;
