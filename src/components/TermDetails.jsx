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
        console.log(this.props)
    }

    getPaperContent = () => {
        var data = this.props.contractData
        if (data === null || data === undefined) {
            return (
                <div>
                    <Typography> No Contract Selected </Typography>
                    <Typography> Please Select one from the right hand side </Typography>
                </div>
            )
        } else {
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