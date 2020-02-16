import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Typography, Button}  from '@material-ui/core';
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

    get_data = async (url) => {
        await fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
            var acc = "({0}, {1}, {2})".format(result.accelerometer.x, result.accelerometer.y, result.accelerometer.z)
            console.log(acc)
            this.setState({
                isLoaded: true,
                results: result,
                temp: result.temperature,
                humidity: result.humidity,
                accelerometer: acc
            });
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
        await this.get_data(this.props.data)
        console.log(this.state)
    }
    

    handleClick = async (address) => {
        
    }


    render() {
        if (!this.state.isLoaded) {
            return (
                <div> Loading </div>
            )
        }
        else {
            return (
                <div>
                    <div class="grid2x2">
                        <div class="box">
                            <IndividualInputDisplay type={"humidity"} data={this.state.humidity}/>
                        </div>
                        <div class="box">
                            <IndividualInputDisplay type={"accelerometer"} data={this.state.accelerometer}/>
                        </div>
                        <div class="box">
                            <IndividualInputDisplay type={"temp"} data={this.state.temp}/>
                        </div>
                        <div class="box">
                            <IndividualInputDisplay type={"humidity"} data={this.state.humidity}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default (InputsDisplay);