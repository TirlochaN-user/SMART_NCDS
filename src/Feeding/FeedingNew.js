import React from 'react';
import {Form} from 'react-bootstrap';
import { DateTimePicker } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import Slider from '@material-ui/core/Slider';
import FeedingGuidelines1 from './feeding_guidelines1.png';
import FeedingGuidelines2 from './feeding_guidelines2.png';
import ResidualAlgo from './residual_algorithm.png';
import TPNGuidelines1 from './tpn_guidelines1.png';
import TPNGuidelines2 from './tpn_guidelines2.png';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import CallApiFeeding from './CallAPIFeeding';
import CallApiFeedingAdv from './CallAPIFeedingAdv';
import { Paper, Grid } from '@material-ui/core';
import { Row, Col } from 'react-flexbox-grid';
import { Tabs, TabList, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FHIR from "fhirclient"
FHIR.oauth2.ready()
    .then(client => client.request("Patient"))
    .then(console.log)
    .catch(console.error);



class FeedingNew extends React.PureComponent {
    constructor(props) {
        super(props);
            this.state = {flag: 1,
                    flagNR: 1,
                    activeIndex: 0,
                    activeIndexGuidelines: 0,
                    mrn: 123456789,
                    name: "First Last",
                    weight: 1500,
                    TFPD: 150,
                    FSDate: new Date(),
                    category : 0,
                    FRDate: new Date(),
                    ResFeeding:0,
                    CheckRes:false,
                    resultsFeed:{},
                    term:'0',
                    curr_wt:1.5,
                    curr_cga:21,
                    sn_human_milk:true,
                    sn_term_formula:false,
                    sn_premature_formula:false,
                    sn_transitional_formula:false,
                    frt_unfortified:true,
                    frt_prolacta:false,
                    ftr_bovine:false,
                    frt_transitional_formula:false,
                    results:{},
                    clicked:false,
                    clear_clicked:false
                    }
         this.getResults=this.getResults.bind(this)
         this.getResultsFeed=this.getResultsFeed.bind(this)        
    }

    handleActiveIndexGuidelines(value){
      this.setState({
        activeIndexGuidelines:value
      });
    }

    handleActiveIndexUpdate(value){
      this.setState({
        activeIndex:value
      });
    }

    change_flag(){
      this.setState({
        flag: 0
      })
    }

    change_flagNR(){
      this.setState({
        flagNR: 0
      })
    }

    set_weight(event) {
      this.setState({
          weight: parseInt(event.target.value),
          flag: 1,
          flagNR: 1
      })
    }

    set_FSdate(event) {
      this.setState({
          FSDate: event,
          flag: 1
        })
        let formatted_date = this.state.FSDate.getDate() + "-" + (this.state.FSDate.getMonth() + 1) + "-" + this.state.FSDate.getFullYear()
    }

    set_FRdate(event) {
      this.setState({
          FRDate: event,
          flag: 1
      })
    }

    set_TFPD(event, newValue) {
      this.setState({
          TFPD: newValue,
          flag: 1
      })
    }

    set_ResFeeding(event, newValue) {
      this.setState({
          ResFeeding: newValue,
          flag: 1
      })
    }

    set_category(event) {
      this.setState({
          category: parseInt(event.target.value),
          flag: 1
      })
    }

    set_CheckRes= () => {
      this.setState(initialState => ({
          CheckRes: !initialState.CheckRes,
          flag: 1
      }));      
    }

    getResultsFeed(result){
      this.setState({resultsFeed:result})
        this.change_flag()
    }

    ShowFeedResults()
    {
      let formatted_date1 = this.state.FSDate.getFullYear() + "-" + (this.state.FSDate.getMonth() + 1) + "-" + this.state.FSDate.getDate()
      let formatted_date2 = this.state.FRDate.getFullYear() + "-" + (this.state.FRDate.getMonth() + 1) + "-" + this.state.FRDate.getDate()
        CallApiFeedingAdv({"total_fluid":this.state.TFPD,
            "weight":this.state.weight,
            "manual_category":this.state.category,
            "feeding_start_date":formatted_date1.toString(),
            "feeding_resume_date":formatted_date2.toString(),
            "resume_feed":this.state.CheckRes,
            "resume_feed_day":this.state.ResFeeding
            },this.getResultsFeed)
            this.change_flag();
        
    }

  createTable = () => {
     let table = []
    for(let i in this.state.resultsFeed)
    {
        table.push(
          <tr>
            <td>{i}</td>
            <td>{this.state.resultsFeed[i]["Date"]}</td>
            <td>{this.state.resultsFeed[i]["Guideline"]}</td>
            <td>{this.state.resultsFeed[i]["Feed Volume"]}</td>
            <td>{this.state.resultsFeed[i]["Total IVF Rate"]}</td>
            <td>{this.state.resultsFeed[i]["PN Recommendations"]}</td>
          </tr>
        )
      }   
      this.change_flag() 
    return table
  }

  // Nutrition Recommender FUnctions

    termset(event){
      this.setState({
          term:event.target.value,
          flagNR:1
      })
    };
    setcga(event) {
        this.setState({
          curr_cga: event.target.value,
          flagNR: 1
        })
    }

    onChange_sn_human_milk = () => {
        this.setState(initialState => ({
          sn_human_milk: !initialState.sn_human_milk,
          flagNR: 1
        }));
    }
    onChange_sn_premature_formula = () => {
        this.setState(initialState => ({
          sn_premature_formula: !initialState.sn_premature_formula,
          flagNR: 1
        }));
    }
    onChange_sn_term_formula = () => {
        this.setState(initialState => ({
          sn_term_formula: !initialState.sn_term_formula,
          flagNR: 1
        }));
    }
    onChange_sn_transitional_formula = () => {
        this.setState(initialState => ({
          sn_transitional_formula: !initialState.sn_transitional_formula,
          flagNR: 1
        }));
    }

    onChange_frt_unfortified = () => {
        this.setState(initialState => ({
          frt_unfortified: !initialState.frt_unfortified,
          flagNR: 1
        }));
    }
    onChange_frt_prolacta = () => {
        this.setState(initialState => ({
          frt_prolacta: !initialState.frt_prolacta,
          flagNR: 1
        }));
    }
    onChange_frt_bovine = () => {
        this.setState(initialState => ({
          ftr_bovine: !initialState.ftr_bovine,
          flagNR: 1
        }));
    }
    onChange_frt_transitional_formula = () => {
        this.setState(initialState => ({
          frt_transitional_formula: !initialState.frt_transitional_formula,
          flagNR: 1
        }));
    }

    getResults(result){
        this.setState({results:result})
    }

    onCalculate()
    {
        CallApiFeeding({"term": this.state.term,
            "corrected_gestational_age": this.state.curr_cga,
            "current_weight": this.state.weight,
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
        this.change_flagNR()
    }

    render() {

      const useStyles = makeStyles({
        root: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        icon: {
          borderRadius: '50%',
          width: 16,
          height: 16,
          boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
          backgroundColor: '#f5f8fa',
          backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
          '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
          },
          'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
          },
          'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
          },
        },
        checkedIcon: {
          backgroundColor: '#137cbd',
          backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
          '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
          },
          'input:hover ~ &': {
            backgroundColor: '#106ba3',
          },
        },
      });

      function StyledRadio(props) {
        const classes = useStyles();
        return (
          <Radio
            className={classes.root}
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
          />
        );
      }

      Moment.locale('en');
      momentLocalizer();
        const marksTFPD = [
          { value: 20, label: '20'}, {value: 40, label: '40'}, {value: 60, label: '60'}, {value: 80, label: '80'}, {value: 100, label: '100'},
          , {value: 120, label: '120'}, {value: 140, label: '140'}, {value: 160, label: '160'}, {value: 180, label: '180'}, {value: 200, label: '200'}
        ];

        const marksResFeeding = [
          { value: 0, label: '0'}, { value: 2, label: '2'}, {value: 4, label: '4'}, {value: 6, label: '6'}, {value: 8, label: '8'}, {value: 10, label: '10'},
          , {value: 12, label: '12'}, {value: 14, label: '14'}, {value: 16, label: '16'}, {value: 18, label: '18'}, {value: 20, label: '20'}
        ];

        // For Nutrition Recommender
        let recommendations=''
        let wd=''
        let bgc=''
        if(this.state.results.Recommendation)
        {
            wd = "40%"
            bgc = "yellow"
            let out1 = this.state.results.Recommendation.split("\n");
            recommendations = out1.map(item=><div>&nbsp;&nbsp;&nbsp;&nbsp;&#10003;&nbsp;{item}<br/></div>);
            if(this.state.results.Recommendation === "Combination of term and CGA is wrong" ||
                this.state.results.Recommendation === "CGA should be in the range of 20 and 44" ||
                this.state.results.Recommendation === "Current weight should be in the range of 500 and 9500")
            {
                wd = "60%"
                bgc = "red"
                recommendations = out1.map(item=><div>&nbsp;&nbsp;&nbsp;&nbsp;&#10008;&nbsp;{item}<br/></div>);
            }
        }

      return(
            <Paper elevation={3} style={{padding:"10px", marginLeft:"0.5%", marginRight:"0.6%"}}>
              <Col>
            <Tabs value={this.state.activeIndex} onSelect={(value) => this.handleActiveIndexUpdate(value)}>
                <TabList style={{marginLeft:"0.3%"}}>
                  <Row>
                    <Col>
                      <Tab style={(this.state.activeIndex===1 || this.state.activeIndex===2)?{backgroundColor:"#e0e0e0", height:"100%"}:{height:"100%"}}>Feeding Calculator</Tab>
                      <Tab style={(this.state.activeIndex===0 || this.state.activeIndex===2)?{backgroundColor:"#e0e0e0", height:"100%"}:{height:"100%"}}>Nutrition Recommender</Tab>
                      <Tab style={(this.state.activeIndex===0 || this.state.activeIndex===1)?{backgroundColor:"#e0e0e0", height:"100%"}:{height:"100%"}}>Guidelines</Tab>
                    </Col>
                    <Col style={{width:"5%"}}></Col>
                    <Col>
                      <FormLabel component="legend" style={{color:"black",fontWeight:"bold", marginTop:"22%"}}>Term:</FormLabel>
                    </Col>
                    <Col style={{marginLeft:"0.7%"}}>
                        <RadioGroup row defaultValue={this.state.term} onChange={(event)=>this.termset(event)}>
                            <FormControlLabel value='0' control={<StyledRadio color="primary"/>} label="Premature (<37w)" />
                            <FormControlLabel value='1' control={<StyledRadio color="primary"/>} label="Term (>=37w)"/>
                        </RadioGroup>
                    </Col>
                    <Col style={{marginLeft:"0.5%"}}>
                      <FormLabel component="legend" style={{color:"black",fontWeight:"bold", marginTop:"12%"}}>Weight (g):</FormLabel>
                    </Col>
                    <Col xs = {{span:1, offset:1 }} style={{marginLeft:"0.5%"}}>
                      <Form.Control
                          size='md'
                          required
                          type="number"
                          placeholder="Weight"
                          defaultValue="1500"
                          value={this.state.weight}
                          onChange={(event)=>this.set_weight(event)}
                      />
                    </Col>
                    <Col style={{marginLeft:"0.5%"}}>
                      <FormLabel component="legend" style={{color:"black",fontWeight:"bold", marginTop:"10%"}}>CGA (weeks):</FormLabel>
                    </Col>
                    <Col xs = {{span:1, offset:1 }} style={{marginLeft:"0.5%"}}>
                      <Form.Control
                        size='md'
                        required
                        type="number"
                        placeholder="CGA (Weeks)"
                        defaultValue={20}
                        value={this.state.curr_cga}
                        onChange={(event)=>this.setcga(event)}
                      />
                    </Col>                
                </Row>
                </TabList>
            </Tabs>
            </Col>
            
            {this.state.activeIndex===0?<Row><Col xs={3} style={{overflowY:"scroll", overflowX:"initial", height:(window.innerHeight-235), backgroundColor:"#DDE6F0"}}>
            <Form>
            <Form.Row style={{padding:"2%"}}>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Total Fluids per Day (mL/Kg/day) </FormLabel>
                <Slider
                  style = {{marginBottom:"8%"}}
                  min = {20}
                  max = {200}
                  step = {5}
                  valueLabelDisplay="auto"
                  marks={marksTFPD}
                  defaultValue={this.state.TFPD}
                  onChange={(event, newValue)=>this.set_TFPD(event, newValue)}
                />

                <FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Feeding Start Date </FormLabel>
                <DateTimePicker
                  style = {{marginBottom:"4%"}}
                  value={this.state.FSDate}
                  onChange={value => this.set_FSdate(value)} 
                  time={false}
                  format="MMM DD, YYYY"
                  defaultValue= {new Date()}
                />
                <hr/> 

                <FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Manual Category Selection</FormLabel>
                  <Form.Control as="select" style={{marginBottom:"4%"}} value={this.state.category} onChange={(event)=>this.set_category(event)}>
                    <option value={0}>Default</option>
                    <option value={1}>Category 1 (&#60;750)</option>
                    <option value={2}>Category 2 (751-1000)</option>
                    <option value={3}>Category 3 (1001-1250)</option>
                    <option value={4}>Category 4 (1251-1500)</option>
                    <option value={5}>Category 5A (1501-1800)</option>
                    <option value={6}>Category 5B (1801-2000)</option>
                    <option value={7}>Category 6A (&#62;2000)</option>
                    <option value={8}>Category 6B (&#62;2000)</option>
                  </Form.Control>
                <Form.Label>Selection will recalculate table to the selected category for feeding calculation</Form.Label>          
                <hr/>

                <FormLabel  component="legend" style={{color:"black",fontWeight:"bold"}}>Feeding Resume Date</FormLabel>
                <DateTimePicker
                  style = {{marginBottom:"4%"}}
                  value={this.state.FRDate}
                  onChange={value => this.set_FRdate(value)} 
                  time={false}
                  format="MMM DD, YYYY"
                  defaultValue= {new Date()}
                />

              <FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Resume Feeding on Day</FormLabel>
                <Slider
                  style = {{marginBottom:"8%"}}
                  min = {0}
                  max = {20}
                  step = {1}
                  valueLabelDisplay="auto"
                  marks={marksResFeeding}
                  defaultValue={this.state.ResFeeding}
                  // onChange={this.set_TFPD()}
                  onChange={(event, newValue)=>this.set_ResFeeding(event, newValue)}
                />

                <FormControlLabel 
                                      control={<Checkbox color="primary" checked={this.state.CheckRes} onChange={this.set_CheckRes}/>}
                                      label="Resume Feeding"
                                  />
              <Form.Label>Checked box will recalculate table to resume feed on selected date and day</Form.Label>
              {this.state.flag===1?this.ShowFeedResults():null}
              {this.change_flag()}
              </Form.Group>
            </Form.Row>
            </Form>
                        
            </Col>

            <Col xs = {9} style={{paddingLeft:"5%", overflowY:"scroll", overflowX:"initial", height:window.innerHeight-235}}>
              {/* {this.state.resultsFeed} */}
              <MDBTable>
                <MDBTableHead>
                  <tr>
                    <th>Day</th>
                    <th>Date</th>
                    <th>Guideline</th>
                    <th>Feed Volume</th>
                    <th>Total IVF Rate</th>
                    <th>PN Recommendation</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {this.createTable()}
                </MDBTableBody>
              </MDBTable>

            </Col>
            </Row>:null}
          

            {this.state.activeIndex===2?<Row style={{marginLeft:"2%"}}>
            <Tabs style={{width:"100%"}} onSelect={(value) => this.handleActiveIndexGuidelines(value)}>
                    <TabList>
                        <Tab style={this.state.activeIndexGuidelines===1 || this.state.activeIndexGuidelines===2?{backgroundColor:"#e0e0e0"}:null}>Feeding Guideline</Tab>
                        <Tab style={this.state.activeIndexGuidelines===0 || this.state.activeIndexGuidelines===2?{backgroundColor:"#e0e0e0"}:null}>Residual Algorithm</Tab>
                        <Tab style={this.state.activeIndexGuidelines===0 || this.state.activeIndexGuidelines===1?{backgroundColor:"#e0e0e0"}:null}>TPN Guideline</Tab>
                    </TabList>
            </Tabs>

            {this.state.activeIndexGuidelines===0?<Col style={{overflowY:"scroll", overflowX:"initial", height:(window.innerHeight-282)}}>
              <img src={FeedingGuidelines1} style={{width:"80%", height:"160%"}}/>
              <img src={FeedingGuidelines2} style={{width:"80%", height:"160%"}}/>
            </Col>:null}

            {this.state.activeIndexGuidelines===1?<Col style={{overflowY:"scroll", width:"100%", height:(window.innerHeight-282)}}>
              <img src={ResidualAlgo} style={{marginLeft:"15%"}}/>
            </Col>:null}

            {this.state.activeIndexGuidelines===2?<Col style={{overflowY:"scroll", overflowX:"initial", height:(window.innerHeight-282)}}>
              <img src={TPNGuidelines1}/>
              <img src={TPNGuidelines2}/>
            </Col>:null}        
            </Row>:null}

            {this.state.activeIndex===1?<Row><Col xs={3} style={{overflowY:"scroll", overflowX:"initial", height:window.innerHeight-235, backgroundColor:"#DDE6F0"}}>
            <Form>
            <Form.Row style={{padding:"2%"}}>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <FormLabel component="legend" style={{color:"black",fontWeight:"bold"}}>Source of Nutrition</FormLabel>
                    <FormGroup style={{marginBottom:"4%"}}>
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
              </Form.Group>
            </Form.Row>
            </Form>
            </Col>
            {this.state.flagNR===1?this.onCalculate():null}
            {this.change_flagNR()}
            <Col xs = {9} style={{paddingLeft:"4%",overflowY:"scroll", overflowX:"initial", height:window.innerHeight-235}}> 
            <Col xs={11}>
              <Grid>     
               <h2 style={{marginTop:"2%"}}>Recommendations:</h2>
                   <Paper elevation={5} style={{margin:"2%", padding:"1%", width:wd, backgroundColor:bgc}}>
                        <h3>{recommendations}</h3>
                   </Paper>    
              </Grid>
              </Col>
              <Col xs = {11}>
              <Grid direction="row" style={{marginTop:"2%"}}>
                  <h3>Notes:</h3>
                  <ul></ul>
                  <h4>Who should receive a multivitamin with iron instead of a separate vitamin and iron supplement? (1ml contains 10mg iron)</h4>
                  &#10146; Growing preterm infants approaching discharge who weigh over 2.5kg on HM<br/>
                  &#10146; Term SGA infant weighing {String.fromCharCode(60)} 2.5kg and/or multiple blood draws<br/>
                  <ul></ul>
                  <h4>Who should receive enteral iron?</h4>
                  &#10146; All preterm infant less than 37wks once on full feeds (defined as 120-130ml/kg of 24cal/oz BM or formula) and at least 14days old<br/>
                  &#10146; Give 1-3mg/kg additional iron (lower range for full formula-fed infants and upper range for BM-fed infants)<br/>
                  &#10146; Any infant receiving Epogen<br/>
                  &#10146; Give 2-5mg/kg additional iron<br/>
                  <ul></ul>
              </Grid>
              </Col>
            </Col>
            </Row>:null}
            </Paper>
        );
    }
}
export default FeedingNew;