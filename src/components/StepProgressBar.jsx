import React from "react";
import "react-step-progress-bar/styles.css";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import {Typography, Grid}  from '@material-ui/core';
import insuralink from "../contracts/Insuralink.json";
import contract_config from "../contract_config.json";

class StepProgressBar extends React.Component {
  state = {
    percent: 0,
    status: "Buy your pizza NOW!!",
    activeContract: null
  }

  getStatus = async () => {
    var web3 = this.props.web3;
    var contract = new web3.eth.Contract(insuralink.abi, contract_config.insuralink_dev);
    var account = (await this.props.web3.eth.getAccounts())[0]
    console.log(this.state.activeContract)
    if (this.state.activeContract != null) {
      var status = await contract.methods.getContract(this.state.activeContract).call()
      //Set Status as pending and wait for this transaction to be processed
      console.log(status);
      if (status[4] == false) {
        //Contract has been trigged / paid out
        this.setState({percent: 100})
      } else {
        //Continue polling
        console.log("Continue polling")
        this.setState({percent: 50})
        return;
      }
    }
      // this.setState({ percent: this.state.percent + 50 })
      // this.setState({ status: "Your pizza is on its way!" })
      // if (this.state.percent >= 100) {
      //   this.setState({ status: "Your pizza has arrived!" })
      //   clearInterval(this.state.loop)
      // }
  }

  componentDidMount = async () => {
    var web3 = this.props.web3;
    var contract = new web3.eth.Contract(insuralink.abi, contract_config.insuralink_dev);
    var account = (await this.props.web3.eth.getAccounts())[0]
    this.setState({web3: web3, contract: contract, account: account})
    console.log(account)
    var activeContracts = await contract.methods.getActiveContractsByUser(account).call({from: account})
    console.log(activeContracts)
    console.log(activeContracts[activeContracts.length - 1])
    this.setState({activeContract: activeContracts[activeContracts.length - 1]})
    // call create contract function //todo add in ability to set contract expiry time
    this.setState({ loop: setInterval(this.getStatus, 5000) })
  }

  render() {
    return (
      <div>
        <Progress
          percent={this.state.percent}
          theme={{
            success: {
              symbol: '🍕',
              color: 'rgb(223, 105, 180)'
            },
            active: {
              symbol: '🛵',
              color: '#fbc630'
            },
            default: {
              symbol: '👨‍🍳',
              color: '#fbc630'
            }
          }}
        />
        <Typography style={{ color: "white" }}>
          {this.state.status}
        </Typography>
      </div>
    );
  }
}

export default (StepProgressBar);