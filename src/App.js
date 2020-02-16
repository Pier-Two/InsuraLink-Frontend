import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/404";
import PizzaContractPage from "./pages/PizzaContractPage";
import CreateContractPage from "./pages/CreateContractPage"
import MarketPlacePage from "./pages/MarketPlacePage";
import InputsDisplayPage from "./pages/InputsDisplayPage";
import './App.css';
import Typography from '@material-ui/core/Typography';
import { PulseLoader } from 'react-spinners';

import getWeb3 from './utils/getWeb3'

class App extends Component {
  state = {
    web3: null,
    loadError: false, loading: false,
    showWelcomeMessage: false
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // this.setState({ loading :false, web3: web3 })
      // const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      // web3.eth.getAccounts().then(console.log);
      //const ethers = getEthers(web3)
      // console.log(ethers)
      // console.log(ethers.getDefaultProvider)
      console.log(web3)
      this.setState({ loading :false, web3: web3 })

    } catch (error) {
      // Catch any errors for any of the above operations.
      // alert(
      //   `Failed to load web3, accounts, or contract. Check console for details.`,
      // );
      this.setState({ loadError: true, loading: false })
      console.error(error);
    }
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
                return (<MainPage {...props} web3={this.state.web3} />)
              }} />
              <Route exact path="/pizza" render={(props) => {
                return (<PizzaContractPage {...props} web3={this.state.web3}/>)
              }} />
              <Route exact path="/inputs" render={(props) => {
                return (<InputsDisplayPage {...props} />)
              }} />
              <Route exact path="/marketplace" render={(props) => {
                return (<MarketPlacePage {...props} web3={this.state.web3} />)
              }} />
              <Route exact path="/create" render={(props) => {
                return (<CreateContractPage {...props} web3={this.state.web3}/>)
              }} />
              <Route render={(props) => {
                return (<NotFoundPage {...props} />)
              }} />
            </Switch>
          </div>
      );
    }
  }
}

export default App;
