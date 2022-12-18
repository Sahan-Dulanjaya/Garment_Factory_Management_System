import './ManageOrders.css';
import React,{useState} from "react";
import Axios from "axios";
import Deletefun from "./Delete";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.js';

 function Managefun(){

    const navigate=useNavigate();

  const[S_ID,setS_ID]=useState("");
  const[Progress,setProgress]=useState("");
  const[Description,setDescription]=useState("");
 
  function SendData(e){
    e.preventDefault();                           // normal behavior eka nathi kranna  php vage yana eka nawaththanawa
    
    
    const newSOrder={
      S_orderID: S_ID,
      description:Description,
      Progress:document.getElementById("Progress").value,

    }
    console.log(SendData);

    Axios.put("http://localhost:8070/sampleOrder/update",newSOrder).then(()=>{
    
        alert("Order Updated");
        navigate("/view");
    }).catch((err)=>{
      alert(err);
    })
  }

    return (
    



<div  class="container11">
  <Navbar/>


        <div>

<div>

    <h1 class ="Fheader">Add a new sample</h1>
  <form onSubmit={SendData}>
    <label for="fname">Sample Order ID</label>
    <input class="box"  type="text" id="Sorder-ID" name="firstname" placeholder="Sampler Order ID" onChange={(e) => {setS_ID(e.target.value)}}/>
    <br/>
    <select id="Progress" name="country" onChange={(e) => {setProgress(e.target.value)}}>
      <option value="Finished">Finished</option>
      <option value="Running">Running</option>
      <option value="ot Begun">Not Begun</option>
    </select>
    <br/>
    <br/>
    
    <label for="subject">Description</label>
    <br/>
    <textarea id="Descrption" name="subject" placeholder="Write Description Here.."onChange={(e) => {setDescription(e.target.value)}}></textarea>
    <br/>
    <input class="box" type="submit" value="Update Order"/>
    
  </form>
  
</div>
  <br/>  
  <br/>  
<Deletefun/>
</div>
      </div>
      
    );
  }
   
  export default Managefun;
















