import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import CallApi from './CallApi'
import Grid from '@material-ui/core/Grid'
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined'
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class SarnatForm extends Component {
    constructor(props) {
        super(props);
        this.state = {results:'',
                        loc:-1,
                        sa:-1,
                        p:-1,
                        t:-1,
                        suck:-1,
                        moro:-1,
                        pupil:-1,
                        resp:-1,
                        isPaneOpen:false
                     }
    this.getResults=this.getResults.bind(this)
    }
    Locset(n){
        this.setState({loc:n})
    }
    Saset(n){
        this.setState({sa:n})
    }
    Posset(n){
        this.setState({p:n})
    }
    Tset(n){
        this.setState({t:n})
    }
    SuckSet(n){
        this.setState({suck:n})
    }
    MoroSet(n){
        this.setState({moro:n})
    }
    PupilSet(n){
        this.setState({pupil:n})
    }
    RespSet(n){
        this.setState({resp:n})
    }

    getResults(result){
        this.setState({results:result})
    }
    calculateSarnat()
    {
        this.setState({isPaneOpen:true})
        CallApi({"Level_of_consciousness":this.state.loc,
        "spontaneous_activity":this.state.sa,
        "Posture":this.state.p,
        "tone": this.state.t,
        "suck":this.state.suck,
        "moro":this.state.moro,
        "pupils":this.state.pupil,
        "respiration":this.state.resp
        },this.getResults)
    }
    allow(){
        return this.state.loc<0||
                this.state.moro<0||
                this.state.p<0||
                this.state.pupil<0||
                this.state.resp<0||
                this.state.sa<0||
                this.state.suck<0||
                this.state.t<0
    }
    render() { 
        return (
            <Paper elevation={3} style={{padding:"10px",marginRight:"0.5%",marginLeft:"0.5%"}}>
                {/* <Grid container style={{paddingLeft:"0.5%"}}>  */}
                    <label><h1 style={{bottom:"0",marginTop:"0.2rem",marginBottom:"0.1rem"}}>Therapeutic Hypothermia Screening</h1></label><hr/>
                    <h3 style={{marginBottom:"0.1rem"}}>Sarnat Exam</h3>
                {/* </Grid> */}
                <ol style={{marginTop:0}}>
                    <li style={{marginBottom:"15px",marginTop:"0.2rem"}}>Level of Conciousness</li>
                        <ButtonGroup style={{marginBottom:"15px"}}>
                            <Button onClick={()=>{this.Locset(0)}} style={this.state.loc===0?{backgroundColor:"#14517b",color:"white"}:null}>Normal</Button>
                            <Button onClick={()=>{this.Locset(1)}} style={this.state.loc===1?{backgroundColor:"#14517b",color:"white"}:null}>Hyperlate/Irritable</Button>
                            <Button onClick={()=>{this.Locset(2)}} style={this.state.loc===2?{backgroundColor:"#14517b",color:"white"}:null}>Lethargic/Poorly responsive</Button>
                            <Button onClick={()=>{this.Locset(3)}} style={this.state.loc===3?{backgroundColor:"#14517b",color:"white"}:null}>Minimal/no responsiveness</Button>
                        </ButtonGroup>
                    <li style={{marginBottom:"15px"}}>Spontaneous Activity</li>
                        <ButtonGroup style={{marginBottom:"15px"}}>
                            <Button onClick={()=>{this.Saset(0)}} style={this.state.sa===0?{backgroundColor:"#14517b",color:"white"}:null}>Normal</Button>
                            <Button onClick={()=>{this.Saset(1)}} style={this.state.sa===1?{backgroundColor:"#14517b",color:"white"}:null}>Slightly Decresaed</Button>
                            <Button onClick={()=>{this.Saset(2)}} style={this.state.sa===2?{backgroundColor:"#14517b",color:"white"}:null}>Decreased</Button>
                            <Button onClick={()=>{this.Saset(3)}} style={this.state.sa===3?{backgroundColor:"#14517b",color:"white"}:null}>Absent</Button>
                        </ButtonGroup>
                    <li style={{marginBottom:"15px"}}>Posture</li>
                        <ButtonGroup style={{marginBottom:"15px"}}>
                            <Button onClick={()=>{this.Posset(0)}} style={this.state.p===0?{backgroundColor:"#14517b",color:"white"}:null}>Normal</Button>
                            <Button onClick={()=>{this.Posset(1)}} style={this.state.p===1?{backgroundColor:"#14517b",color:"white"}:null}>Mild distal flexion</Button>
                            <Button onClick={()=>{this.Posset(2)}} style={this.state.p===2?{backgroundColor:"#14517b",color:"white"}:null}>Distal flexion,complete extension</Button>
                            <Button onClick={()=>{this.Posset(3)}} style={this.state.p===3?{backgroundColor:"#14517b",color:"white"}:null}>Decerebrate</Button>
                        </ButtonGroup>
                    <li style={{marginBottom:"15px"}}>Tone</li>
                        <ButtonGroup style={{marginBottom:"15px"}}>
                            <Button onClick={()=>{this.Tset(0)}} style={this.state.t===0?{backgroundColor:"#14517b",color:"white"}:null}>Normal</Button>
                            <Button onClick={()=>{this.Tset(1)}} style={this.state.t===1?{backgroundColor:"#14517b",color:"white"}:null}>Hypertonic</Button>
                            <Button onClick={()=>{this.Tset(2)}} style={this.state.t===2?{backgroundColor:"#14517b",color:"white"}:null}>Hypotonic</Button>
                            <Button onClick={()=>{this.Tset(3)}} style={this.state.t===3?{backgroundColor:"#14517b",color:"white"}:null}>Flaccid</Button>
                        </ButtonGroup>
                    <li style={{marginBottom:"5px"}}>Primitive Reflexes</li>
                       Suck<br/>
                        <ButtonGroup style={{marginBottom:"15px"}}>
                            <Button onClick={()=>{this.SuckSet(0)}} style={this.state.suck===0?{backgroundColor:"#14517b",color:"white"}:null}>Normal</Button>
                            <Button onClick={()=>{this.SuckSet(1)}} style={this.state.suck===1?{backgroundColor:"#14517b",color:"white"}:null}>N/A</Button>
                            <Button onClick={()=>{this.SuckSet(2)}} style={this.state.suck===2?{backgroundColor:"#14517b",color:"white"}:null}>Weak or Bite</Button>
                            <Button onClick={()=>{this.SuckSet(3)}} style={this.state.suck===3?{backgroundColor:"#14517b",color:"white"}:null}>Absent</Button>
                        </ButtonGroup>
                        <br/>Moro<br/>
                        <ButtonGroup style={{marginBottom:"15px"}}>
                            <Button onClick={()=>{this.MoroSet(0)}} style={this.state.moro===0?{backgroundColor:"#14517b",color:"white"}:null}>Normal</Button>
                            <Button onClick={()=>{this.MoroSet(1)}} style={this.state.moro===1?{backgroundColor:"#14517b",color:"white"}:null}>Low Threshold to elicit</Button>
                            <Button onClick={()=>{this.MoroSet(2)}} style={this.state.moro===2?{backgroundColor:"#14517b",color:"white"}:null}>Weak or incomplete</Button>
                            <Button onClick={()=>{this.MoroSet(3)}} style={this.state.moro===3?{backgroundColor:"#14517b",color:"white"}:null}>Absent</Button>
                        </ButtonGroup>
                    <li style={{marginBottom:"5px"}}>Automatic</li>
                        Pupils<br/>
                        <ButtonGroup style={{marginBottom:"15px"}}>
                            <Button onClick={()=>{this.PupilSet(0)}} style={this.state.pupil===0?{backgroundColor:"#14517b",color:"white"}:null}>Normal</Button>
                            <Button onClick={()=>{this.PupilSet(1)}} style={this.state.pupil===1?{backgroundColor:"#14517b",color:"white"}:null}>N/A</Button>
                            <Button onClick={()=>{this.PupilSet(2)}} style={this.state.pupil===2?{backgroundColor:"#14517b",color:"white"}:null}>Constricted</Button>
                            <Button onClick={()=>{this.PupilSet(3)}} style={this.state.pupil===3?{backgroundColor:"#14517b",color:"white"}:null}>Fixed and dilated or Asymmetric</Button>
                        </ButtonGroup>
                        <br/>Respiration<br/>
                        <ButtonGroup style={{marginBottom:"15px"}}>
                            <Button onClick={()=>{this.RespSet(0)}} style={this.state.resp===0?{backgroundColor:"#14517b",color:"white"}:null}>Normal</Button>
                            <Button onClick={()=>{this.RespSet(1)}} style={this.state.resp===1?{backgroundColor:"#14517b",color:"white"}:null}>N/A</Button>
                            <Button onClick={()=>{this.RespSet(2)}} style={this.state.resp===2?{backgroundColor:"#14517b",color:"white"}:null}>periodic breathing</Button>
                            <Button onClick={()=>{this.RespSet(3)}} style={this.state.resp===3?{backgroundColor:"#14517b",color:"white"}:null}>Intubated and ventilated</Button>
                        </ButtonGroup>
                </ol>
                <ul></ul>

                <SlidingPane
                width="50%"
                isOpen={ this.state.isPaneOpen }
                title='Sarnat Exam Results'
                onRequestClose={ () => {
                    // triggered on "<" on left top click or on outside click
                    this.setState({ isPaneOpen: false });
                } }>
                <div>
                    <h2>Sarnat Exam Results</h2>
                    <Grid><Paper style={{margin:"12px",width:"100%", marginTop:"5%"}} variant="outlined">
                        <Grid container style={{alignItems:"center",justifyContent:"center"}}><ErrorOutlinedIcon/>&nbsp;<h3>{this.state.results}</h3></Grid>
                        </Paper>
                    </Grid>
                    <span style={{captionSide:"top"}}><font size="5">Sarnat Exam Decision Table</font></span>
                    <MDBTable>
                        <MDBTableHead>
                        <tr>
                            <th>Category</th>
                            <th>Normal</th>
                            <th>Mild Abnormality</th>
                            <th>Moderate Abnormality</th>
                            <th>Severe Abnormality</th>
                        </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                        <tr>
                            <td>Level of Consciousness</td>
                            <td>Normal</td>
                            <td>Hyperalert or Irritable</td>
                            <td>Lethargic or poorly responsive</td>
                            <td>Minimum or no responsiveness</td>
                        </tr>
                        <tr>
                            <td>Spontaneous Activity</td>
                            <td>Normal</td>
                            <td>Slightly Decreased</td>
                            <td>Decreased</td>
                            <td>Absent</td>
                        </tr>
                        <tr>
                            <td>Posture</td>
                            <td>Normal</td>
                            <td>Mild distal flexion</td>
                            <td>Distal flexion, complete extension</td>
                            <td>Decerebrate</td>
                        </tr>
                        <tr>
                            <td>Tone</td>
                            <td>Normal</td>
                            <td>Hypertonic</td>
                            <td>Hypotonic</td>
                            <td>Flacid</td>
                        </tr>
                        <tr>
                            <td>Primitive Reflexes (Suck)</td>
                            <td>Normal</td>
                            <td>N/A</td>
                            <td>Weak or bite</td>
                            <td>Absent</td>
                        </tr>
                        <tr>
                            <td>Primitive Reflexes (Moro)</td>
                            <td>Normal</td>
                            <td>Low threshold to elicit</td>
                            <td>Weak or incomplete</td>
                            <td>Absent</td>
                        </tr>
                        <tr>
                            <td>Autonomic (Pupils)</td>
                            <td>Normal</td>
                            <td>N/A</td>
                            <td>Constricted</td>
                            <td>Fixed and dilated, or asymmetric</td>
                        </tr>
                        <tr>
                            <td>Autonomic (Respiration)</td>
                            <td>Normal</td>
                            <td>N/A</td>
                            <td>Periodic breathing</td>
                            <td>Intubated and ventilated</td>
                        </tr>
                        </MDBTableBody>
                    </MDBTable>
                    <br/>
                    <span style={{fontWeight:"bold", fontStyle:"italic"}}>
                        * An exam with {String.fromCharCode(8805)}3 categories of moderate or severe abnormality meets moderate (#M{String.fromCharCode(62)}S) or severe encephalopathy (#S{String.fromCharCode(62)}M) criteria. Seizures are also consistent with moderate-severe encephalopathy
                    </span>
                    <br/><br/>
                    {/*<br/> */}
                    <Button variant="contained" color="primary" onClick={()=>{this.setState({isPaneOpen:false})}} disabled={this.allow()}>{String.fromCharCode(60)} BACK</Button>
                </div>
                </SlidingPane>
                <Button style={{marginLeft:"3%",marginTop:"0.13rem",marginBottom:"0.13rem"}}variant="contained" color="primary" onClick={()=>{this.calculateSarnat()}} disabled={this.allow()}>CALCULATE</Button>
            <Button style={{marginLeft:"30%",marginTop:"0.13rem",marginBottom:"0.13rem", color:"azure"}}variant="contained" color="primary" href = "/Hypothermia/HypothermiaCalc"> {String.fromCharCode(60)} BACK</Button>
            </Paper>
          );
    }
}
 

export default SarnatForm;