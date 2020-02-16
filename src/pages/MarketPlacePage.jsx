import React, { Component } from "react";
import AppBar from "../components/AppBar";
import TermDetails from "../components/TermDetails"
import ContractsTable from "../components/ContractsTable"
// import linkTRS from "../contracts/LinkTRS";
// import token from "../contracts/TestDAI";
// import demoAggregator from "../contracts/DemoAggregator";
// import contract_config from "../contract_config.json";
import { Grid, Switch, Typography} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { PulseLoader } from 'react-spinners';
import '../App.css';
//tree graph stuff
import 'react-tree-graph/dist/style.css'
import Tree from 'react-tree-graph';
import contactMail from "material-ui/svg-icons/communication/contact-mail";
import insuralink from "../../contracts/Insuralink.json";
import contract_config from "../../contract_config.json";

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
      color:"green",
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
    buyChecked: true,
    buyWeight: "fontWeightBold",
    sellWeight: "fontWeightRegular"
  }

  handleToggleChange = () => name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
    console.log(event.target.change)
    if (event.target.checked) {
      this.setState({ buyWeight: "fontWeightBold", sellWeight: "fontWeightRegular"});
    } else {
      this.setState({ buyWeight: "fontWeightRegular", sellWeight: "fontWeightBold"});
    }
  }

  componentDidMount = () => {
    console.log(this.props)
  }

  getOpenContractTemplates = async () => {
    var web3 = this.props.web3;
    var contract = new web3.eth.Contract(insuralink.abi, contract_config.insuralink_dev);
    var account = (await this.props.web3.eth.getAccounts())[0]

    var numberOfTemplates = await contract.methods.templateCounter().call()
    var templates = []
    for (var i = 0; i < numberOfTemplates; i++) {
      var thisTemplate = await contract.methods.getContractTemplate(i).call()
      if (thisTemplate[4] < Math.round((new Date()).getTime() / 1000)) {
        //Activre template
        templates.push(thisTemplate)
      }
    }
  }


  handleClose = () => {
    this.setState({ showPopup: false })
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
          <AppBar/>
          <Grid style={{ paddingTop: "3%" }}>
            <Typography variant="h4" style={{ color: "#f0f0f0"}}> InsuraLink Marketplace </Typography>
          </Grid>
          <Grid container spacing={5} justify="center" alignItems="center" style={{float: "right", paddingRight: "25%", paddingBottom: 0, margin: 0, paddingTop: "5%", width: '50%'}}>
            <Typography fontWeight={this.state.buyWeight} style={{color: "#f0f0f0"}}> Buy </Typography>
            <Grid >
                <CustomSwitch
                  checked={this.state.buy}
                  onChange={this.handleToggleChange("buyChecked")}
                  value="buyChecked"
                  style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                />
            </Grid>
            <Typography fontWeight={this.state.sellWeight} style={{color: "#f0f0f0"}}> Sell </Typography>
          </Grid>
          <Grid container spacing={5} justify="center" alignItems="center" style={{width: '100%'}}>
            <Grid item xs style={{paddingTop: 0,paddingLeft: "10%", height: '40vh'}}>
                <TermDetails {...this.props} data={this.state.contractData} web3={this.props.web3} />
            </Grid>
            <Grid item xs={8} style={{paddingTop: 0, height: '40vh'}}>
                <ContractsTable data={this.state.contractData} web3={this.props.web3} contractID={this.props.match.params.contractID}/>
            </Grid>
            </Grid>
        </div>
      )
    }
  }
}

export default MainPage;
