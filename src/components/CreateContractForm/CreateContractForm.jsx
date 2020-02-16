import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import { FormControl, Paper, Button, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from "react-router-dom";
import { validateForm } from './validator';
import insuralink from "../../contracts/Insuralink.json";
import contract_config from "../../contract_config.json";


const progressPerStep = 33.333; //Define how much as a % each step changes the users progess

class CreateContractForm extends Component {

    state = {
        //TODO add in all required submissions users will need to make
        validLength: 0,
        pAmount: "",
        iAmount: "",
        total: "",
        description: "pizza contract",
        errors: {
            errorsObj: {},
            hasError: false
        },
    };

    componentDidMount = async () => {
    }

    onValidLengthChange = (event) => {
        this.setState({ validLength: event.target.value })
    }

    onPaymentChange = (event) => {
        this.setState({ pAmount: event.target.value })
    }

    onInsuranceAmountChange = (event) => {
        this.setState({ iAmount: event.target.value })
    }

    onTotalChange = (event) => {
        this.setState({ total: event.target.value })
    }

    completeForm = async () => {

        var web3 = this.props.web3;
        var contract = new web3.eth.Contract(insuralink.abi, contract_config.insuralink_dev);
        console.log(contract)
        var account = (await this.props.web3.eth.getAccounts())[0]
        console.log(contract.methods)

        // call create contract function //todo add in ability to set contract expiry time
        contract.methods.createInsuranceContractTemplate(1, this.state.pAmount, this.state.iAmount,
            this.state.validLength, this.state.description ,this.state.total).send({ from: account })
            .on('transactionHash', (hash) => {
                //Set Status as pending and wait for this transaction to be processed
                console.log(hash);
                web3.eth.getTransaction(hash, (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(result)
                    alert("Transaction Submitted")
                })
            });
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Paper style={{ margin: "20px", padding: '50px', backgroundColor: "#ffffff", width: "50vw" }}>
                    <LinearProgress variant="determinate" value={this.state.progress} />
                    <Typography variant="h3" color="primary" style={{ margin: '10px' }}> List Contract </Typography>
                    <FormControl>
                        <form>
                        <Typography variant="h4"> Contract Details </Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="freq"
                                label="Validity (Minutes)"
                                name="freq"
                                autoFocus
                                onChange={this.onValidLengthChange}
                                value={this.state.freq}
                                style={this.textFieldStyle}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="pAmount"
                                label="Payment Amount"
                                name="pAmount"
                                autoFocus
                                onChange={this.onPaymentChange}
                                value={this.state.pAmount}
                                style={this.textFieldStyle}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                type="number"
                                required
                                fullWidth
                                id="iAmount"
                                label="Insurance Amount"
                                name="iAmount"
                                autoFocus
                                onChange={this.onInsuranceAmountChange}
                                value={this.state.iAmount}
                                style={this.textFieldStyle}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="total"
                                label="Total Number of Payments"
                                name="total"
                                autoFocus
                                onChange={this.onTotalChange}
                                value={this.state.total}
                                style={this.textFieldStyle}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="total"
                                label="Description"
                                name="total"
                                autoFocus
                                value={this.state.description}
                                style={this.textFieldStyle}
                            />
                        </form>
                        <Button variant="contained" color="primary" onClick={this.completeForm} component={Link} style={{ margin: "5px" }}>
                            Submit
                        </Button>
                    </FormControl>
                </Paper>
            </div>
        )
    }
}

export default (CreateContractForm)
