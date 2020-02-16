import React from "react";
import "react-step-progress-bar/styles.css";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import insuralink from "../contracts/Insuralink.json";
import contract_config from "../contract_config.json";

class StepProgressBar extends React.Component {
  state = {
  }

  getStatus = () => {
    // var web3 = this.props.web3;
    // var contract = new web3.eth.Contract(insuralink.abi, contract_config.insuralink_dev);
    // console.log(contract.methods)
    
  }

  componentDidMount = async () => {
    var web3 = this.props.web3;
    var contract = new web3.eth.Contract(insuralink.abi, contract_config.insuralink_dev);
    var account = (await this.props.web3.eth.getAccounts())[0]
    this.setState({web3: web3, contract: contract, account: account})
    console.log(contract.methods)
    contract.methods.activeContractsByUser(account)
      .on((res) => {
          //Set Status as pending and wait for this transaction to be processed
          console.log(res);
      });
    // call create contract function //todo add in ability to set contract expiry time
    //setInterval(this.getStatus, 10000)
  }

  render() {
    return (
      <Progress
        percent={this.props.percent}
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
    );
  }
}

export default (StepProgressBar);