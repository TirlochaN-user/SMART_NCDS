import React from 'react';
import './Backdrop.css'
const Backdrop = props=>(
    props.display?<div className="bkdrop" onClick={props.click}/>:null
)

export default Backdrop