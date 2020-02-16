import React, { Component } from 'react';
import { Typography, Button, Select } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { TextField, MenuItem, Slider } from 'material-ui';
import insuralink from "../contracts/Insuralink.json";
import contract_config from "../contract_config.json";


class CreateContractInput extends Component {
    state = {
        contractType: "Custom",
        active: 0,
        payments: 0,
        numPayments: 0,
        insuranceAmount: 0
    }

    componentDidMount = async () => {

    }

    changeContractType = event => {
        //console.log(event.target.value)
        if (event.target.value == "Pizza") {
            this.setState({
                active: 30,
                payments: 2,
                numPayments: 1,
                insuranceAmount: 20
            })
        }
        this.setState({ contractType: event.target.value });
    };

    onActiveChange = value => {
        this.setState({ active: value })
    }

    onPaymentsChange = event => {
        this.setState({ payments: event.target.value })
    }

    onInsuranceAmountChange = event => {
        this.setState({ insuranceAmount: event.target.value })
    }

    onNumberPaymentsChange = value => {
        this.setState({ numPayments: value })
    }

    createContract = async () => {
        var web3 = this.props.web3;
        var contract = new web3.eth.Contract(insuralink.abi, contract_config.insuralink_dev);
        console.log(contract)
        var account = (await this.props.web3.eth.getAccounts())[0]
        console.log(contract.methods)

        // call create contract function //todo add in ability to set contract expiry time
        contract.methods.createInsuranceContractTemplate(this.props.web3.utils.toWei(this.state.payments.toString()),
            this.props.web3.utils.toWei(this.state.insuranceAmount.toString()),
            this.state.active, this.state.contractType, this.state.numPayments).send({ from: account })
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
            <div>
                <Paper style={{
                    width: '95%', marginLeft: 'auto', backgroundColor: "#f0f0f0", marginRight: 'auto', marginTop: '30px', marginBottom: '30px',
                    paddingBottom: '10px', paddingTop: '10px', height: '100%',
                }}>
                    <Typography style={{ paddingBottom: '10px' }}> Contract Terms </Typography>
                    <div style={{ marginLeft: '10px', flexDirection: 'column', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', paddingBottom: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography style={{ paddingRight: '10px' }}> Contract Type </Typography>
                            <Select
                                labelId="Contract Type"
                                id="contract-type-select"
                                defaultValue={"Pizza"}
                                value={this.state.contractType}
                                onChange={this.changeContractType}
                            >
                                <MenuItem value={"Custom"}>Custom</MenuItem>
                                <MenuItem value={"Pizza"}>Pizza</MenuItem>
                            </Select>
                        </div>
                        <div style={{ width: '300px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography style={{ paddingRight: '10px' }}> Active Time (minutes) </Typography>
                            <Slider
                                style={{ width: '300px' }}
                                defaultValue={0}
                                value={this.state.active}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={100}
                                onChange={(event, value) => this.onActiveChange(value)}
                            />
                            <Typography style={{ paddingLeft: '10px' }}> {this.state.active} </Typography>
                        </div>
                        <div style={{ width: '300px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography style={{ paddingRight: '10px' }}> Payments Value </Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="active"
                                name="active"
                                autoFocus
                                onChange={this.onPaymentsChange}
                                value={this.state.payments}
                            />
                        </div>
                        <div style={{ width: '300px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography style={{ paddingRight: '10px' }}> Number of Payments </Typography>
                            <Slider
                                style={{ width: '300px' }}
                                defaultValue={0}
                                value={this.state.numPayments}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={12}
                                onChange={(event, value) => this.onNumberPaymentsChange(value)}
                            />
                            <Typography style={{ paddingLeft: '10px' }}> {this.state.numPayments} </Typography>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography style={{ paddingRight: '10px' }}> Insurance Amount </Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="active"
                                label="Active For (Minutes)"
                                name="active"
                                autoFocus
                                onChange={this.onInsuranceAmountChange}
                                value={this.state.insuranceAmount}
                            />
                        </div>
                    </div>
                    <Button variant="contained" color="primary" onClick={this.createContract} style={{ margin: "5px" }}>
                        Submit
                    </Button>
                </Paper>
            </div>
        );
    }

}

export default (CreateContractInput);