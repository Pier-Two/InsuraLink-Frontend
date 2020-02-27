import React, { Component } from "react";
import AppBar from "../components/AppBar";
import DiagramTree from "../components/DiagramTree"
//import { PulseLoader } from 'react-spinners';
import '../App.css';

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
