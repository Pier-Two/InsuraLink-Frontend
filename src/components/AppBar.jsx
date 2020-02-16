import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";
import Logo from "../img/SDL_Logo_Header.png";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Typography } from '@material-ui/core';
import '../css/Nav.css';

class CustomAppBar extends Component {
  state = {
  };

  componentDidMount = () => {
  }

  handleChange = (event) => {
    this.setState({ selectedTab: event.target.value })
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
                <ListItem label="Home" to='/create' component={Link} className = "link">
                  <Typography variant="subtitle2"> Create Contract </Typography>
                </ListItem>
                <ListItem label="Inputs" to='/inputs' component={Link} className = "link">
                  <Typography variant="subtitle2"> Inputs </Typography>
                </ListItem>
                <ListItem className="link"> 
                  <button style={{ color: "white", border: "none", backgroundColor: "#796b4d" }}
                    data-dh-feature="network"
                    data-dh-property-enable>
                  Connect to Network
                  </button>
                </ListItem>
              </List>
            </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default (CustomAppBar);