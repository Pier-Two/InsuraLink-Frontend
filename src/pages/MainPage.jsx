import React, { Component } from "react";
import AppBar from "../components/AppBar";
import CenteredTree from "../components/CenteredTree"
import TestTree from "../components/TestTree"
// import linkTRS from "../contracts/LinkTRS";
// import token from "../contracts/TestDAI";
// import demoAggregator from "../contracts/DemoAggregator";
// import contract_config from "../contract_config.json";
import { PulseLoader } from 'react-spinners';
import '../App.css';
import '../css/Tree.css'
//tree graph stuff

class MainPage extends Component {
  state = {

  }

  componentDidMount = async () => {
    
  }



  handleClose = () => {
    this.setState({ showPopup: false })
  }

  render() {
      return (
        <div>
          <AppBar/>
          <TestTree/>
        </div>
      )
  }
}

export default MainPage;
