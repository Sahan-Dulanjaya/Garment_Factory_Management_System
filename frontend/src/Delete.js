import './Delete.css';
import React,{useState} from "react";
import Axios from "axios";

import { useNavigate } from 'react-router-dom';




 function Deletefun(){

    const navigate=useNavigate();


  const[S_ID,setS_ID]=useState("");
 
 
  function SendData(e){
    e.preventDefault();                           // normal behavior eka nathi kranna  php vage yana eka nawaththanawa
    
    
    const newSOrder={
      S_orderID: S_ID,
     

    }
    

    Axios.delete("http://localhost:8070/sampleOrder/delete",newSOrder).then(()=>{
    
        alert("Order Deleted");
        navigate("/view");

    }).catch((err)=>{
      alert(err);
    })
  }

    return (
    








<div class="container">

    <h1 class ="Fheader">Delete Sample Order</h1>
  <form onSubmit={SendData}>
    <label for="fname">Sample Order ID</label>
    <input class="box"  type="text" id="Sorder-ID" name="firstname" placeholder="Sampler Order ID" onChange={(e) => {setS_ID(e.target.value)}}/>
    <br/>
    
    <input class="box" type="submit" value="Remove Order"/>
  </form>
</div>


      
      
    );
  }
   
  export default Deletefun;
