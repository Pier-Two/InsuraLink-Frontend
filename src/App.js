import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/404";
import './App.css';
import Typography from '@material-ui/core/Typography';
import { PulseLoader } from 'react-spinners';


class App extends Component {
  state = {
    web3: null,
    loadError: false, loading: false,
    showWelcomeMessage: false
  };

  componentDidMount = async () => {
    
  }

  render() {
    if (this.state.loading === true) {
      return (
        <PulseLoader
          sizeUnit={"px"}
          size={5}
          color={'#2A2B2A'}
          loading={this.state.showLoader}
        />
      )
    } else if (this.state.loadError) {
      return (
        <div>
          <Typography variant="h5" style={{ paddingTop: "5px", color: "#2A2B2A" }}> Sorry, there was an error loading in the contracts </Typography>
          <Typography variant="h5" style={{ paddingTop: "5px", color: "#2A2B2A" }}> Please make sure you have metamask configured and are connected to the Ropsten test network</Typography>
        </div>
      )
    } else {
      return (
        <div className="App" style={{ height: '100vh' }}>
            <Switch>
              <Route exact path="/" render={(props) => {
                return (<MainPage />)
              }} />
              <Route render={(props) => {
                return (<NotFoundPage />)
              }} />
            </Switch>
          </div>
      );
    }
  }
}

export default App;
