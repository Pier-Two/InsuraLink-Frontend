import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Typography, Button}  from '@material-ui/core';
import { PulseLoader } from 'react-spinners';
//import linkTRS from "../contracts/LinkTRS";
//import contract_config from "../contract_config.json";
import "../css/Grid.css";
import IndividualInputDisplay from './IndividualInputDisplay';

String.prototype.format = function () {
    var a = this;
    for (var k in arguments) {
        a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
    }
    return a
}

class InputsDisplay extends Component {
    state = {
        isLoaded: false
    }

    get_data = async () => {
        await fetch(this.props.data)
        .then(res => res.json())
        .then(
            (result) => {
            var acc = "({0}, {1}, {2})".format(result.accelerometer.x, result.accelerometer.y, result.accelerometer.z)
            this.setState({
                isLoaded: true,
                results: result,
                temp: result.temperature,
                humidity: result.humidity,
                accelerometer: acc
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
    

    handleClick = async (address) => {
        
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
                    <div className="grid2x2">
                        <div className="box">
                            <IndividualInputDisplay type={"humidity"} data={this.state.humidity}/>
                        </div>
                        <div className="box">
                            <IndividualInputDisplay type={"accelerometer"} data={this.state.accelerometer}/>
                        </div>
                        <div className="box">
                            <IndividualInputDisplay type={"temp"} data={this.state.temp}/>
                        </div>
                        <div className="box">
                            <IndividualInputDisplay type={"humidity"} data={this.state.humidity}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default (InputsDisplay);