import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Typography, Button}  from '@material-ui/core';
import { PulseLoader } from 'react-spinners';
//import linkTRS from "../contracts/LinkTRS";
//import contract_config from "../contract_config.json";
import "../css/Table.css";
import { red } from '@material-ui/core/colors';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#caaf72",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    backgroundColor: "#e6e7e8"
  },
}))(TableRow);


class InputsTable extends Component {
    state = {
        isLoaded: false,
        tilt: 0,
        temp: 0,
        humidity: 0,

    }

    get_data = async () => {
        console.log("Getting data")
        await fetch(this.props.data)
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                isLoaded: true,
                results: result,
                temp: result.temperature,
                humidity: result.humidity,
                tilt: result.tilt
            });
            console.log(result)
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            this.setState({
                isLoaded: true,
                error: true
            });
            console.log(error)
            }
        )
    }

    componentDidMount = async () => {
        console.log("Table mounted")
        await this.get_data()
        console.log(this.state)
        setInterval(this.get_data, 5000)
    }

    //The following hurts
    calcTempStatus = (currentTemp) => {
        if (currentTemp < 15) {
            return(
                <Typography style={{color: red}}> Fired </Typography>
            )
        } else {
            return(
                <Typography> OK </Typography>
            )
        }
    }

    calcHumidityStatus = (currentHumidity) => {
        if (currentHumidity < 10) {
            return(
                <Typography style={{color: red}}> Fired </Typography>
            )
        } else {
            return(
                <Typography> OK </Typography>
            )
        }
    }

    calcTiltStatus = (currentTilt) => {
        if (currentTilt > 45) {
            return(
                <Typography style={{color: red}}> Fired </Typography>
            )
        } else {
            return(
                <Typography> OK </Typography>
            )
        }
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <PulseLoader
                  sizeUnit={"px"}
                  size={5}
                  color={'#2A2B2A'}
                  loading={this.state.showLoader}
                />
              )
        }
        else {
            return (
              <div>
                <Typography variant="h6" style={{color: "#f0f0f0" }}>Live Sensor Data </Typography>
                <div className="table-container">
                    <Table className="table" aria-label="customized table">
                        <TableHead className="table-head">
                            <StyledTableRow>
                                <StyledTableCell>Sensor</StyledTableCell>
                                <StyledTableCell align="right">Current Value</StyledTableCell>
                                <StyledTableCell align="right">Threshold</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell>Tilt</StyledTableCell>
                                <StyledTableCell align="right">{this.state.tilt}</StyledTableCell>
                                <StyledTableCell align="right"> {"< 45 degrees"}</StyledTableCell>
                                <StyledTableCell align="right">{this.calcTiltStatus(this.state.tilt)}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Temperature</StyledTableCell>
                                <StyledTableCell align="right">{this.state.temp}</StyledTableCell>
                                <StyledTableCell align="right"> {"> 15C"}</StyledTableCell>
                                <StyledTableCell align="right">{this.calcTempStatus(this.state.temp)}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Humidity</StyledTableCell>
                                <StyledTableCell align="right">{this.state.humidity}</StyledTableCell>
                                <StyledTableCell align="right"> {"> 10%"}</StyledTableCell>
                                <StyledTableCell align="right">{this.calcHumidityStatus(this.state.humidity)}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </div>
              </div>
            );
        }
    }
}

export default (InputsTable);