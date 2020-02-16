import React, { Component } from "react";
import AppBar from "../components/AppBar";
import InputsDisplay from "../components/InputsDisplay"

import { Grid, Typography} from "@material-ui/core";
import { PulseLoader } from 'react-spinners';
import '../App.css';



class CreateContractPage extends Component {
  state = {
  }

  async componentDidMount() {
    
  }

  

  handleClose = () => {
    this.setState({ showPopup: false })
  }

  render() {
      return (
        <div style={{height:'100vh'}}>
          <AppBar/>
          <Grid style={{ paddingTop: "3%" }}>
            <Typography variant="h4" style={{ color: "#f0f0f0"}}> Live Sensor Data </Typography>
          </Grid>
          <InputsDisplay data={"http://10.0.1.13"} />
         
        </div>
      )
  }
}

export default CreateContractPage;
