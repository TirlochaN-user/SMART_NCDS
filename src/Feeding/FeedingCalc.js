import React from 'react';
import Button from '@material-ui/core/Button';
import HTMLReactParser from 'html-react-parser';
import CallApiFeeding from './CallAPIFeeding';
import CallApiParenteral from './CallAPIParenteral';
// import './table.css'
import { Paper, Grid } from '@material-ui/core';
import { Row, Col } from 'react-flexbox-grid';
import { Tabs, TabList, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress'

class FeedingCalc extends React.PureComponent {
    constructor(props) {
        super(props);
            this.state = {activeIndex: 0,
                    term:'0',
                    curr_wt:'',
                    curr_cga:'',
                    sn_human_milk:false,
                    sn_term_formula:false,
                    sn_premature_formula:false,
                    sn_transitional_formula:false,
                    frt_unfortified:false,
                    frt_prolacta:false,
                    ftr_bovine:false,
                    frt_transitional_formula:false,
                    results:{},
                    results1:'',
                    clicked:false,
                    clear_clicked:false
                    }
        this.getResults=this.getResults.bind(this)
        this.getResults1=this.getResults1.bind(this)
        
    }
            
    handleActiveIndexUpdate = (activeIndex) => {this.setState({activeIndex,clicked:false});
                                                CallApiParenteral({"preterm": this.state.term},this.getResults1)
                                                if(activeIndex === 1)
                                                    this.setState({clicked:true})
                                            }
                                                
    termset(event){
        // this.state.term=event.target.value;
        this.setState({
            term:event.target.value
        })
        CallApiParenteral({"preterm": event.target.value},this.getResults1)
        if(this.state.activeIndex === 1)
            this.setState({clicked:true})
    };
    setweight(event) {
        this.setState({
          curr_wt: event.target.value
        })
    }
    setcga(event) {
        this.setState({
          curr_cga: event.target.value
        })
    }

    onChange_sn_human_milk = () => {
        this.setState(initialState => ({
          sn_human_milk: !initialState.sn_human_milk
        }));
    }
    onChange_sn_premature_formula = () => {
        this.setState(initialState => ({
          sn_premature_formula: !initialState.sn_premature_formula
        }));
    }
    onChange_sn_term_formula = () => {
        this.setState(initialState => ({
          sn_term_formula: !initialState.sn_term_formula
        }));
    }
    onChange_sn_transitional_formula = () => {
        this.setState(initialState => ({
          sn_transitional_formula: !initialState.sn_transitional_formula
        }));
    }

    onChange_frt_unfortified = () => {
        this.setState(initialState => ({
          frt_unfortified: !initialState.frt_unfortified
        }));
    }
    onChange_frt_prolacta = () => {
        this.setState(initialState => ({
          frt_prolacta: !initialState.frt_prolacta
        }));
    }
    onChange_frt_bovine = () => {
        this.setState(initialState => ({
          ftr_bovine: !initialState.ftr_bovine
        }));
    }
    onChange_frt_transitional_formula = () => {
        this.setState(initialState => ({
          frt_transitional_formula: !initialState.frt_transitional_formula
        }));
    }
    
    getResults(result){
        this.setState({results:result})
    }
   
    onCalculate()
    {
         CallApiFeeding({"term": this.state.term,
            "corrected_gestational_age": this.state.curr_cga,
            "current_weight": this.state.curr_wt,
            "human_milk": this.state.sn_human_milk,
            "term_formula": this.state.sn_term_formula,
            "premature_formula": this.state.sn_premature_formula,
            "transitional_formula": this.state.sn_transitional_formula,
            "unfortified": this.state.frt_unfortified,
            "prolacta": this.state.frt_prolacta,
            "bovine_human_milk_fortifier": this.state.ftr_bovine,
            "transitional_fortifier": this.state.frt_transitional_formula
             },this.getResults)
        this.setState({clicked:true,clear_clicked:false})

    }
    onClear()
    {
        this.setState({term:'0',
            curr_wt:'',
            curr_cga:'',
            sn_human_milk:false,
            sn_term_formula:false,
            sn_premature_formula:false,
            sn_transitional_formula:false,
            frt_unfortified:false,
            frt_prolacta:false,
            ftr_bovine:false,
            frt_transitional_formula:false,
            results:'',
            clear_clicked:true
            })
    }
    getResults1(result){
        this.setState({results1:HTMLReactParser(result)})
    }
    onDisplay()
    {
        // CallApiParenteral({"preterm": this.state.term1},this.getResults1)
        // this.setState({clicked:true})
    }

    allowEnteral(){
        return this.state.term===''||
                this.state.curr_cga===''||
                this.state.curr_wt===''||
                (parseFloat(this.state.curr_cga)<=parseFloat('19.999999') ||
                parseFloat(this.state.curr_cga)>=parseFloat('44.000001')) ||
                (parseFloat(this.state.curr_wt)<=parseFloat('1.499999') ||
                parseFloat(this.state.curr_wt)>=parseFloat('4.500001')) ||
                (this.state.sn_human_milk===false&&
                this.state.sn_term_formula===false&&
                this.state.sn_premature_formula===false&&
                this.state.sn_transitional_formula===false&&
                this.state.frt_unfortified===false&&
                this.state.frt_prolacta===false&&
                this.state.ftr_bovine===false&&
                this.state.frt_transitional_formula===false)
    }
    allowParenteral(){
        return this.state.term1===''
    }
    render() {
        let recommendations=''
        if(this.state.results.Recommendation)
        {
            let out1 = this.state.results.Recommendation.split("\n");
            recommendations = out1.map(item=><div>&nbsp;&nbsp;&nbsp;&nbsp;&#10003;&nbsp;{item}<br/></div>);
            if(this.state.results.Recommendation === "Combination of term and CGA is wrong")
            {
                recommendations = out1.map(item=><div>&nbsp;&nbsp;&nbsp;&nbsp;&#10008;&nbsp;{item}<br/></div>);
            }
        }

      return (
        <Paper elevation={3} style={{padding:"10px",marginRight:"0.5%",marginLeft:"0.5%"}}>
            <label><h1>Feeding Nutrition</h1></label><hr/>
            
            <Grid container direction="column"> 
                    <div style={{paddingLeft:"2%"}} onChange={(event)=>this.termset(event)}>
                        <FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Term</FormLabel>
                            <RadioGroup aria-label="term" name="term" defaultValue={this.state.term}>
                                <FormControlLabel value='0' control={<Radio color="primary"/>} label="Premature (< 37 weeks)" />
                                <FormControlLabel value='1' control={<Radio color="primary"/>} label="Term (>= 37 weeks)"/>
                            </RadioGroup>
                    </div>   
            </Grid>
        <div style={{marginTop:"1%"}}>  
            <Tabs onSelect={this.handleActiveIndexUpdate}>
                <TabList>
                    <Tab style={this.state.activeIndex===1?{backgroundColor:"#e0e0e0"}:null}>Enteral Vitamin and Iron Supplementation</Tab>
                    <Tab style={this.state.activeIndex===0?{backgroundColor:"#e0e0e0"}:null}>Parenteral Nutrition</Tab>
                </TabList>
            </Tabs>           
        </div>
        {this.state.activeIndex===0?<Grid>
        <Row>
        <Col xs={4}>
            <br/>
        <Grid container direction="row" style={{paddingLeft:"0.5%"}}>            
            <Grid container direction="column" style={{paddingLeft:"2%"}}> 
                <div style={{paddingLeft:"2%"}}>
                    <TextField error={(parseFloat(this.state.curr_wt) < 1.5 || parseFloat(this.state.curr_wt) > 4.5)?true:false}
                    type="number" label="Current Weight (kg)" helperText="Please enter weight between 1.5 and 4.5" variant="outlined"  value={this.state.curr_wt} onChange={(event)=>this.setweight(event)} />
                </div>
                <br/>
                <div style={{paddingLeft:"2%"}}>
                    <TextField error={(parseFloat(this.state.curr_cga) < 20 || parseFloat(this.state.curr_cga) > 44)?true:false}
                    type="number" label="Current CGA (Weeks)" helperText="Please enter CGA between 20 and 44" variant="outlined"  value={this.state.curr_cga} onChange={(event)=>this.setcga(event)} />
                </div>
            </Grid>

            <Grid container direction="column" style={{paddingLeft:"2%"}} > 
                <ul></ul>
                <div style={{paddingLeft:"2%"}}>
                <FormControl component="fieldset">
                    <FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Source of Nutrition</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={this.state.sn_human_milk} onChange={this.onChange_sn_human_milk}/>}
                            label="Human Milk"/>       
                        <FormControlLabel 
                            control={<Checkbox color="primary" checked={this.state.sn_term_formula} onChange={this.onChange_sn_term_formula} />}
                            label="Term Formula"
                        />
                        <FormControlLabel 
                            control={<Checkbox color="primary" checked={this.state.sn_premature_formula} onChange={this.onChange_sn_premature_formula} />}
                            label="Premature Formula"
                        />
                        <FormControlLabel 
                            control={<Checkbox color="primary" checked={this.state.sn_transitional_formula} onChange={this.onChange_sn_transitional_formula} />}
                            label="Transitional Formula"
                        />
                    </FormGroup>
                </FormControl>
                </div>
            </Grid>
            
            <Grid container direction="column" style={{paddingLeft:"2%"}} > 
                <br/>
                <div style={{paddingLeft:"2%"}}>
                <FormControl component="fieldset">
                    <FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Fortification</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={this.state.frt_unfortified} onChange={this.onChange_frt_unfortified}/>}
                            label="None/Unfortified"/>       
                        <FormControlLabel 
                            control={<Checkbox color="primary" checked={this.state.frt_prolacta} onChange={this.onChange_frt_prolacta} />}
                            label="Prolacta"
                        />
                        <FormControlLabel 
                            control={<Checkbox color="primary" checked={this.state.ftr_bovine} onChange={this.onChange_frt_bovine} />}
                            label="Bovine Human Milk Fortifier"
                        />
                        <FormControlLabel 
                            control={<Checkbox color="primary" checked={this.state.frt_transitional_formula} onChange={this.onChange_frt_transitional_formula} />}
                            label="Transitional Formula"
                        />
                    </FormGroup>
                </FormControl>
                </div>
            </Grid>
            
        </Grid>
        <Button variant="contained" color="primary" onClick={()=>{this.onCalculate()}} disabled={this.allowEnteral()}>Calculate</Button> 
        <Button variant="contained" style={{float:"right"}} color="primary" onClick={()=>{this.onClear()}}>Clear</Button>
        {/* style={{marginLeft:150}}  */}
        </Col>
        {this.state.clicked && !this.state.results.Recommendation && !this.state.clear_clicked?
        <div style={{marginTop:"25%",marginLeft:"25%"}}>
        <CircularProgress/>
        </div>
        :null}
        {this.state.results.Recommendation?<Col xs={6}>
        <Grid>     
               <h2 style={{marginTop:"10%"}}>Recommendations:</h2>
                   <Paper elevation={5} style={{margin:"2px",width:"60%"}} variant="outlined">
                           <h3>{recommendations}</h3>
                   </Paper>    
        </Grid>
        <Grid direction="row" style={{marginTop:"5%"}}>
            <h2>Notes:</h2>
            <ul></ul>
            <h3>Who should receive a multivitamin with iron instead of a separate vitamin and iron supplement? (1ml contains 10mg iron)</h3>
            &#10146; Growing preterm infants approaching discharge who weigh over 2.5kg on HM<br/>
            &#10146; Term SGA infant weighing {String.fromCharCode(60)} 2.5kg and/or multiple blood draws<br/>
            <ul></ul>
            <h3>Who should receive enteral iron?</h3>
            &#10146; All preterm infant less than 37wks once on full feeds (defined as 120-130ml/kg of 24cal/oz BM or formula) and at least 14days old<br/>
            &#10146; Give 1-3mg/kg additional iron (lower range for full formula-fed infants and upper range for BM-fed infants)<br/>
            &#10146; Any infant receiving Epogen<br/>
            &#10146; Give 2-5mg/kg additional iron<br/>
            <ul></ul>
        </Grid>
        </Col>:null}
        </Row></Grid>:null}

        {this.state.activeIndex===1?<Grid>
        <Row>
        {/* <Col xs={3}>
        <Grid container direction="column" paddingLeft="2%">
            <ul></ul>
            <Grid container direction="column" style={{paddingLeft:"2%"}}>        
                        <div style={{paddingLeft:"2%"}} onChange={(event)=>this.termset1(event)}>
                        <FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Term</FormLabel>
                            <RadioGroup aria-label="term1" name="term1" defaultValue={this.state.term}>
                                <FormControlLabel value='0' control={<Radio color="primary"/>} label="Premature (< 37 weeks)" />
                                <FormControlLabel value='1' control={<Radio color="primary"/>} label="Term (>= 37 weeks)"/>
                            </RadioGroup>
                        </div>   
                        <ul></ul>
            </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={()=>{this.onDisplay()}} disabled={this.allowParenteral()}>Display</Button> 
        </Col> */}
        {this.state.clicked && this.state.results1===''?<div style={{marginTop:"10%",marginLeft:"50%",marginBottom:"10%"}}>
        <CircularProgress/>
        </div>:null}
        {this.state.results1!==''?<Col xs ={11}>
        <Grid>   
                <Grid container direction="row" style={{margin:"5%", marginTop:"2%", alignItems:"center",justifyContent:"left"}}>{this.state.results1}</Grid>  
        </Grid>
        </Col>:null}
        </Row>
        </Grid>:null}
        </Paper>
      );
    }  
}
export default FeedingCalc;