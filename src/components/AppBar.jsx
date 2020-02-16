import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";
import Logo from "../img/SDL_Logo_Header.png";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Typography, Button } from '@material-ui/core';
import '../css/Nav.css';
import IERC20 from "../contracts/IERC20.json";
import contract_config from "../contract_config.json";

class CustomAppBar extends Component {
  state = {
  };

  componentDidMount = () => {
  }

  handleChange = (event) => {
    this.setState({ selectedTab: event.target.value })
  }

  depositDAI = async () => {
    var web3 = this.props.web3;
    var contract = new web3.eth.Contract(IERC20.abi, contract_config.dai_dev);
    var account = (await this.props.web3.eth.getAccounts())[0]
    this.setState({web3: web3, contract: contract, account: account})
    console.log(account)
    await contract.methods.approve(contract_config.insuralink_dev, web3.utils.toWei("100")).send({from: account})
  }


  render() {
    return (
      <div>
        <AppBar position="static" elevation={0} style={{backgroundColor: "#252525", width: '100%'}}>
          <Toolbar>
            <img src={Logo}
              style={{ height: "7%", width: "7%", display: "flex", alignItems: "center",
              justifyContent: "center", marginRight: '30px'}}
              alt={"Vigeo Logo - We Provide A Chainlink Reputation Service"} />
              <List component="nav" style={{marginRight: 0, marginLeft: "auto", display: 'flex', flexDirection: 'row', padding: 0, width: "50%"}}>
                <ListItem label="Home" to='/' component={Link} className = "link">
                  <Typography variant="subtitle2"> InsuraLink </Typography>
                </ListItem>
                <ListItem 
                  label="Home" to='/marketplace' component={Link} className = "link">
                  <Typography variant="subtitle2"> Market Place </Typography>
                </ListItem>
                <ListItem label="Home" to='/pizza' component={Link} className = "link">
                  <Typography variant="subtitle2"> Order Pizza </Typography>
                </ListItem>
                <ListItem label="Inputs" to='/inputs' component={Link} className = "link">
                  <Typography variant="subtitle2"> Inputs </Typography>
                </ListItem>
                  <Button onClick={() => {this.depositDAI()}}> Deposit DAI </Button>
              </List>
            </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default (CustomAppBar);
