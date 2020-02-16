import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Typography, Button } from '@material-ui/core';
//import linkTRS from "../contracts/LinkTRS";
//import contract_config from "../contract_config.json";
import "../css/Table.css";
import { Link } from "react-router-dom";


const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);


class TermDetails extends Component {
    state = {
        times: [],
        loadError: false,
        loading: true,
        currentTime: 0,
        data: [],
        name: "",
        freq: "",
        pAmount: "",
        iAmount: "",
        total: "",
    }

    componentDidMount = async () => {
<<<<<<< HEAD
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
                    <Paper style={{
                        width: '95%', marginLeft: 'auto', backgroundColor: "#e6e7e8", marginRight: 'auto', marginTop: '30px', marginBottom: '30px',
                        paddingBottom: '10px', paddingTop: '10px', height: '31vh',
                    }}>
                        <div style={{ flexDirection: 'column', display: 'flex', alignItems: 'flex-start', marginLeft: '10px', marginBottom: '15px'}}>
                            <Typography> Pizza Contract </Typography>
                        </div>
                        <div style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '20px'}}>
                            <Typography> Contract Name: {this.state.name}  </Typography>
                            <Typography> Payment Frequency: {this.state.freq}  </Typography>
                            <Typography> Payment Amount: {this.state.pAmount}  </Typography>
                            <Typography> Insurance Amount: {this.state.iAmount}  </Typography>
                            <Typography> Total Payments: {this.state.total}  </Typography>
                        </div>
                    </Paper>
=======
        console.log(this.props)
    }

    getPaperContent = () => {
        if (this.props.contractData === null) {
            return (
                <div>
                    <Typography> No Contract Selected </Typography>
                    <Typography> Please Select one from the right hand side </Typography>
                </div>
            )
        } else {
            var data = this.props.contractData
            console.log(data)
            return (
                <div>
                    <div style={{ flexDirection: 'column', display: 'flex', alignItems: 'flex-start', marginLeft: '10px', marginBottom: '15px' }}>
                        <Typography> Contract Terms </Typography>
                    </div>
                    <div style={{ marginLeft: '10px', flexDirection: 'column', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', paddingBottom: '20px' }}>
                        <Typography> Type: {data[5]} </Typography>
                        <Typography> Validity: {data[4]} </Typography>
                        <Typography> Payment Amount: {this.props.web3.utils.fromWei(data[2].toString())} DAI </Typography>
                        <Typography> Number of Payments: {data[1]} </Typography>
                        <Typography> Insurance Amount: {this.props.web3.utils.fromWei(data[3].toString())} </Typography>
                    </div>
                    <div style={{ flexDirection: 'column', display: 'flex', alignItems: 'flex-start', marginLeft: '10px', marginBottom: '15px' }}>
                        <Typography> Contract Inputs </Typography>
                    </div>
                    <div style={{ marginLeft: '10px', flexDirection: 'column', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', paddingBottom: '20px' }}>
                        <Typography> Temp: > 70f </Typography>
                        <Typography> Humidity: > 1% </Typography>
                        <Typography> Tilt: 45 degrees </Typography>
                        <Typography> {'GForce: < 3'} </Typography>
                    </div>
                    <Button variant="contained" color="primary" onClick={() => this.props.buyFunction()} component={Link} style={{ margin: "5px" }}>
                            Buy
                        </Button>
>>>>>>> 0a8bce7d4ef6a2d3721386905d43c0c426d117f3
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <Paper style={{
                    width: '95%', marginLeft: 'auto', backgroundColor: "#f0f0f0", marginRight: 'auto', marginTop: '30px', marginBottom: '30px',
                    paddingBottom: '10px', paddingTop: '10px', height: '100%',
                }}>
                    {this.getPaperContent()}
                </Paper>
            </div>
        );
    }
}

export default (TermDetails);