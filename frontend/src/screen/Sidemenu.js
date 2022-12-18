import React, { useState, useEffect } from "react"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FaHome, FaShoppingCart, FaShoppingBag, FaFileContract, FaPencilRuler, FaKaaba,FaMale } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidemenu() {

    return (
        <div >
            <SideNav style={{
                background: '#192841', width: '20vh'
            }}
            >
                <div style={{ paddingTop: '2vh', paddingLeft: '1vh' }}><h6 style={{color:'white'}}>Lakishika Garment Fashion</h6>
                </div>


                <div style={{ paddingTop: '3vh', paddingLeft: '2vh' }}>

                    <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/charts",
                        }}
                    >
                        <NavItem eventKey="home">


                            <NavIcon>
                                <FaHome style={{ width: '1.75em' }} /> Home
                            </NavIcon>

                        </NavItem>
                    </Link><br />

                    <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/addorder",
                        }}
                    >
                        <NavItem eventKey="Newp">
                            <NavIcon>
                                <FaPencilRuler style={{ width: '1.75em' }} /> New Order

                            </NavIcon>


                        </NavItem>
                    </Link><br />



                    <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/addproduct",
                        }}
                    >
                        <NavItem eventKey="Newp">
                            <NavIcon>
                                <FaKaaba style={{ width: '1.75em' }} />New Product

                            </NavIcon>


                        </NavItem>
                    </Link><br />

                    <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/viewproduct",
                        }}
                    >
                        <NavItem eventKey="Newpp">
                            <NavIcon>
                                <FaShoppingBag style={{ width: '1.75em' }} />Products
                            </NavIcon>

                        </NavItem>
                    </Link><br />

                    <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/vieworder",
                        }}
                    >
                        <NavItem eventKey="Newoo">
                            <NavIcon>
                                <FaShoppingCart style={{ width: '1.75em' }} /> Orders
                            </NavIcon>

                        </NavItem>
                    </Link><br />

                    <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/reports",
                        }}
                    >
                        <NavItem eventKey="report">
                            <NavIcon>
                                <FaFileContract style={{ width: '1.75em' }} /> Reports
                            </NavIcon>

                        </NavItem>
                    </Link><br />


                    <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/supplier",
                        }}
                    >
                        <NavItem eventKey="supplier">
                            <NavIcon>
                                <FaMale style={{ width: '1.75em' }} /> Supplier
                            </NavIcon>

                        </NavItem>
                    </Link><br />
                </div>
            </SideNav>

        </div>
    );
}
