import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Row, Col } from 'react-flexbox-grid';
import CallApiSepsis from './CallAPISepsis';
import CircularProgess from '@material-ui/core/CircularProgress'

class SepsisCalc extends Component{
    constructor(props) {
        super(props);
        this.state = {results:{},
                        counter:0,
                        abx:'',
                        LPIndication:'',
                        LPResult:'',
                        Meningitis:'',
                        Bacteremia:'',
                        results_abx:{},
                        results_indicator:{},
                        results_puncture:{},
                        reccomendations:{}
                    }
                    this.getResultsABX=this.getResultsABX.bind(this)
                    this.getResultsIndication=this.getResultsIndication.bind(this)
                    this.getResultsPuncture=this.getResultsPuncture.bind(this)
                    this.getRecommendations=this.getRecommendations.bind(this)  
                                            
    }

    setabx(event){
        this.setState({
            abx:event.target.value
        });
        CallApiSepsis({"index":'1',
            "ABx":event.target.value,
            "LP_indicate":'',
            "LP_positiveNegative":'',
            "Meningitis": '',
            "Bacteremia": ''
             },this.getResultsABX)
    };
    getResultsABX(result){
        this.setState({results_abx:result})
    }
    setLPIndication(event){
        this.setState({LPIndication:event.target.value})
        if(event.target.value==='1'){
            this.setState({
                LPResult:'',
                Meningitis:'',
                Bacteremia:'',
                results_puncture:''
            })
            CallApiSepsis({"index":'2',
            "ABx":'',
            "LP_indicate":event.target.value,
            "LP_positiveNegative":'',
            "Meningitis": '',
            "Bacteremia": ''
             },this.getResultsIndication)
      }
    };
    getResultsIndication(result){
        this.setState({results_indicator:result})
    }
    setLPResult(event){
        this.setState({LPResult:event.target.value,
                    reccomendations:'',
                    Meningitis:'',
                    Bacteremia:''})
        CallApiSepsis({"index":'2',
            "ABx":'',
            "LP_indicate":this.state.LPIndication,
            "LP_positiveNegative":event.target.value,
            "Meningitis": '',
            "Bacteremia": ''
             },this.getResultsPuncture)
    };
    getResultsPuncture(result){
        this.setState({results_puncture:result})
    }
    setMeningitis(event){
        this.setState({Meningitis:event.target.value})
        CallApiSepsis({"index":'3',
            "ABx":'',
            "LP_indicate": this.state.LPIndication,
            "LP_positiveNegative": this.state.LPResult,
            "Meningitis": event.target.value,
            "Bacteremia": ''
             },this.getRecommendations)
    };
    getRecommendations(result){
        this.setState({reccomendations:result})
    }
    setBacteremia(event){
        this.setState({Bacteremia:event.target.value})
        CallApiSepsis({"index":'3',
            "ABx":'',
            "LP_indicate": this.state.LPIndication,
            "LP_positiveNegative": this.state.LPResult,
            "Meningitis": '',
            "Bacteremia": event.target.value
             },this.getRecommendations)
    };

    onCounterIncrement() {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    onCounterDecrement() {
        this.setState({
            counter: this.state.counter - 1
        })
    }

    render() {

            return (  
                <Paper elevation={3} style={{padding:"10px",marginRight:"0.5%",marginLeft:"0.5%"}}> 
                <label><h1>Late Onset Sepsis</h1></label>
                <hr/>
    
                {this.state.counter===0?<Col style={{marginLeft:"2%"}}>
                    <Grid container direction="row" style={{paddingLeft:"0.5%"}}> 
                        <h2>Labs</h2>
                    </Grid>
                    <br/>
                    
                    <Grid style={{marginLeft:"2%"}}>
                        Time 0 – CBC w/diff, CRP, UA, Blood and Urine Culture (cath)
                        <br/>
                        Time 24h – CBC w/diff, CRP <br/><br/>
                        <b>BLOOD CULTURES</b> - 1 ml per culture (obtained separately - can do 0.5ml/culture in ELBW infants) <br/><br/>
                        AEROBIC cultures only<br/>
                        <ol>- Peripheral site x 1 (or x 2 if no central lines)</ol>
                        <ol>- EACH central lumen IF lines in place</ol>
                        <ol>- EX. DL PICC (2 lumen cultures and peripheral)</ol>
                        <br/>
                        Trach Cx ONLY IF: increase FiO2, impaired ventilation plus ALL 3 of the following:
                        <ol>- Temp instability</ol>
                        <ol>- Leukocytosis, leukopenia</ol>
                        <ol>- New onset purulent sputum</ol>
                    </Grid>
                    <Button style={{marginLeft:"50%"}} variant="contained" color="primary" onClick={()=>{this.onCounterIncrement()}}>Next {String.fromCharCode(62)}</Button>
                    </Col>:null}

                    {this.state.counter===1?<Col style={{marginLeft:"2%"}}>
                    <Grid container direction="row" style={{paddingLeft:"0.5%"}}> 
                        <h2>ABX</h2>
                    </Grid>
                    <br/>
                    <Row>
                        <Col xs = {3}>
                            <div style={{paddingLeft:"2%"}}  value={this.state.abx} onChange={(event)=>this.setabx(event)}>
                                <FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Infants from home w/ no ICU hx:</FormLabel>
                                <RadioGroup aria-label="abx" name="abx" defaultValue={this.state.abx}>
                                    <FormControlLabel value='0' control={<Radio color="primary"/>} label="< 28 Days" />
                                    <FormControlLabel value='1' control={<Radio color="primary"/>} label="> 28 Days"/>
                                </RadioGroup>
                            </div>
                        </Col>
                        {(this.state.abx!=='')?
                        <Col xs = {6}>
                            {!this.state.results_abx.Recommendation?<CircularProgess style={{marginTop:"5%"}}/>:
                            <div style={{marginTop:"5%", padding:"2%", border: "solid black 2px"}}>
                                <h6>{this.state.results_abx.Recommendation}</h6>
                            </div>}
                        </Col>:null}
                    </Row>
                    <br/>
                    <Button variant="contained" color="primary" onClick={()=>{this.onCounterDecrement()}}y>{String.fromCharCode(60)} Previous</Button> 
                    <Button style={{marginLeft:"30%"}} variant="contained" color="primary" onClick={()=>{this.onCounterIncrement()}}>Next {String.fromCharCode(62)}</Button>

                    </Col>:null}

                    {this.state.counter===2?<Col style={{marginLeft:"2%"}}>
                    <Grid style={{paddingLeft:"0.5%"}}> 
                        <h2>Lumbar Puncture</h2>
                        <label>Criteria: If possible obtain PRIOR to antibiotics And clinically stable<br/>
                        - Positive culture<br/>
                        - Clinical course and laboratory data strongly suggestive of bacterial sepsis<br/>
                        - Infants who worsen with abx therapy<br/>
                        - Seizures or other CNS symptoms</label>
                        <Row style={{paddingTop:"2%",marginRight:"1%",border:"solid black 1px"}}>
                            <Col xs = {3}>
                                <div style={{paddingLeft:"2%", marginBottom:"3%"}}  value={this.state.LPIndication} onChange={(event)=>this.setLPIndication(event)}>
                                <FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Lumbar Puncture Indicated?</FormLabel>
                                    <RadioGroup aria-label="LPIndication" name="LPIndication" defaultValue={this.state.LPIndication}>
                                        <FormControlLabel value='0' control={<Radio color="primary"/>} label="Yes" />
                                        <FormControlLabel value='1' control={<Radio color="primary"/>} label="No"/>
                                    </RadioGroup>
                                </div>
                            </Col>
                            {(this.state.LPIndication==='1' && this.state.results_indicator.Recommendation!=='')?
                            <Col xs = {7}>
                                {!this.state.results_indicator.Recommendation?<CircularProgess/>:
                                <div style={{marginTop:"7%", padding:"2%", border: "solid black 2px"}}>
                                    <h6>{this.state.results_indicator.Recommendation}</h6>
                                </div>}
                            </Col>:null}
                        </Row>
                        
                        <br/>
                        
                        <Row style={this.state.LPIndication==='1'|| this.state.LPIndication===''?{paddingTop:"2%", backgroundColor:"#e5e5e5",marginRight:"1%",border:"solid black 1px"}:{paddingTop:"2%",marginRight:"1%",border:"solid black 1px"}}>
                            <Col xs = {3}>
                                <div style={{paddingLeft:"2%", marginBottom:"3%"}}  onChange={(event)=>this.setLPResult(event)}>
                                <FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Lumbar Puncture Result</FormLabel>
                                    <RadioGroup aria-label="LPResult" name="LPResult" value={this.state.LPResult}>
                                        <FormControlLabel value='0' control={<Radio color="primary"/>} label="Positive" disabled={this.state.LPIndication==='1'||this.state.LPIndication===''}/>
                                        <FormControlLabel value='1' control={<Radio color="primary"/>} label="Negative" disabled={this.state.LPIndication==='1'||this.state.LPIndication===''}/>
                                    </RadioGroup>
                                </div>
                            </Col>
                            {this.state.LPResult!==''?
                            <Col xs = {7}>
                                {!this.state.results_puncture.Recommendation?<CircularProgess style={{marginTop:"2em"}}/>:
                                <div style={{marginTop:"4%", padding:"2%", border: "solid black 2px"}}>
                                    {this.state.results_puncture.Recommendation}
                                </div>}
                            </Col>:null}
                        </Row>

                        <br/>
                        <Row style={this.state.LPResult==='1' || this.state.LPResult===''?{padding:"2%",marginRight:"1%",border:"solid black 1px",backgroundColor:"#e5e5e5"}:
                            {padding:"2%",marginRight:"1%",border:"solid black 1px"}
                        }>
                            <Col xs = {3}>
                                <div style={{paddingLeft:"2%"}} onChange={(event)=>this.setMeningitis(event)}>
                                <FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Meningitis</FormLabel>
                                    <RadioGroup aria-label="Meningitis" name="Meningitis" value={this.state.Meningitis}>
                                        <FormControlLabel value='0' control={<Radio color="primary"/>} label="G+ Meningitis" disabled={this.state.LPResult==='1'||this.state.LPResult===''}/>
                                        <FormControlLabel value='1' control={<Radio color="primary"/>} label="G- Meningitis" disabled={this.state.LPResult==='1'||this.state.LPResult===''}/>
                                    </RadioGroup>
                                </div>
                                <br/>
                            </Col>
                            {this.state.Meningitis!==''?
                            <Col xs = {7}>
                                {!this.state.reccomendations.Recommendation?<CircularProgess style={{marginTop:"2em"}}/>:
                                <div style={{marginTop:"5%", padding:"2%", border: "solid black 2px"}}>
                                    {this.state.reccomendations.Recommendation}
                                </div>}
                            </Col>:null}
                        </Row>

                        
                        <Row style={this.state.LPResult==='0' || this.state.LPResult===''?{padding:"2%",marginRight:"1%",border:"solid black 1px",backgroundColor:"#e5e5e5"}:
                            {padding:"2%",marginRight:"1%",border:"solid black 1px"}
                        }>
                            <Col xs = {3}>
                                <div style={{paddingLeft:"2%"}} onChange={(event)=>this.setBacteremia(event)}>
                                <FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Bacteremia</FormLabel>
                                    <RadioGroup aria-label="Bacteremia" name="Bacteremia"  value={this.state.Bacteremia}>
                                        <FormControlLabel value='0' control={<Radio color="primary"/>} label="UTI" disabled={this.state.LPResult==='0'||this.state.LPResult===''}/>
                                        <FormControlLabel value='1' control={<Radio color="primary"/>} label="G+ Bacteremia" disabled={this.state.LPResult==='0'||this.state.LPResult===''}/>
                                        <FormControlLabel value='2' control={<Radio color="primary"/>} label="G- Bacteremia" disabled={this.state.LPResult==='0'||this.state.LPResult===''}/>
                                        <FormControlLabel value='3' control={<Radio color="primary"/>} label="S. Aureus Bacteremia" disabled={this.state.LPResult==='0'||this.state.LPResult===''}/>
                                    </RadioGroup>
                                </div>
                                <br/>
                            </Col>
                            {this.state.Bacteremia!==''?
                            <Col xs = {7}>
                                {!this.state.reccomendations.Recommendation?<CircularProgess style={{marginTop:"2em"}}/>:
                                <div style={{marginTop:"5%", padding:"2%", border: "solid black 2px"}}>
                                    {this.state.reccomendations.Recommendation}
                                </div>}
                            </Col>:null}
                        </Row>
                    </Grid>
                    <br/>
                    <Button variant="contained" color="primary" onClick={()=>{this.onCounterDecrement()}}y>{String.fromCharCode(60)} Previous</Button>
                    </Col>:null}
                </Paper>

            )
        }
}
export default SepsisCalc;