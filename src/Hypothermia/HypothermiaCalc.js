import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import CallApiBaseline from './CallAPIBaseline'
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress'

class HypothermiaCalc extends Component{
    constructor(props) {
        super(props);
        this.state = {results:{},
                        location:'1',
                        age:'',
                        weight:'',
                        hours:'',
                        isCB1:false,
                        isCB2:false,
                        isCB3:false,
                        isCB4:false,
                        isCB5:false,
                        RB:'1',
                        counter:0
                    }
        this.getResults=this.getResults.bind(this)             
    }
    locset(event){
        // this.state.location=event.target.value;
        this.setState({location:event.target.value})
    };
    setage(event) {
        this.setState({
          age: event.target.value
        })
    }
    setweight(event) {
        this.setState({
          weight: event.target.value
        })
    }
    sethours(event) {
        this.setState({
          hours: event.target.value
        })
    }

    setRB(event){
        // this.state.RB=event.target.value;
        this.setState({RB:event.target.value})
    };

    onChangeCB1 = () => {
        this.setState(initialState => ({
          isCB1: !initialState.isCB1,
        }));
    }

    onChangeCB3 = () => {
        this.setState(initialState => ({
          isCB3: !initialState.isCB3
        }));
    }
    
    onChangeCB4 = () => {
        this.setState(initialState => ({
          isCB4: !initialState.isCB4
        }));
    }
    
    onChangeCB5 = () => {
        this.setState(initialState => ({
          isCB5: !initialState.isCB5
        }));
    }
    getResults(result){
        this.setState({results:result})
    }
    async getRecommendation()
    {
            CallApiBaseline({"location":this.state.location,
            "age":this.state.age,
            "weight":this.state.weight,
            "hours":this.state.hours,
            "cord_blood_gas":this.state.isCB1,
            "cord_blood_gas_high":this.state.isCB2,
            "apgar":this.state.isCB3,
            "assisted_ventilation":this.state.isCB4,
            "acute_perinatal_event_history":this.state.isCB5
            },this.getResults)
    }
    allowBaseChars(){
        return this.state.age===''||
            this.state.weight===''||
            this.state.hours===''||
            parseFloat(this.state.weight)<=parseFloat('1799.999999') ||
            parseFloat(this.state.age)<=parseFloat('34.999999') ||
            parseFloat(this.state.hours)>=parseFloat('6.000001')            
                
    }
    allowAcute(){
        return this.state.isCB1===false&&
               this.state.isCB2===false&&
               this.state.isCB3===false&&
               this.state.isCB4===false&&
               this.state.isCB5===false
    }
    onNextBaseChars(){     
        this.setState({
            counter:1
        }) 
    }
    onNextAcute(){
        this.render()
        this.setState({
            counter:2
        })
        this.getRecommendation();  
    }
    onPrevAcute(){
        this.setState({
            counter:0
        })    
    }
    onPrevResults(){
        this.setState({
            counter:1,
            results:{}
        }) 
    }
    render() {
        let recommendations=''
        if(this.state.results.Recommendation)
        {
            let out1 = this.state.results.Recommendation.split("\n");
            recommendations = out1.map(item=>item);
            for(var v = 0; v <recommendations.length;v++){
                if(recommendations[v] === "Perform serial target neurologic exam"){
                    recommendations[v] = <div>&#10003;&nbsp;<a href= "/Hypothermia/SarnatForm">{recommendations[v]}</a></div>
                }
                else{
                    recommendations[v] = <div>&#10003;&nbsp;{recommendations[v]}</div>
                }
            }
        }

        return (  
            <Paper elevation={3} style={{padding:"10px",marginRight:"0.5%",marginLeft:"0.5%"}}> 
            <label><h1>Therapeutic Hypothermia Screening</h1></label>
            <hr/>

            {this.state.counter===0?<Grid>
                <Grid container direction="row" style={{paddingLeft:"0.5%"}}> 
                    <h2>Baseline Characterstics</h2>
                </Grid>
                <br/>
                <div style={{paddingLeft:"2%"}}  value={this.state.location} onChange={(event)=>this.locset(event)}> 
                <FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Location</FormLabel>
                    <RadioGroup aria-label="location" name="location" defaultValue={this.state.location}>
                        <FormControlLabel value='0' control={<Radio color="primary"/>} label="Birth-Centre" />
                        <FormControlLabel value='1' control={<Radio color="primary"/>} label="CHLA"/>
                    </RadioGroup>
                </div>
                <br/><br/>
                <Grid container direction="column" style={{paddingLeft:"2%"}}> 
                    <div>
                        <TextField error={(parseFloat(this.state.age) < 35)?true:false}
                        type="number" label="Gestational Age (weeks)" helperText="Please enter week ≥ 35" variant="outlined"  value={this.state.age} onChange={(event)=>this.setage(event)} />
                    </div>
                    <br/>
                    <div>
                        <TextField error={(parseFloat(this.state.weight) < 1800)?true:false}
                        type="number" label="Weight (grams)" helperText="Please enter weight ≥ 1800" variant="outlined"  value={this.state.weight} onChange={(event)=>this.setweight(event)} />

                    </div>
                    <br/>
                    <div>
                        <TextField error={(parseFloat(this.state.hours) < 0 || parseFloat(this.state.hours) > 6)?true:false}
                        type="number" label="Hours of Life (h)" helperText="Please enter hours of life ≤ 6" variant="outlined"  value={this.state.hours} onChange={(event)=>this.sethours(event)} />
                    </div>
                </Grid>
                <br/><br/>
                <Button style={{marginLeft:"50%"}} variant="contained" color="primary" onClick={()=>{this.onNextBaseChars()}} disabled={this.allowBaseChars()}>Next {String.fromCharCode(62)}</Button>
            </Grid>:null}

            {this.state.counter===1?<Grid>
                <Grid container direction="row" style={{paddingLeft:"0.7%",}}> 
                        <h2>Acidemia and Acute Perinatal Event Criteria</h2> 
                    </Grid>
                    <Grid container direction="column" style={{paddingLeft:"2%"}}> 
                    <br/>
                    {this.state.location==='1'?<div value={this.state.RB} onChange={(event)=>this.setRB(event)}> 
                        {this.state.location==='1'?<FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Select any one</FormLabel>:<FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Check any that apply</FormLabel>}
                            <RadioGroup aria-label="RB" name="RB" defaultValue={this.state.RB}>
                                <FormControlLabel value='0' control={<Radio color="primary"/>} label="Cord OR infant blood gas ≤ 1hr of life, (7 ≤ pH ≤ 7.15) OR (-16 ≤ BE ≤ -10) OR No Blood gas available." />
                                <FormControlLabel value='1' control={<Radio color="primary"/>} label="Cord OR infant blood gas ≤ 1hr of life, pH ≤ 7 OR BE ≤ -16"/>
                            </RadioGroup>
                            <br/>
                    </div>:null}                       
                    {this.state.location==='1'?(this.state.RB==='1'?(this.state.isCB1=false, this.state.isCB2=true):(this.state.isCB1=true, this.state.isCB2=false)):(this.state.isCB2=false)}
                    <FormControl component="fieldset">
                        <FormLabel component="legend"><b style={{color:"black"}}>Check any that apply</b></FormLabel>
                        <FormGroup>
                        {this.state.location==='0'?
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={this.state.isCB1} onChange={this.onChangeCB1}/>}
                            label="Cord OR infant blood gas ≤ 1hr of life, (7 ≤ pH ≤ 7.15) OR (-16 ≤ BE ≤ -10) OR No Blood gas available."
                        />:null}
        
                        <FormControlLabel 
                            control={<Checkbox color="primary" checked={this.state.isCB3} onChange={this.onChangeCB3} />}
                            label="Apgar < 5 @ 10 min"
                        />
                        <FormControlLabel 
                            control={<Checkbox color="primary" checked={this.state.isCB4} onChange={this.onChangeCB4} />}
                            label="Assisted Ventilation for > 10 min"
                        />
                        <FormControlLabel 
                            control={<Checkbox color="primary" checked={this.state.isCB5} onChange={this.onChangeCB5} />}
                            label="History of acute perinatal event*"
                        />
                        </FormGroup>
                    </FormControl>
                    </Grid> 
                    <br/><br/><br/><br/><br/>
                    <Grid container direction="row" style={{paddingLeft:"0.5%"}}> 
                        <h5><b>*Acute perinatal event: late/variable decels, cordprolapse, uterine/code rupture, 
                        abruptio placenta, maternal hemorrhage, maternal cardiorespiratory arrest</b></h5>
                    </Grid>
                    <ul></ul>
                    <Button variant="contained" color="primary" onClick={()=>{this.onPrevAcute()}}>{String.fromCharCode(60)} Previous</Button> 
                    <Button style={{marginLeft:"45%"}} variant="contained" color="primary" onClick={()=>{this.onNextAcute()}}>Next {String.fromCharCode(62)}</Button>
            </Grid>:null}

            {this.state.counter===2?<Grid>
                <Grid container direction="column" style={{paddingLeft:"0.5%",}}> 
                    <h2 style={{marginLeft:"3%"}}>Determining Severe or Moderate Encephalopathy or Seizures</h2>
                    <br/>
                    <h2 style={{marginLeft:"3%"}}>Recommendations:</h2>
                    <Paper style={{marginLeft:"3%",width:"40%",outlineColor:"black",outlineWidth:"40px"}}>
                        {!this.state.results.Recommendation?<CircularProgress style={{marginLeft:"40%",marginTop:"5%",marginBottom:"5%"}}/>:<h3 style={{marginLeft:"4%"}}>{recommendations}</h3>}
                    </Paper>
                </Grid>
                <br/><br/>
                <Button variant="contained" color="primary" onClick={()=>{this.onPrevResults()}}>{String.fromCharCode(60)} Previous</Button>
            </Grid>:null}

            </Paper>
        );
    }
 
}
export default HypothermiaCalc;