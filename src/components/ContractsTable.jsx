import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Typography, Button}  from '@material-ui/core';
//import linkTRS from "../contracts/LinkTRS";
//import contract_config from "../contract_config.json";
import "../css/Table.css";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.default,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
      backgroundColor: "#f0f0f0",
  },
}))(TableRow);


class ContractsTable extends Component {
    state = {
        times: [],
        loadError: false,
        loading: true,
        currentTime: 0,
        data: []
    }

    componentDidMount = async () => {
        // console.log(this.props.data)
        // this.myInterval = setInterval(() => {
        //     var currentTime = Math.round((new Date()).getTime() / 1000);
        //     this.setState({ currentTime: currentTime })
        // }, 1000)
        // if (this.props.data !== undefined) {
        //   console.log(this.props.data)
        //   this.setState({ loading: false })
        // }
    }

    convertToProperTime = (ttl, contractID) => {
        // if (ttl > 0) {
        //     var minutes = Math.floor(ttl / 60)
        //     var seconds = ttl - (minutes * 60)
        //     //TODO this will check if the contract isActive each time
        //     return (minutes + " mins, " + seconds + " secs")
        // } else {
        //   return ("Offer not available")
        // }
    }

    requestRemargin = async(contractID) => {
        // var web3 = this.props.web3;
        // var trsContract = new web3.eth.Contract(linkTRS.abi, contract_config.linkTRS_dev);
        // var account = (await this.props.web3.eth.getAccounts())[0]
        // console.log(account)
        // console.log(contractID)
        // await trsContract.methods.remargin(contractID).send({from: account})
    }

    isActive = async(contractID) => {
        // var web3 = this.props.web3;
        // var trsContract = new web3.eth.Contract(linkTRS.abi, contract_config.linkTRS_dev);
        // var active = await trsContract.methods.isActive(contractID).call()
        // return (active)
    }

    handleClick = async (address) => {
        // alert(address.toString())
        // var web3 = this.props.web3;
        // var contract = new web3.eth.Contract(linkTRS.abi, contract_config.linkTRS_dev);
        // var account = (await this.props.web3.eth.getAccounts())[0]

        // await contract.methods.joinContract(address, web3.utils.toWei("10")).send({from: account}).then((err, result) => {
        //     if (err) {
        //         alert(err)
        //     }
        // })
        //
        this.props.history.push("/accept/"+address)
    }

    calculateTerm = (startDate, expiryDate) => {
        var diff = expiryDate - startDate;
        return Math.floor((diff / 60 * 60 * 24))//convert to days
    }

    processValues = (value) => {
        var processedValue = value / (Math.pow(10, 6))
        //todo
        var asString = processedValue.toString()
        return "$"+asString.substring(0, asString.length - 2) + "." + asString.substring(asString.length - 2)
    }

    getTokenString = (raw) => {
        var processedValue = raw / (Math.pow(10, 18))
        var asString = processedValue.toString()
        return asString.substring(0, asString.length - 2) + "." + asString.substring(asString.length - 2)
    }

    getNotionalValue = (price, tokens) => {
        console.log(price)
        console.log(tokens)
        var priceBN = this.props.web3.utils.toBN(price)
        var tokensBN = this.props.web3.utils.toBN(this.props.web3.utils.toWei(tokens))
        var result = priceBN.mul(tokensBN)
        return this.processValues(this.props.web3.utils.fromWei(result))
    }

    processInterestRate = (interestRate) => {
        var string = interestRate.toString()
        var endIndex = string.length - 3;
        return string.substring(0, endIndex) + "." + string.substring(endIndex) + " %"
    }

    getCellButton = (address, offerExpiry) => {
        if (offerExpiry - this.state.currentTime < 0) {
          return ("Offer not available")
        } else {
        return(
            <Button variant="contained" color="primary" onClick={() => {this.handleClick(address)}} style={{ margin: "5px" }}>
                        Accept Contract
                    </Button>
        )
      }
    }


    render() {
        // if (this.props.data.length === 0) {
        //     return(
        //         <div style={{flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', paddingTop: '20vh'}}>
        //         <Typography variant="h5" style={{ paddingTop: "30px", color: "#2A2B2A" }}> There are no available contracts at the moment, check back later </Typography>
        //         </div>
        //     )
        // } else {
            return (
              <div>
                <Typography variant="h6" style={{color: "#f0f0f0" }}>Select and finalise a listing below </Typography>
                <div className="table-container">
                    <Table className="table" aria-label="customized table">
                        <TableHead className="table-head">
                            <StyledTableRow>
                                <StyledTableCell>Valid Until (Minutes)</StyledTableCell>
                                <StyledTableCell align="right">Description</StyledTableCell>
                                <StyledTableCell align="right">Payment Amount</StyledTableCell>
                                <StyledTableCell align="right">Number of Payments</StyledTableCell>
                                <StyledTableCell align="right">Insurance Amount</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.templateData.map(row => (
                                <StyledTableRow onMouseOver={() => {
                                  this.props.onContractClicked(row)
                                }}>
                                    <StyledTableCell component="th" scope="row">
                                        {row[4]}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row[5]}</StyledTableCell>
                                    <StyledTableCell align="right">{this.props.web3.utils.fromWei(row[2])}</StyledTableCell>
                                    <StyledTableCell align="right">{row[1]}</StyledTableCell>
                                    <StyledTableCell align="right">{this.props.web3.utils.fromWei(row[3])}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
              </div>
            );
        // }
    }
}

export default (ContractsTable);