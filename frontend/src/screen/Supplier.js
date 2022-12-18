import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import Sidemenu from './Sidemenu';


export default function Supplier() {
    const [show, setShow] = useState(false);
    const [shows, setShows] = useState(false);
    const [productname, setproductname] = useState("");
    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [price, setprice] = useState("");
    const [category, setcategory] = useState("");
    const [_id, setid] = useState(" ");
    const handleClose = () => setShow(false);
    const handleCloses = () => setShows(false);
    const handleShow = (_id,
     name,phone, productname, category, price) => {
        setShow(true);
        setid(_id);
        setname(name);
        setphone(phone);
        setcategory(category);
        setproductname(productname);
        setprice(price);
    }

    const handleShows = () => {
        setShows(true);
    }

    const [Work, setWork] = useState([]);

    function sendData(e) {
        e.preventDefault();

        const newEmployee = {
            productname,
            name,
            phone,
            price,
            category
        }


        axios.post("http://localhost:8070/supplier/add", newEmployee).then(() => {
            alert("Supplier Added");
            window.location.reload();
        }).catch((err) => {
            alert(err);
        })


    }

    function update(e) {
        e.preventDefault();

        const newdd = {
            _id,
            productname,
            name,
            phone,
            price,
            category
        }



        axios.put("http://localhost:8070/supplier/update/" + _id, newdd).then(() => {
            alert("Updated Successfully");
            window.location.reload();

            setproductname('');
            setname('');
            setphone('');
            setprice('');
            setcategory('');

        }).catch((err => {
            alert(err)
        }))
    }



    useEffect(() => {
        function getWork() {
            axios.get("http://localhost:8070/supplier/view").then((res) => {
                console.log(res.data);
                setWork(res.data);

            }).catch((err) => {
                alert(err.message);
            })
        }
        getWork();
    }, [])

    const deleteData = (e) => {

        var result = window.confirm("Are you sure?");

        if (result === true) {

            axios.delete(`http://localhost:8070/supplier/delete/${e._id}`).then((res) => {
                alert("Job Deleted Successfuly");
                window.location.reload(false);


            }).catch(e => {

                alert(e)

            })

        } else {

            e.preventDefault();

        }


    }

    //Search
    const [serQuary, setSupplier] = useState("");



    function searchEmployee(supplier) {

        setSupplier(supplier.target.value);

    }

    console.log(serQuary);

    return (

        <div>
            <Sidemenu/>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-7 mt-3 mb-4'><br></br><br></br><br></br>
                        <h2 className="Fheader"> Supplier Details</h2><br></br><br></br>
                    </div>

                    <div style={{ display: "inline-block" }}>

                        <input onChange={searchEmployee} className="form-control form-control-sm ml-3 w-25" type="text" placeholder="Search by supplier Name"
                            aria-label="Search"></input>
                    </div>
                    <div style={{ paddingLeft: '130vh' }}>

                        <button type="button" className="btn btn-primary float-right" onClick={handleShows}>Add Supplier</button>
                    </div>
                </div>

                <table className="table table-hover" style={{ marginTop: '40px' }}>

                    <thead>
                        <tr>
                            <th><center>Name</center></th>
                            <th><center>Phone Number</center></th>
                            <th><center>Product Name</center></th>
                            <th><center>Category</center></th>
                            <th><center>Price</center></th>
                            <th><center>Action</center></th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            Work.filter(e =>

                                e.name.toLowerCase().includes(serQuary)
                                /*||e.firstName.toLowerCase().includes(serQuary)
                                ||e.lastName.toLowerCase().includes(serQuary)
                                ||e.NIC.toLowerCase().includes(serQuary)*/

                            )
                                .map((e, i) => (
                                    <tr key={e._id}>
                                        <td><center>{e.name}</center></td>
                                        <td><center>{e.phone}</center></td>
                                        <td><center>{e.productname}</center></td>
                                        <td><center>{e.category}</center></td>
                                        <td><center>{e.price}</center></td>

                                        <td><center> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16" onClick={() => handleShow(e._id, e.name, e.phone, e.productname, e.category, e.price)} >
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16" onClick={() => { deleteData(e) }}>
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>

                                        </center></td>

                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
                <Modal show={shows} onHide={handleCloses}>
                    <Modal.Header closeButton>
                        <Modal.Title>Supplier Management</Modal.Title>
                    </Modal.Header>
                    <div className="container">
                        <form onSubmit={sendData}>
                            <div className="row">
                                <div className="col">
                                    <label for="fname"> Name</label>
                                    <input type="text" className="form-control" id="fname" placeholder=" name"
                                        onChange={(e) => {
                                            setname(e.target.value);
                                        }}
                                    /><br />
                                    <label for="nic">Phone Number</label>
                                    <input type="text" className="form-control" id="nic" placeholder="phone"
                                        onChange={(e) => {
                                            setphone(e.target.value);
                                        }} /><br />
                                    <label for="nic">Product Name</label>
                                    <input type="text" className="form-control" id="id" placeholder="Product name"
                                        onChange={(e) => {
                                            setproductname(e.target.value);
                                        }} /><br />



                                </div>
                                <div className="col">
                                    <label for="lname" >Category :</label>
                                    <input type="text" className="form-control" id="lname" placeholder="category"
                                        onChange={(e) => {
                                            setcategory(e.target.value);
                                        }} /><br />
                                    <label for="dob">Price :</label>
                                    <input type="text" className="form-control" id="dob" placeholder="Price"
                                        onChange={(e) => {
                                            setprice(e.target.value);
                                        }} /><br />

                                </div>
                            </div>

                            <div style={{ paddingLeft: "45vh" }}>
                                <Button type="submit" variant="outline-success" >ADD</Button> <br /><br />

                            </div>

                        </form>
                    </div>
                </Modal>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Supplier Management</Modal.Title>
                    </Modal.Header>
                    <div className="container">
                        <form onSubmit={update}>
                            <div className="row">
                                <div className="col">
                                    <label for="fname"> Name</label>
                                    <input type="text" className="form-control" id="fname" placeholder=" name"
                                        value={name}
                                        onChange={(e) => {
                                            setname(e.target.value);
                                        }}
                                    /><br />
                                    <label for="nic">Phone Number</label>
                                    <input type="text" className="form-control" id="nic" placeholder="phone"
                                        value={phone}
                                        onChange={(e) => {
                                            setphone(e.target.value);
                                        }} /><br />
                                    <label for="nic">Product Name</label>
                                    <input type="text" className="form-control" id="id" placeholder="Product name"
                                        value={productname}
                                        onChange={(e) => {
                                            setproductname(e.target.value);
                                        }} /><br />



                                </div>
                                <div className="col">
                                    <label for="lname" >Category :</label>
                                    <input type="text" className="form-control" id="lname" placeholder="category"
                                        value={category}
                                        onChange={(e) => {
                                            setcategory(e.target.value);
                                        }} /><br />
                                    <label for="dob">Price :</label>
                                    <input type="text" className="form-control" id="dob" placeholder="Price"
                                        value={price}
                                        onChange={(e) => {
                                            setprice(e.target.value);
                                        }} /><br />

                                </div>
                            </div>

                            <div style={{ paddingLeft: "45vh" }}>
                                <Button type="submit" variant="outline-success" >Update</Button> <br /><br />

                            </div>

                        </form>
                    </div>
                </Modal>
            </div>
        </div>

    )
}