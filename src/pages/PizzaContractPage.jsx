import React, { Component } from "react";
import AppBar from "../components/AppBar";
import TermDetails from "../components/TermDetails"
import ContractsTable from "../components/ContractsTable"

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
            <Typography variant="h4" style={{ color: "#f0f0f0"}}> Create a Custom Contract </Typography>
          </Grid>
          <Grid container spacing={5} justify="center" alignItems="center" style={{paddingTop: "13%", width: '100%'}}>
            <Grid item xs style={{paddingLeft: "10%", height: '40vh'}}>
                <TermDetails {...this.props} data={this.state.contractData} web3={this.props.web3} />
            </Grid>
            <Grid item xs={8} style={{height: '40vh'}}>
                <ContractsTable data={this.state.contractData} web3={this.props.web3} contractID={this.props.match.params.contractID}/>
            </Grid>
            </Grid>
        </div>
      )
  }
}

export default PizzaContractPage;
