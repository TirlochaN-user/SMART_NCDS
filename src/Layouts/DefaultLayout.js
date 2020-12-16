import React,{Component}from 'react'
import SideBar from './SideBar'
import './Layout.css'
import Button from '@material-ui/core/Button';
import logo from './logo.png';
import Menu from '@material-ui/icons/Menu';
import Backdrop from './Backdrop';
import { Row, Col } from 'react-flexbox-grid';
import {Form} from 'react-bootstrap';
import { Paper, Grid } from '@material-ui/core';
class DefaultLayout extends Component {

    constructor(props)
    {
        super(props)
        this.state={
            toggle:false,
            mrn: 123456789,
            name: "First Last"
        }
    this.toggleSidebar=this.toggleSidebar.bind(this)
    this.handleclose=this.handleclose.bind(this)
    }
    toggleSidebar()
    {
        this.setState((prevState)=>{
            return {toggle:!prevState.toggle}
        }
        )
    }
    set_mrn(event) {
        this.setState({
            mrn: event.target.value
          })
      }
  
    set_name(event) {
        this.setState({
            name: event.target.value
          })
      }
  
    handleclose(){
        this.setState({toggle:false})
    }
    render() { 
        return ( 
        <div className="parent"> 
            <div className="custom-header" >
                <Col lg={12}>
                <Row style={{marginBottom:"1%"}}>
                <div style={{marginLeft:"2%"}}><img src={logo} alt="chla logo"/></div>
                <div className="a_cont"><a href="/" >Neonatal Clinical Decision Support</a></div></Row>
                <Row style={{borderTop:"solid #1B93CA 2px", backgroundColor:"#004F87"}}>
                    <Col lg = {8} style={{marginTop:"0.2%"}}>
                <SideBar class="sidebar" display={this.state.toggle} click={this.handleclose}/>
                </Col>
                <Col lg = {4}>
                    <Form inline style={{paddingTop:"1.3%"}}>
                <Form.Label inline style={{paddingTop:"0.5%",paddingRight:"1%"}}>MRN:</Form.Label>
                <Form.Control 
                inline
                  style = {{width:"30%"}}
                  required
                  type="number"
                  placeholder="MRN"
                  defaultValue="123456789"
                  value={this.state.mrn}
                  onChange={(event)=>this.set_mrn(event)}
                />
                &nbsp;
                &nbsp;
                &nbsp;
                <Form.Label inline style={{paddingTop:"0.5%",paddingRight:"1%"}}>Name:</Form.Label>
                <Form.Control
                inline
                  style = {{width:"30%"}}
                  required
                  type="text"
                  placeholder="Name"
                  defaultValue="First Last"
                  value={this.state.name}
                  onChange={(event)=>this.set_name(event)}
                /></Form>
              </Col>
                </Row>
                </Col>      
            </div>
          
          <Backdrop click={this.handleclose} display={this.state.toggle}/>
          <div className='render-area'>
              {this.props.children}
            </div>
          
        </div>);
    }
}
 
export default DefaultLayout;

