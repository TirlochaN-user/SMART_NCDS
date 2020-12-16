import React from 'react';
import { Grid } from '@material-ui/core';
import FHIR from "fhirclient";

FHIR.oauth2.authorize({
    "client_id": "a4cb21f4-77e4-4d95-9f11-3124efef20cb",
    "scope": "patient/Patient.read patient/Observation.read launch online_access openid profile"
});

const welcomePage=()=>
{
    
    return(
    <Grid container style={{marginTop:"10%",flexDirection:"column"}}>
    <div style={{textAlign:"center",fontSize:"200%"}}>
        Welcome to Neonatal Clinical Decision Support
    </div>
    
    <div className="message"><h3>Please Select Calculator from Top Navigation Bar</h3></div>
    <div className="min_message"><h3>Please Select Calculator from Top Left Corner</h3></div>
    </Grid>
    )
}

export default welcomePage;