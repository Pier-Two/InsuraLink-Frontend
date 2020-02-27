import React, { Component } from "react";
import AppBar from "../components/AppBar";
import { PulseLoader } from 'react-spinners';
import '../App.css';

class SubmissionPage extends Component {
  state = {
    loading: true,
  }

  componentDidMount = async () => {
  }

  hideLoader = () => {
    this.setState({
      loading: false
    });
  };

  render() {
    if (this.state.video == null) {
      return (
        <div>
          <AppBar {...this.props} />
          <div style={{paddingTop: "20vh"}}>
          {this.state.loading ? (
              <PulseLoader
              sizeUnit={"px"}
              size={10}
              color={'#f0f0f0'}
              loading={this.state.loading}
              />
          ) : null}
          <iframe title="submission-video" width="560" height="315" src="https://www.youtube.com/embed/H5dTMYOHedY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen onLoad={this.hideLoader} ></iframe>
          </div>
        </div>
      );
    }
  }
}

export default SubmissionPage;
