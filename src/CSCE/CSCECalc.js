import React from 'react';
import Button from '@material-ui/core/Button';
import { Paper, Grid } from '@material-ui/core';
import { Row, Col } from 'react-flexbox-grid';
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import { Tabs, TabList, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CallApiEvent from './CallAPIEvent';
import CallApiDischarge from './CallAPIDischarge';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CircularProgress from '@material-ui/core/CircularProgress'


class CSCECalc extends React.Component {
    constructor(props) {
        super(props);
            this.state = {activeIndex:0,
                    heart_rate: '',
                    breathing_interruption: '',
                    spo2: '',
                    cyanotic: '',
                    date_of_event: new Date(),
                    isAsleep: false,
                    isLying: false,
                    isStimulated: false,
                    isCoughing: false,
                    isFeeding: false,
                    isChoking:false,
                    results:{},
                    date1: new Date(),
                    date2: new Date(),
                    date3: new Date(),
                    date4: new Date(),
                    date5: new Date(),
                    bspo2:'',
                    heart_rate1:'',
                    results1:'',
                    clicked:false
                    }
        this.getResults=this.getResults.bind(this)
        this.getResults1=this.getResults1.bind(this)
    }

    handleActiveIndexUpdate = (activeIndex) => this.setState({activeIndex,clicked:false});

    set_heart_rate(event) {
        this.setState({
          heart_rate: event.target.value
        })
    }
    set_breathing(event) {
        this.setState({
          breathing_interruption: event.target.value
        })
    }
    set_spo2(event) {
        this.setState({
          spo2: event.target.value
        })
    }
    set_cyanotic(event) {
        this.setState({
          cyanotic: event.target.value
        })
    }
    set_date(event) {
        this.setState({
          date_of_event: event,
          flag:1
        })
        let formatted_date = this.state.date_of_event.getDate() + "-" + (this.state.date_of_event.getMonth() + 1) + "-" + this.state.date_of_event.getFullYear()
     
    }
    onChange_asleep = () => {
        this.setState(initialState => ({
          isAsleep: !initialState.isAsleep,
          isChoking:false,
          isCoughing:false,
          isFeeding:false,
          isLying:false,
          isStimulated:false
        }));
    }
    onChange_lying  = () => {
        this.setState(initialState => ({
          isLying: !initialState.isLying,
          isAsleep: false,
          isChoking:false,
          isCoughing:false,
          isFeeding:false,
          isStimulated:false
        }));
    }
    onChange_stimulated = () => {
        this.setState(initialState => ({
          isStimulated: !initialState.isStimulated,
          isAsleep: false,
          isChoking:false,
          isCoughing:false,
          isFeeding:false,
          isLying:false,
        }));
    }
    onChange_coughing = () => {
        this.setState(initialState => ({
          isCoughing: !initialState.isCoughing,
          isAsleep: false,
          isChoking:false,
          
          isFeeding:false,
          isLying:false,
          isStimulated:false
        }));
    }

    onChange_feeding = () => {
        this.setState(initialState => ({
          isFeeding: !initialState.isFeeding,
          isAsleep:false,
          isChoking:false,
          isCoughing:false,
          
          isLying:false,
          isStimulated:false
        }));
    }
    onChange_choking = () => {
        this.setState(initialState => ({
          isChoking: !initialState.isChoking,
          isAsleep: false,
          isCoughing:false,
          isFeeding:false,
          isLying:false,
          isStimulated:false
        }));
    }

    getResults(result){
        this.setState({results:result})
    }

    onCalculateEvent()
    {
        CallApiEvent({ "asleep": this.state.isAsleep,
                "lying_down": this.state.isLying,
                "stimulation": this.state.isStimulated,
                "coughing": this.state.isCoughing,
                "feeding": this.state.isFeeding, 
                "choking": this.state.isChoking,
                "breathing_interrupt": this.state.breathing_interruption,
                "heart_rate": this.state.heart_rate,
                "desaturation": this.state.spo2,
                "cyanotic": this.state.cyanotic,
                "dateOevent": this.state.date_of_event
            },this.getResults)
            this.setState({clicked:true})

    }

    allowEvent(){
        return this.state.heart_rate===''||
                parseFloat(this.state.heart_rate)<0||
                this.state.breathing_interruption===''||
                parseFloat(this.state.breathing_interruption)<0||
                this.state.spo2===''||
                parseFloat(this.state.spo2)<0||
                this.state.cyanotic===''||
                parseFloat(this.state.cyanotic)<0||
                (this.state.isAsleep===false&&
                this.state.isLying===false&&
                this.state.isStimulated===false&&
                this.state.isCoughing===false&&
                this.state.isFeeding===false&&
                this.state.isChoking===false)||
                (this.state.date_of_event===''||
                this.state.date_of_event===null)
    }

    set_date1(event) {
        this.setState({
            date1: event,
            flag: 1
          })
          let formatted_date = this.state.date1.getDate() + "-" + (this.state.date1.getMonth() + 1) + "-" + this.state.date1.getFullYear()
      }
    set_date2(event) {
        this.setState({
          date2: event,
          flag: 1
        })
        let formatted_date = this.state.date2.getDate() + "-" + (this.state.date2.getMonth() + 1) + "-" + this.state.date2.getFullYear()
     }
    set_date3(event) {
        this.setState({
          date3: event,
          flag: 1
        })
        let formatted_date = this.state.date3.getDate() + "-" + (this.state.date3.getMonth() + 1) + "-" + this.state.date3.getFullYear()
     
    }
    set_date4(event) {
        this.setState({
          date4: event,
          flag: 1
        })
        let formatted_date = this.state.date4.getDate() + "-" + (this.state.date4.getMonth() + 1) + "-" + this.state.date4.getFullYear()
     
    }
    set_date5(event) {
        this.setState({
          date5: event,
          flag:1
        })
        let formatted_date = this.state.date5.getDate() + "-" + (this.state.date5.getMonth() + 1) + "-" + this.state.date5.getFullYear()
     
    }
    set_bspo2(event) {
        this.setState({
          bspo2: event.target.value
        })
    }
    set_heart_rate1(event) {
        this.setState({
          heart_rate1: event.target.value
        })
    }

    getResults1(result){
        this.setState({results1:result})
    }

    onCalculateDischarge()
    {
        CallApiDischarge({"last_stimulate": this.state.date1,
            "last_caffeine": this.state.date2,
            "last_apnea": this.state.date3,
            "last_bradycardia": this.state.date4,
            "last_desat": this.state.date5,
            "desaturation": this.state.bspo2,     
            "heart_rate": this.state.heart_rate1
            },this.getResults1);
        this.setState({clicked:true})
    }
    allowDischarge(){
        return parseFloat(this.state.heart_rate1) < 0||
            this.state.heart_rate1===''||
            parseFloat(this.state.bspo2) < 0||
            this.state.bspo2===''||
            (this.state.date1===''||
            this.state.date1===null)||
            (this.state.date2===''||
            this.state.date2===null)||
            (this.state.date3===''||
            this.state.date3===null)||
            (this.state.date4===''||
            this.state.date4===null)||
            (this.state.date5===''||
            this.state.date5===null)
    }
 

    render() {
            let recommendations=''
            if(this.state.results.Recommendation)
            {
                let out1 = this.state.results.Recommendation.split("\n");
                recommendations = out1.map(item=><div style={{border:"solid black 2px", height:"25%", fontSize:"150%", width:"auto", paddingTop:"3%", paddingLeft:"7%", paddingBottom:"3%", marginBottom:"4%",boxSizing:"border-box"}}><i class="material-icons">&#xe000;</i>&nbsp;&nbsp;{item}</div>);
                if(this.state.results.Recommendation === "The Events are not significant\nNormal")
                {
                    recommendations = out1.map(item=><div style={{border:"solid black 2px", height:"25%", fontSize:"150%", width:"auto", paddingTop:"3%", paddingLeft:"7%", paddingBottom:"3%", marginBottom:"4%"}}><i class="material-icons">&#xe86c;</i>&nbsp;&nbsp;{item}</div>);
                }
            }
            Moment.locale('en');
            momentLocalizer();
        return (
            <Paper elevation={3} style={{padding:"10px",marginRight:"0.5%",marginLeft:"0.5%"}}>
            <label><h1>Clinically Significant Cardiopulmonary Events (CSCE)</h1></label>
            <hr/>
            <div> 
                <Tabs onSelect={this.handleActiveIndexUpdate}>
                    <TabList>
                        <Tab style={this.state.activeIndex===1?{backgroundColor:"#e0e0e0"}:null}>Event Classification</Tab>
                        <Tab style={this.state.activeIndex===0?{backgroundColor:"#e0e0e0"}:null}>Discharge Planning</Tab>
                    </TabList>
                </Tabs>           
            </div>
            {this.state.activeIndex===0?<Grid>
            <Row>
            <Col xs={7}>
            <br/>
            <Grid container direction="row" style={{paddingLeft:"0.5%"}}>
                <Grid container direction="row" style={{paddingLeft:"2.5%"}}> 
                <div style={{marginRight:"1%",marginBottom:"1%"}}>
                    <TextField error={(parseFloat(this.state.heart_rate) < 0)?true:false}
                    type="number" label="Heart Rate (bpm)" variant="outlined"  value={this.state.heart_rate} onChange={(event)=>this.set_heart_rate(event)} />
                </div>
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                <div style={{marginRight:"1%",marginBottom:"1%"}}>
                    <TextField error={(parseFloat(this.state.breathing_interruption) < 0)?true:false}
                    type="number" label="Breathing Interruption (sec)" variant="outlined"  value={this.state.breathing_interruption} onChange={(event)=>this.set_breathing(event)} />
                </div>
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         */}
                <div>
                    <TextField error={(parseFloat(this.state.spo2) < 0)?true:false}
                    type="number" label="SpO2 %" variant="outlined"  value={this.state.spo2} onChange={(event)=>this.set_spo2(event)} />
                </div></Grid>
                
                <Grid container direction="row" style={{paddingLeft:"2%"}}>
                <Col xs={6}>
                <br/><br/><br/>
                    <div>
                        <TextField error={(parseFloat(this.state.cyanotic) < 0)?true:false} 
                        type="number" label="Cyanotic Episode (sec)" variant="outlined"  value={this.state.cyanotic} onChange={(event)=>this.set_cyanotic(event)} />
                    </div>
                    <br/><br/><br/>
                    <div>
                            <DateTimePicker
                        style = {{marginBottom:"4%"}}
                        value={this.state.date_of_event}
                        onChange={value => this.set_date(value)} 
                        time={false}
                        format="MMM DD, YYYY"
                        defaultValue= {new Date()}
                        max={new Date()}
                        />
                    </div>
                </Col>
                <Col xs={4}>
                <br/><br/><br/>
                    <div style={{paddingLeft:"5%", paddingTop:"2%"}}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" style={{width:"100%",color:"black",fontWeight:"bold"}}>During Event, Infant Was...</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={this.state.isAsleep} onChange={this.onChange_asleep} />}
                                label="Asleep"/>       
                            <FormControlLabel 
                                control={<Checkbox color="primary" checked={this.state.isLying} onChange={this.onChange_lying} />}
                                label="Lying Down"
                            />
                            <FormControlLabel 
                                control={<Checkbox color="primary" checked={this.state.isStimulated} onChange={this.onChange_stimulated} />}
                                label="Stimulated"
                            />
                            <FormControlLabel 
                                control={<Checkbox color="primary" checked={this.state.isCoughing} onChange={this.onChange_coughing}/>}
                                label="Coughing"
                            />
                            <FormControlLabel 
                                control={<Checkbox color="primary" checked={this.state.isFeeding} onChange={this.onChange_feeding}/>}
                                label="Feeding"
                            />
                            <FormControlLabel 
                                control={<Checkbox color="primary" checked={this.state.isChoking} onChange={this.onChange_choking}/>}
                                label="Choking"
                            />
                            
                        </FormGroup>
                    </FormControl>
                    </div>
                </Col>
                </Grid>
            </Grid>
            </Col>
            {this.state.clicked && !this.state.results.Recommendation?
            <div style={{marginTop:"10%"}}>
            <CircularProgress/>
            </div>
            :null}
            {this.state.results.Recommendation?<Col xs={4}>
                
                <Grid style={{marginTop:"5%" ,borderLeft:"1px solid black"}}>
                    <br/> 
                    {/* <Paper style={{margin:"2px",width:"100%", marginLeft:"5%", marginTop:"5%"}}> */}
                        <div style={{alignItems:"center",justifyContent:"left", marginLeft:"5%"}}>
                            <Grid style={{marginLeft:"5%"}}>{recommendations}</Grid>
                        </div>
                    {/* </Paper> */}
                    <br/><br/>     
                </Grid>
            </Col>:null}            
            </Row>
            <Button style={{marginLeft:"2%"}} variant="contained" color="primary" onClick={()=>{this.onCalculateEvent()}} disabled={this.allowEvent()}>Calculate</Button>
            </Grid>:null}

            {this.state.activeIndex===1?<Grid>
            <Row style={{marginLeft:"2%"}}>
            <Col xs={5}>
            <br/>
            <Row>
                <Col xs = {5}>
                <FormLabel style={{color:"black",fontWeight:"bold"}}><br/>Last CSCE Requiring Stimulation</FormLabel>
                </Col>
                <Col xs = {7}>
                <DateTimePicker
                  style = {{marginBottom:"4%"}}
                  value={this.state.date1}
                  onChange={value => this.set_date1(value)} 
                  time={false}
                  format="MMM DD, YYYY"
                  defaultValue= {new Date()}
                  max={new Date()}
                />
                </Col>
            </Row>
            <br/>
            <Row> 
                <Col xs = {5}>   
                <FormLabel style={{color:"black",fontWeight:"bold"}}><br/>Caffeine Discontinued</FormLabel>
                </Col>
                <Col xs = {7}>
                <DateTimePicker
                  style = {{marginBottom:"4%"}}
                  value={this.state.date2}
                  onChange={value => this.set_date2(value)} 
                  time={false}
                  format="MMM DD, YYYY"
                  defaultValue= {new Date()}
                  max={new Date()}
                />
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs = {5}>    
                <FormLabel style={{marginBottom:"4%",color:"black",fontWeight:"bold"}}><br/>Last Self-Resolving Apnea</FormLabel>
                </Col>
                <Col xs = {7}>
                <DateTimePicker
                  style = {{marginBottom:"4%"}}
                  value={this.state.date3}
                  onChange={value => this.set_date3(value)} 
                  time={false}
                  format="MMM DD, YYYY"
                  defaultValue= {new Date()}
                  max={new Date()}
                />
                </Col>
            </Row>
            <br/>
            <Row>        
                <Col xs = {5}>
                <FormLabel style={{color:"black",fontWeight:"bold"}}><br/>Last Self-Resolving Bradycardia</FormLabel>
                </Col>
                <Col xs = {7}>
                <DateTimePicker
                  style = {{marginBottom:"4%"}}
                  value={this.state.date4}
                  onChange={value => this.set_date4(value)} 
                  time={false}
                  format="MMM DD, YYYY"
                  defaultValue= {new Date()}
                  max={new Date()}
                />
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs = {5}>    
                <FormLabel style={{color:"black",fontWeight:"bold"}}><br/>Last Self-Resolving Desaturation</FormLabel>
                </Col>
                <Col xs = {7}>
                <DateTimePicker
                  style = {{marginBottom:"4%"}}
                  value={this.state.date5}
                  onChange={value => this.set_date5(value)} 
                  time={false}
                  format="MMM DD, YYYY"
                  defaultValue= {new Date()}
                  max={new Date()}
                />
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs = {5}>    
                <FormLabel style={{color:"black",fontWeight:"bold"}}><br/>Baseline SpO2</FormLabel>
                </Col>
                <Col xs = {7}>
                <TextField error={(parseFloat(this.state.bspo2) < 0)?true:false}
                type="number" label="Baseline SpO2 in %" variant="outlined"  value={this.state.bspo2} onChange={(event)=>this.set_bspo2(event)} />
                </Col>
            </Row> 
            <br/>               
            <Row>
                <Col xs = {5}>
                <FormLabel style={{marginBottom:"7%",color:"black",fontWeight:"bold"}}><br/>Heart Rate</FormLabel>
                </Col>
                <Col xs = {7}>
                <TextField error={(parseFloat(this.state.heart_rate1) < 0)?true:false}
                type="number" label="Heart Rate in bpm" variant="outlined"  value={this.state.heart_rate1} onChange={(event)=>this.set_heart_rate1(event)} />
                </Col>
            </Row>
            </Col>
                {this.state.clicked && !this.state.results1?
                <div style={{marginLeft:'15%',marginTop:"10%"}}>
                <CircularProgress/>
                </div>
                :null}
                {this.state.results1!==''?<Col xs={6}>
                <Grid>   
                            <Paper elevation={5} style={{marginLeft:"20%",marginTop:"20px",width:"80%"}} variant="outlined">
                                    {this.state.results1.startsWith("OK")?<Grid container style={{alignItems:"center",justifyContent:"center"}}><CheckCircleOutlineIcon/><h2>&nbsp;&nbsp;{this.state.results1}</h2></Grid>:<Grid container style={{alignItems:"center",justifyContent:"center"}}><ErrorOutlineIcon/><h2>&nbsp;&nbsp;{this.state.results1}</h2></Grid>}
                            </Paper>
                            <Grid style={{marginLeft:"20%"}}>
                                <h3><br/>Other Considerations:<br/></h3>
                                <span>&#10146; Events related to ROP, immunization etc. are not counted towards CSCE-free days.<br/>
                                &#10146; Feeding-associated events or chocking episodes requiring stimulation are different issue.<br/>
                                &#10146; Self-resolved and feeding associated events not requiring stimulation are physiologic and not considered CSCE.<br/>
                                &#10146;Pulse oximeter monitoring until discharge.</span>
                                <br/><br/>
                                <h3>Document:<br/></h3>
                                <span>&#10146;HR of 80-100, even if not bradycardia on its own.<br/>
                                &#10146;Self-resolved apneic events &gt; 20 sec.<br/>
                                &#10146;Apneic events associated with HR &#60; 80 and/or SpO2 &#60; 90%.<br/>
                                &#10146;Apnea, bradycardia or desaturations requiring stimulation.<br/>
                                <br/>
                                No need to document:<br/>
                                &#10146;&nbsp;&#60; 4 seconds of O2 desaturation without color change.<br/>
                                <br/>
                                May need to document:<br/>
                                &#10146;&nbsp;O2 desaturations 90-94%, if &gt; 2 episodes per shift.</span>
                            </Grid>    
                </Grid>
                </Col>:null}

            </Row>
            <br/>
            <Button variant="contained" color="primary" onClick={()=>{this.onCalculateDischarge()}} disabled={this.allowDischarge()}>Calculate</Button>
            </Grid>:null}
            
            </Paper>
        );
    }
}
export default CSCECalc;
            
