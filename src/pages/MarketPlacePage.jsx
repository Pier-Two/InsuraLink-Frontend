import React, { Component } from "react";
import AppBar from "../components/AppBar";
import TermDetails from "../components/TermDetails"
import ContractsTable from "../components/ContractsTable"
// import linkTRS from "../contracts/LinkTRS";
// import token from "../contracts/TestDAI";
// import demoAggregator from "../contracts/DemoAggregator";
// import contract_config from "../contract_config.json";
import { Grid, Switch, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { PulseLoader } from 'react-spinners';
import '../App.css';
//tree graph stuff
import 'react-tree-graph/dist/style.css'
import Tree from 'react-tree-graph';
import contactMail from "material-ui/svg-icons/communication/contact-mail";
import insuralink from "../contracts/Insuralink.json";
import contract_config from "../contract_config.json";
import InputDetails from "../components/InputDetails";
import CreateContractInput from "../components/CreateContractInput";


let data = {
  name: 'Insuralink Contracts',
  children: [{
    name: 'Child One',
  }, {
    name: 'Child Two'
  }]
};

const CustomSwitch = withStyles({
  switchBase: {
    color: "green",
    '&$checked': {
      color: "#800000",
    },
    '& + $track': {
      backgroundColor: "#f0f0f0",
    },
    '&$checked + $track': {
      backgroundColor: "#f0f0f0",
    },
  },
  checked: {},
  track: {},
})(Switch);

class MainPage extends Component {
  state = {
    buyChecked: false,
    buyWeight: "fontWeightBold",
    sellWeight: "fontWeightRegular",
    templateData: [],
    contractData: null,
    web3: null,
  }

  if

  componentDidMount = () => {
    console.log(this.props)
    if (this.props.web3 != null) {
      this.getOpenContractTemplates()
    }
  }

  getOpenContractTemplates = async () => {
    var web3 = this.props.web3;
    var contract = new web3.eth.Contract(insuralink.abi, contract_config.insuralink_dev);
    var account = (await this.props.web3.eth.getAccounts())[0]

    var numberOfTemplates = await contract.methods.templateCounter().call()
    var templates = []
    for (var i = 0; i < numberOfTemplates; i++) {
      console.log(numberOfTemplates)
      var thisTemplate = await contract.methods.getContractTemplate(i).call()
      //TODO
      // if (thisTemplate[4] < Math.round((new Date()).getTime() / 1000)) {
      //   //Activre template
      //   templates.push(thisTemplate)
      // }
      templates.push(thisTemplate)
    }
    console.log(templates)
    this.setState({ templateData: templates })
  }

  handleToggleChange = () => {
    if (this.state.buyChecked === true) {
      this.setState({ buyChecked: false })
      return
    } else {
      this.setState({ buyChecked: true })
      return
    }
  }
  handleClose = () => {
    this.setState({ showPopup: false })
  }

  onContractClicked(contract) {
    console.log("Contract Data Selected")
    console.log(contract)
    this.setState({ contractData: contract })
  }

  buyFunction = async () => {
    var web3 = this.props.web3;
    var contract = new web3.eth.Contract(insuralink.abi, contract_config.insuralink_dev);
    var account = (await this.props.web3.eth.getAccounts())[0]
    console.log(this.state.contractData[6])
    await contract.methods.buyContract(this.state.contractData[6]).send({ from: account })
  }

  getDisplayContent = () => {
    if (!this.state.buyChecked) {
      return (
        <div>
          <Grid container xs={12} spacing={2} justify="center" alignItems="center" style={{ width: '100%' }}>
            <Grid item xs={4} style={{ paddingTop: 0, paddingLeft: "5%", height: '70vh' }}>
              <TermDetails {...this.props} contractData={this.state.contractData} web3={this.props.web3}
                buyFunction={() => this.buyFunction()} />
            </Grid>
            <Grid item xs={8} style={{ paddingTop: 0, height: '70vh' }}>
              <ContractsTable templateData={this.state.templateData} web3={this.props.web3}
                contractID={this.props.match.params.contractID} onContractClicked={(row) => this.onContractClicked(row)} />
            </Grid>
          </Grid>
        </div>
      )
    } else {
      return (
        <div>
          <Grid container xs={12} spacing={2} justify="center" alignItems="center" style={{ width: '100%' }}>
            <Grid item xs={4} style={{ paddingTop: 0, paddingLeft: "5%", height: '70vh' }}>
              <CreateContractInput {...this.props}/>
            </Grid>
            <Grid item xs={8} style={{ paddingTop: 0, height: '70vh' }}>
              <InputDetails {...this.props}/>
            </Grid>
          </Grid>
        </div>
      )
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
        <div>
          <AppBar />
          <Grid style={{ paddingTop: "3%" }}>
            <Typography variant="h4" style={{ color: "#f0f0f0" }}> InsuraLink Marketplace </Typography>
            <Grid container spacing={5} justify="center" alignItems="center" style={{ float: "right", paddingRight: "25%", paddingBottom: 0, margin: 0, paddingTop: "5%", width: '50%' }}>
              <Typography fontWeight={this.state.buyWeight} style={{ color: "#f0f0f0" }}> Buy </Typography>
              <Grid >
                <CustomSwitch
                  checked={this.state.buyChecked}
                  onChange={() => this.handleToggleChange()}
                  value="buyChecked"
                  style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                />
              </Grid>
              <Typography fontWeight={this.state.sellWeight} style={{ color: "#f0f0f0" }}> Sell </Typography>
            </Grid>
          </Grid>
          {this.getDisplayContent()}
        </div>
      )
    }
  }
}

export default MainPage;
