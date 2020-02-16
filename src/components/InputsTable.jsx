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
    }

    get_data = async () => {
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
            }
        )
    }

    componentDidMount = async () => {
        await this.get_data()
        console.log(this.state)
        setInterval(this.get_data, 5000)
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
                                <StyledTableCell align="right">Threshold</StyledTableCell>
                                <StyledTableCell align="right">{this.state.tiltStatus}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Temperature</StyledTableCell>
                                <StyledTableCell align="right">{this.state.temp}</StyledTableCell>
                                <StyledTableCell align="right">Threshold</StyledTableCell>
                                <StyledTableCell align="right">{this.state.tempStatus}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Humidity</StyledTableCell>
                                <StyledTableCell align="right">{this.state.humidity}</StyledTableCell>
                                <StyledTableCell align="right">Threshold</StyledTableCell>
                                <StyledTableCell align="right">{this.state.humidityStatus}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Sensor_X</StyledTableCell>
                                <StyledTableCell align="right">Current Value_X</StyledTableCell>
                                <StyledTableCell align="right">Threshold_X</StyledTableCell>
                                <StyledTableCell align="right">Status_X</StyledTableCell>
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