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

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: "#caaf72",
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 10,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      backgroundColor: "#e6e7e8"
    },
  }))(TableRow);

class InputsDisplay extends Component {
    state = {
        previous: [],
        mainRecord: []
    }

    componentDidMount = async () => {
        this.setState({ type: this.props.type, mainRecord: this.props.data})
        // var joined = this.state.previous.concat(this.props.data)
        // this.setState({ previous: joined })
        console.log(this.props.data)
    }

    componentDidUpdate = () => {
        console.log(this.props)
        if (this.state.previous.length >= 3) {
            this.state.previous = this.state.previous.slice(1, 4)
        }
        this.state.previous.push(this.props.data)
    }
    

    render() {
            return (
                <div>
                    <Grid className="container" alignItems="inline" style={{ height: "100%", width: "100%"}}>
                        
                        <Circle image={this.props.image} data={this.props.data} />
                        <div style={{float: "right", paddingRight: "20%"}}>
                            <div style={{ flexDirection: 'column', display: 'flex', alignItem:'flex-start', marginLeft: '10px', marginBottom: '15px'}}>
                                <Typography style={{color: "white"}}> {this.state.type} </Typography>
                            </div>
                            <Table className="table" aria-label="customized table">
                            <TableHead className="table-head">
                                <StyledTableRow>
                                    <StyledTableCell>Historical</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.previous.map(row => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell>{row}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </div>
                    </Grid>
                    
                </div>
            );
    }
}

export default (InputsDisplay);