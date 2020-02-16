import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Circle from "./Circle"
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Typography, Grid}  from '@material-ui/core';
//import linkTRS from "../contracts/LinkTRS";
//import contract_config from "../contract_config.json";
import "../css/Table.css";
import { white } from 'material-ui/styles/colors';


class InputsDisplay extends Component {
    state = {
        previous: [],
        mainRecord: []
    }


    componentDidMount = async () => {
        this.setState({ type: this.props.type, mainRecord: this.props.data})
        console.log(this.props.data)
    }
    

    handleClick = async (address) => {
        
    }


    render() {
            return (
                <div>
                    <Grid class="container" style={{ height: "50%", width: "50%"}}>
                        <Grid class="row">
                            <Grid>
                                <Typography style={{color:"white"}}> {this.state.type} </Typography>
                                <Circle data={this.state.mainRecord} />
                            </Grid>
                            <Grid>
                            <Paper style={{
                                backgroundColor: "#f0f0f0"
                                }}>
                                <div style={{ flexDirection: 'column', display: 'flex', alignItems: 'flex-start', marginLeft: '10px', marginBottom: '15px'}}>
                                    <Typography> Type: {this.state.type} </Typography>
                                </div>
                            </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </div>
            );
        // }
    }
}

export default (InputsDisplay);