import React, { Component } from "react";
import AppBar from "../components/AppBar";
import TermDetails from "../components/TermDetails"
import InputsTable from "../components/InputsTable"
import StepProgressBar from "../components/StepProgressBar"

import { Grid, Typography} from "@material-ui/core";
import { PulseLoader } from 'react-spinners';
import '../App.css';



class PizzaContractPage extends Component {
  state = {
  }

  async componentDidMount() {
    
  }

  handleClose = () => {
    this.setState({ showPopup: false })
  }

  render() {
      return (
        <div>
          <AppBar/>
          <Grid style={{ paddingTop: "3%" }}>
            <Typography variant="h5" style={{ color: "#f0f0f0"}}> Pizza Contract Example </Typography>
          </Grid>
          <Grid container spacing={5} justify="center" alignItems="center" style={{paddingTop: "5%", width: '100%'}}>
            <Grid item xs style={{paddingLeft: "10%", height: '20vh'}}>
                <TermDetails {...this.props} contractData={this.state.contractData} web3={this.props.web3}/>            
            </Grid>
            <Grid item xs={8} style={{height: '20vh'}}>
              <InputsTable data={"http://10.0.1.13"}/>
            </Grid>
          </Grid>
          <Grid container justify="center" alignItems="center" style={{ paddingTop: "20%", paddingLeft: "20%", height:"40vh", width: "80%"}}>
            <Grid item xs={12}>
              <StepProgressBar/>
            </Grid>
            
          </Grid>
        </div>
      )
  }
}

export default PizzaContractPage;
