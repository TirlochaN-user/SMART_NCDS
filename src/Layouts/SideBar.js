import React from 'react';
import './SideBar.css'
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { Row, Col } from 'react-flexbox-grid';
import { styled } from '@material-ui/core';

export default class SideBar extends React.Component{
    // const button_style={width:"100%",color:"white",paddingTop:"12px",textAlign:'left'}
    

    render(){

return(
  <Col style={{backgroundColor:"#004F87", width:"100%"}}>
    <Navbar style={{width:"100%"}}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink activeStyle={{fontSize:"22px", color:"white", textDecoration:"none"}}
            style={{marginLeft:"5%", fontSize:"22px", color:"#77ACC1", textDecoration:"none"}} to="/" exact> Feeding  </NavLink>
          <NavLink activeStyle={{fontSize:"22px", color:"white", textDecoration:"none"}}
            style={{marginLeft:"5%", fontSize:"22px", color:"#77ACC1", textDecoration:"none"}} to="/Hypothermia/HypothermiaCalc">Hypothermia  </NavLink>
          <NavLink activeStyle={{fontSize:"22px", color:"white", textDecoration:"none"}}
            style={{marginLeft:"5%", fontSize:"22px", color:"#77ACC1", textDecoration:"none"}} to="/Sepsis/SepsisCalc">Sepsis  </NavLink>
          <NavLink activeStyle={{fontSize:"22px", color:"white", textDecoration:"none"}}
            style={{marginLeft:"5%", fontSize:"22px", color:"#77ACC1", textDecoration:"none"}} to="/CSCE/CSCECalc">Cardiopulmonary  </NavLink>
        </Nav>
      </Navbar.Collapse>  
    </Navbar>
    </Col>
)
}
}
