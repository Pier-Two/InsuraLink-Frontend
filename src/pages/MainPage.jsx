import React, { Component } from "react";
import AppBar from "../components/AppBar";
import CenteredTree from "../components/CenteredTree"
import DiagramTree from "../components/DiagramTree"
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

  inputs = () => {
    this.props.history.push('/inputs')
  }

  handleClose = () => {
    this.setState({ showPopup: false })
  }

  render() {
      return (
        <div>
          <AppBar {...this.props} />
          <div onClick={this.inputs} style={{position: "absolute", cursor: "pointer", float: "left",height: "100%", width: "30vw"}}>
          </div>
          <DiagramTree/>
        </div>
      )
  }
}

export default MainPage;
