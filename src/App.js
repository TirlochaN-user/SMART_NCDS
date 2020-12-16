import React,{Component} from "react";
import SarnatForm from "./Hypothermia/SarnatForm";
import HypothermiaCalc from "./Hypothermia/HypothermiaCalc";
import SepsisCalc from "./Sepsis/SepsisCalc";
import FeedingCalc from "./Feeding/FeedingCalc";
import FeedingNew from "./Feeding/FeedingNew";
import CSCECalc from "./CSCE/CSCECalc";
import welcomePage from './Landingpage';
import DefaultLayout from './Layouts/DefaultLayout'
import {BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      latestItems:{}
    }
  }
render()
{ 
  return (  
    <div className="App"> 
    <Router>
    <DefaultLayout>
    <Switch>
      
      <Route path="/Hypothermia/HypothermiaCalc" component={HypothermiaCalc}/>
      <Route path="/Hypothermia/SarnatForm" component={SarnatForm} />
      <Route path="/Feeding/FeedingCalc" component={FeedingCalc}/>
      {/* <Route path="/Feeding/FeedingNew" component={FeedingNew}/> */}
      <Route path="/CSCE/CSCECalc" component={CSCECalc}/>
      <Route path="/Sepsis/SepsisCalc" component={SepsisCalc}/>
      <Route path='/Feeding' component={FeedingNew}/>
      <Route path="/" component={welcomePage}/>
    </Switch>
    </DefaultLayout>
    </Router>   
    </div>
    );
  }
}
 
export default App;